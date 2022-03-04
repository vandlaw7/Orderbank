pragma solidity =0.6.12;

library Orders {

    //status of order
    enum Status {
        None,
        Pending,
        Completed,
        Canceled
    }
    
    struct Order {
        uint256 id; //Order Id
        Status status; //Order status
        address payable maker; //address of order maker
        address payable taker; //address of order taker
        address fromToken; //address of from token
        address toToken; //address of toToken
        uint256 fromAmount; //ordered FromAmount
        uint256 toAmount; //ordered ToAmount
        uint256 fee; //ordered fee
        uint256 outAmount; //amount of toToken get by swap.
        uint256 orderedAt; //Time when the order was made
        uint256 updatedAt;
    }
    
    function validate(Order memory order) internal {
        require(order.maker != address(0), "invalid-maker");
        require(order.fromToken != address(0), "invalid-from-token");
        require(order.toToken != address(0), "invalid-to-token");
        require(order.fromToken != order.toToken, "duplicate-tokens");
        require(order.fromAmount > 0, "invalid-amount-in");
        require(order.toAmount > 0, "invalid-amount-out-min");
    }
}