pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import '@pancakeswap/pancake-swap-lib/contracts/token/BEP20/IBEP20.sol';

import "../libraries/Orders.sol";
import "../OrderBook.sol";
import "../Settlement.sol";

contract OrderBookViewer {
    using Orders for Orders.Order;
    using Uint256Pagination for uint256[];

    OrderBook public orderBook;

    constructor(
        address payable _orderBook
    ) public  {
        orderBook = OrderBook(_orderBook);
    }

    function numberOfAllOrderIds() external view returns (uint256) {
        return orderBook.numberOfAllOrderIds();
    }

    function numberOfOrderIdsOfAccount(address account) external view returns (uint256 numberOfOrderIdsOfMaker, uint256 numberOfOrderIdsOfTaker) {
        return (orderBook.numberOfOrderIdsOfMaker(account), Settlement(payable(orderBook.settlement())).numberOfOrderIdsOfTaker(account));
    }

    function numberOfOrderIdsOfToken(address token) external view returns (uint256 numberOfOrderIdsOfFromToken, uint256 numberOfOrderIdsOfToToken) {
        return (orderBook.numberOfOrderIdsOfFromToken(token), orderBook.numberOfOrderIdsOfToToken(token));
    }

    function allOrders(uint256 page, uint256 limit) external view returns (
        Orders.Order[] memory orders,
        uint256 count,
        uint256 total
    ){
        uint256[] memory orderIds = orderBook.allOrderIds(page, limit);
        count = orderIds.length;
        total = orderBook.numberOfAllOrderIds();

        orders = new Orders.Order[](count);

        for(uint256 i=0; i<count; i++) {
            orders[i] = orderBook.orderById(orderIds[i]);
        }
    }

    function ordersOfMaker(address maker, uint256 page, uint256 limit) external view returns (
        Orders.Order[] memory orders,
        uint256 count,
        uint256 total
    ) {
        uint256[] memory orderIds = orderBook.orderIdsOfMaker(maker, page, limit);
        count = orderIds.length;
        total = orderBook.numberOfOrderIdsOfMaker(maker);

        orders = new Orders.Order[](count);

        for(uint256 i=0; i<count; i++) {
            orders[i] = orderBook.orderById(orderIds[i]);
        }
    }

    function ordersOfTaker(address taker, uint256 page, uint256 limit) external view returns (
        Orders.Order[] memory orders,
        uint256 count,
        uint256 total
    ) {
        Settlement settlement = Settlement(payable(orderBook.settlement()));
        uint256[] memory orderIds = settlement.orderIdsOfTaker(taker, page, limit);
        count = orderIds.length;
        total = settlement.numberOfOrderIdsOfTaker(taker);

        orders = new Orders.Order[](count);

        for(uint256 i=0; i<count; i++) {
            orders[i] = orderBook.orderById(orderIds[i]);
        }
    }

    function ordersOfToToken(address toToken, uint256 page, uint256 limit) external view returns (
        Orders.Order[] memory orders,
        uint256 count,
        uint256 total
    ) {
        uint256[] memory orderIds = orderBook.orderIdsOfToToken(toToken, page, limit);
        count = orderIds.length;
        total = orderBook.numberOfOrderIdsOfMaker(toToken);

        orders = new Orders.Order[](count);

        for(uint256 i=0; i<count; i++) {
            orders[i] = orderBook.orderById(orderIds[i]);
        }
    }

    function ordersOfFromToken(address fromToken, uint256 page, uint256 limit) external view returns (
        Orders.Order[] memory orders,
        uint256 count,
        uint256 total
    ) {
        uint256[] memory orderIds = orderBook.orderIdsOfFromToken(fromToken, page, limit);
        count = orderIds.length;
        total = orderBook.numberOfOrderIdsOfMaker(fromToken);

        orders = new Orders.Order[](count);

        for(uint256 i=0; i<count; i++) {
            orders[i] = orderBook.orderById(orderIds[i]);
        }
    }

}