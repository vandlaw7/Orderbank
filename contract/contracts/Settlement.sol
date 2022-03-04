pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/utils/ReentrancyGuard.sol";

import '@pancakeswap/pancake-swap-lib/contracts/math/SafeMath.sol';
import '@pancakeswap/pancake-swap-lib/contracts/token/BEP20/IBEP20.sol';
import '@pancakeswap/pancake-swap-lib/contracts/token/BEP20/SafeBEP20.sol';
import '@pancakeswap/pancake-swap-lib/contracts/access/Ownable.sol';

import "./OrderBook.sol";
import "./libraries/Orders.sol";
import "./libraries/Uint256Pagination.sol";

import "./Protocol/IDexProtocol.sol";

contract Settlement is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using Uint256Pagination for uint256[];

    event OrderCompleted(uint256 indexed oid);

    address constant public BNB = address(0);

    mapping(address=>mapping(address=>bool)) private _approveTo; //approved token list to swap protocol

    // Address of order taker => orderIds (orders)
    mapping(address => uint256[]) internal _orderIdsOfTaker;

    // Hash of an order => filledAmountIn
    //mapping(uint256 => uint256) public filledAmountInOfOrderId;

    OrderBook public orderBook;

    receive () payable external {}

    constructor(
        address payable _orderBook
    ) public  {
        orderBook = OrderBook(_orderBook);
    }

    function numberOfOrderIdsOfTaker(address taker) public view returns (uint256) {
        return _orderIdsOfTaker[taker].length;
    }

    // Returns an array of hashes of orders of a toaker
    function orderIdsOfTaker(
        address taker,
        uint256 page,
        uint256 limit
    ) public view returns (uint256[] memory) {
        return _orderIdsOfTaker[taker].paginate(page, limit);
    }

    function takeOrder(uint256 oid, address[] memory path, address[] memory protocols) public nonReentrant {
        require(oid < orderBook.numberOfAllOrderIds(), "OUT_OF_BOUND");
        
        Orders.Order memory order = orderBook.orderById(oid);
        require(order.status == Orders.Status.Pending, "INVALID_STATUS");

        address toToken = order.toToken;
        uint256 toAmount = order.toAmount;

        orderBook.safeTransferFrom(order.fromToken, order.fromAmount);
        uint256 outAmount = _safeSwap(order.fromAmount, toAmount, path, protocols);
        uint256 posSlippage = outAmount > toAmount? outAmount.sub(toAmount) : 0;
        
        //update OrderInfo
        order.status = Orders.Status.Completed;
        order.taker = msg.sender;
        order.outAmount = outAmount;
        order.updatedAt = block.timestamp;
        orderBook.updateOrder(order);
        
        _orderIdsOfTaker[msg.sender].push(oid);

        //transfer ordered value to maker
        _transfer(toToken, order.maker, toAmount);
        //tranfer taking reward
        _transfer(orderBook.feeToken(), msg.sender, order.fee);
        _transfer(toToken, msg.sender, posSlippage);

        emit OrderCompleted(oid);   
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