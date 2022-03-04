pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

import '@pancakeswap/pancake-swap-lib/contracts/math/SafeMath.sol';
import '@pancakeswap/pancake-swap-lib/contracts/token/BEP20/IBEP20.sol';
import '@pancakeswap/pancake-swap-lib/contracts/token/BEP20/SafeBEP20.sol';
import '@pancakeswap/pancake-swap-lib/contracts/access/Ownable.sol';

import "./Protocol/IDexProtocol.sol";

contract OrderBank is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    //status of order
    enum Status {
        None,
        Pending,
        Completed,
        Canceled
    }

    struct OrderInfo {
        Status status; //Order status
        address payable maker; //address of order maker
        address payable taker; //address of order taker
        address fromToken; //address of from token
        address toToken; //address of toToken
        uint256 fromAmount; //ordered FromAmount
        uint256 toAmount; //ordered ToAmount
        uint256 fee; //ordered fee
        uint256 outAmount; //amount of toToken get by swap.
        uint256 positiveSlippage; //positiveSlippage based feeToken
        uint256 orderedAt; //Time when the order was made
        uint256 updatedAt; //Time when the order was updated
    }

    //Address of the contact managing the list of orderable tokens.
    //address public tokenList;

    //All order information generated in the Contract.
    OrderInfo[] public allOrders;
    //List of order information indexes for a specific user.
    mapping(address=>uint256[]) public makerOrders;
    //List of taken order indexes for a specific user.
    mapping(address=>uint256[]) public takerOrders;

    mapping(address=>uint256) public totalMakerEarned;
    mapping(address=>uint256) public totalTakerEarned;

    uint256 public totalPending;
    uint256 public totalCompleted;
    uint256 public totalCanceled;

    address constant public BNB = address(0);
    address public feeToken = BNB;

    mapping(address=>mapping(address=>bool)) private _approveTo; //approved token list to swap protocol

    event MakeOrder(uint256 indexed oid, address indexed fromToken, address indexed toToken, uint256 fromAmount, uint256 toAmount);
    event TakeOrder(uint256 indexed oid, address indexed fromToken, address indexed toToken, uint256 fromAmount, uint256 toAmount);
    event CancelOrder(uint256 indexed oid);

    receive () payable external {}

    constructor() public  {}

    function allOrdersLength() external view returns (uint256) {
        return allOrders.length;
    }
    
    function makerOrdersLength(address account) external view returns (uint256) {
        return makerOrders[account].length;
    }

    function takerOrdersLength(address account) external view returns (uint256) {
        return takerOrders[account].length;
    }

    function makeOrder(
        address fromToken, 
        address toToken, 
        uint256 fromAmount, 
        uint256 toAmount,
        uint256 feeAmount
    ) public payable {
        require(fromAmount > 0 && toAmount > 0, "ZERO_AMOUNT");

        if(fromToken == BNB)
            require(fromAmount.add(feeAmount) <= msg.value, "NOT_ENOUGH_BNB");
        else{
            require(feeAmount <= msg.value, "NOT_ENOUGH_BNB");
            IBEP20(fromToken).transferFrom(msg.sender, address(this), fromAmount);
        }

        OrderInfo memory newOrder = OrderInfo(
            Status.Pending, //Order status
            msg.sender, //address of order maker
            address(0), //address of order taker
            fromToken, //address of from token
            toToken, //address of toToken
            fromAmount, //ordered FromAmount
            toAmount, //ordered ToAmount
            feeAmount, //ordered fee
            0, //outAmount
            0, //positiveSlippage
            block.timestamp, //Time when the order was made
            block.timestamp //Time when the order was updated
        );

        uint256 oid = allOrders.length; //new order index

        allOrders.push(newOrder);
        makerOrders[msg.sender].push(oid);
        totalPending = totalPending.add(1);

        emit MakeOrder(oid, fromToken, toToken, fromAmount, toAmount);
    }

    function cancelOrder(uint256 oid) public nonReentrant {
        require(oid < allOrders.length, "OUT_OF_BOUND");

        OrderInfo storage orderInfo = allOrders[oid];

        require(orderInfo.maker == msg.sender, "NOT_ORDER_MAKER");
        require(orderInfo.status == Status.Pending, "INVALID_STATUS");

        //update order
        orderInfo.status = Status.Canceled;
        orderInfo.updatedAt = block.timestamp;

        //update order status count 
        totalPending = totalPending.sub(1);
        totalCanceled = totalCanceled.add(1);

        //withdraw
        _withdraw(feeToken, orderInfo.fee);
        _withdraw(orderInfo.fromToken, orderInfo.fromAmount);

        emit CancelOrder(oid);
    }

    function takeOrder(uint256 oid, address[] memory path, address[] memory protocols) public nonReentrant {
        require(oid < allOrders.length, "OUT_OF_BOUND");
        OrderInfo storage orderInfo = allOrders[oid];
        require(orderInfo.status == Status.Pending, "INVALID_STATUS");

        address toToken = orderInfo.toToken;
        address fromToken = orderInfo.fromToken;
        require(fromToken == path[0] && toToken == path[path.length-1], "INVALID_PATH");

        uint256 toAmount = orderInfo.toAmount;
        uint256 fromAmount = orderInfo.fromAmount;

        uint256 outAmount = _safeSwap(fromAmount, toAmount, path, protocols);
        uint256 posSlippage = outAmount > toAmount? outAmount.sub(toAmount) : 0;
        
        //update OrderInfo
        orderInfo.status = Status.Completed;
        orderInfo.taker = msg.sender;
        orderInfo.outAmount = outAmount;
        orderInfo.positiveSlippage = posSlippage;
        orderInfo.updatedAt = block.timestamp;

        takerOrders[msg.sender].push(oid);
        totalPending = totalPending.sub(1);
        totalCompleted = totalCompleted.add(1);

        //transfer ordered value to maker
        _transfer(toToken, orderInfo.maker, toAmount);
        //distribute feeToken
        _transfer(feeToken, msg.sender, orderInfo.fee);
        _transfer(toToken, msg.sender, posSlippage);

        emit TakeOrder(oid, fromToken, toToken, fromAmount, toAmount);   
    }

    function _withdraw(address token, uint256 amount) internal {
        if(token == BNB){
            msg.sender.transfer(amount);
        } else {
            IBEP20(token).transfer(msg.sender, amount);
        }
    }

    function _estimateOut(uint256 inAmount, address[] memory path, address[] memory protocols) internal view returns (uint256) {
        uint256 amount = inAmount;
        for(uint256 i=0; i<protocols.length; i++) {
            address fromToken = path[i];
            address toToken = path[i+1];
            address protocol = protocols[i];

            amount = IDexProtocol(protocol).estimate(amount, fromToken, toToken);
        }
        return amount;
    }

    function _safeSwap(uint256 inAmount, uint256 minOutAmount, address[] memory path, address[] memory protocols) internal returns (uint256 outAmount) {
        require(protocols.length == path.length-1);
        require(minOutAmount <= _estimateOut(inAmount, path, protocols), "Out value must be greater than minOutAmount");

        outAmount = inAmount;
        uint256 baseline;

        for(uint256 i=0; i<protocols.length; i++) {
            address fromToken = path[i];
            address toToken = path[i+1];
            address protocol = protocols[i];

            baseline = _balance(toToken);

            if(outAmount > 0)
                _approveToken(protocol, fromToken);

            bool withdrawal = (i == protocols.length-1 || protocols[i] != protocols[i+1]);

            if(fromToken == BNB)
                IDexProtocol(protocol).safeSwapBNB{value: outAmount}(toToken, withdrawal);
            else
                IDexProtocol(protocol).safeSwapBEP(outAmount, fromToken, toToken, withdrawal);
 
            outAmount = _balance(toToken).sub(baseline);
        }

        require(minOutAmount <= outAmount, "Out value must be greater than minOutAmount");
    }

    function _balance(address token) internal view returns (uint256) {
        return token == BNB? (payable(address(this))).balance : IBEP20(token).balanceOf(address(this));
    }

    function _transfer(address token, address payable to, uint256 amount) internal {
        if(amount > 0){
            if(token == BNB) 
                to.transfer(amount);
            else 
                IBEP20(token).transfer(to, amount);
        }
    }

    function _approveToken(address protocol, address token) internal {
        if(token != BNB && !_approveTo[protocol][token]) {
            IBEP20(token).approve(protocol, uint256(-1));
            _approveTo[protocol][token] = true;
        }
    }

}