pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import '@pancakeswap/pancake-swap-lib/contracts/math/SafeMath.sol';
import '@pancakeswap/pancake-swap-lib/contracts/token/BEP20/IBEP20.sol';
import '@pancakeswap/pancake-swap-lib/contracts/access/Ownable.sol';

import "./libraries/Orders.sol";
import "./libraries/Uint256Pagination.sol";

contract OrderBook is Ownable{
    using SafeMath for uint256;
    using Orders for Orders.Order;
    using Uint256Pagination for uint256[];

    event OrderCreated(uint256 indexed orderId);
    event OrderCanceled(uint256 indexed orderId);

    address constant public BNB = address(0);
    address public feeToken = BNB;

    address public settlement;

    // Array of hashes of all orders
    uint256[] internal _allOrderIds;
    // Address of order maker => orderIds (orders)
    mapping(address => uint256[]) internal _orderIdsOfMaker;
    // Address of fromToken => orderIds (orders)
    mapping(address => uint256[]) internal _orderIdsOfFromToken;
    // Address of toToken => orderIds (orders)
    mapping(address => uint256[]) internal _orderIdsOfToToken;
    // Hash of an order => the order and its data
    mapping(uint256 => Orders.Order) internal _orderOfId;
    
    modifier onlySettlement() {
        require(settlement == msg.sender, 'Ownable: caller is not the owner');
        _;
    }

    constructor() public { }

    receive () payable external {}

    function orderById(uint256 oid) public view returns (Orders.Order memory order) {
        order = _orderOfId[oid];
    }

    // Returns the number of orders of a maker
    function numberOfOrderIdsOfMaker(address maker) public view returns (uint256) {
        return _orderIdsOfMaker[maker].length;
    }

    // Return the number of orders where fromToken is the origin token
    function numberOfOrderIdsOfFromToken(address fromToken) public view returns (uint256) {
        return _orderIdsOfFromToken[fromToken].length;
    }

    // Return the number of orders where toToken is the target token
    function numberOfOrderIdsOfToToken(address toToken) public view returns (uint256) {
        return _orderIdsOfToToken[toToken].length;
    }

    // Returns the number of all orders
    function numberOfAllOrderIds() public view returns (uint256) {
        return _allOrderIds.length;
    }

    // Returns an array of hashes of orders of a maker
    function orderIdsOfMaker(
        address maker,
        uint256 page,
        uint256 limit
    ) public view returns (uint256[] memory) {
        return _orderIdsOfMaker[maker].paginate(page, limit);
    }

    // Returns an array of hashes of orders where fromToken is the origin token
    function orderIdsOfFromToken(
        address fromToken,
        uint256 page,
        uint256 limit
    ) public view returns (uint256[] memory) {
        return _orderIdsOfFromToken[fromToken].paginate(page, limit);
    }

    // Returns an array of hashes of orders where toToken is the target token
    function orderIdsOfToToken(
        address toToken,
        uint256 page,
        uint256 limit
    ) public view returns (uint256[] memory) {
        return _orderIdsOfToToken[toToken].paginate(page, limit);
    }

    // Return an array of all hashes
    function allOrderIds(uint256 page, uint256 limit) public view returns (uint256[] memory) {
        return _allOrderIds.paginate(page, limit);
    }

    function makeOrder(
        address fromToken, 
        address toToken, 
        uint256 fromAmount, 
        uint256 toAmount,
        uint256 feeAmount
    ) public payable {
        if(fromToken == BNB)
            require(fromAmount.add(feeAmount) <= msg.value, "NOT_ENOUGH_BNB");
        else{
            require(feeAmount <= msg.value, "NOT_ENOUGH_BNB");
            IBEP20(fromToken).transferFrom(msg.sender, address(this), fromAmount);
        }

        uint256 orderId = _allOrderIds.length;

        Orders.Order memory newOrder = Orders.Order(
            orderId,
            Orders.Status.Pending, //Order status
            msg.sender, //address of order maker
            address(0), //address of order taker
            fromToken, //address of from token
            toToken, //address of toToken
            fromAmount, //ordered FromAmount
            toAmount, //ordered ToAmount
            feeAmount, //ordered fee
            0, //outAmount
            block.timestamp, //Time when the order was made
            block.timestamp //Time when the order was made
        );

        newOrder.validate();

        _orderOfId[orderId] = newOrder;

        _allOrderIds.push(orderId);
        _orderIdsOfMaker[newOrder.maker].push(orderId);
        _orderIdsOfFromToken[newOrder.fromToken].push(orderId);
        _orderIdsOfToToken[newOrder.toToken].push(orderId);

        emit OrderCreated(orderId);
    }

    function cancelOrder(uint256 orderId) public {
        Orders.Order storage order = _orderOfId[orderId];
        require(order.status == Orders.Status.Pending, "INVALID_STATUS");
        require(msg.sender == order.maker, "NOT_MAKER");
        order.updatedAt = block.timestamp;
        order.status = Orders.Status.Canceled;

        uint256 fromAmount = order.fromAmount;
        if(fromAmount > 0){
            if(order.fromToken == BNB)
                order.maker.transfer(fromAmount);
            else
                IBEP20(order.fromToken).transfer(order.maker, fromAmount);
        }

        if(order.fee > 0)
            order.maker.transfer(order.fee);

        emit OrderCanceled(orderId);
    }

    function setSettlement(address _settlement) public onlyOwner {
        settlement = _settlement;
    }

    function updateOrder(Orders.Order memory order) public onlySettlement {
        _orderOfId[order.id] = order;
    }

    function safeTransferFrom(address token, uint256 amount) public onlySettlement {
        if(amount > 0){
            if(token == BNB)
                msg.sender.transfer(amount);
            else
                IBEP20(token).transfer(msg.sender, amount);
        }
    }
}