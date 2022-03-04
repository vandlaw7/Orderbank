pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

interface IOrderBank {

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

    enum Status {
        None,
        Pending,
        Completed,
        Canceled
    }

    function allOrders(uint256 oid) external view returns (OrderInfo memory);
    function makerOrders(address account, uint256 index) external view returns (uint256);
    function takerOrders(address account, uint256 index) external view returns (uint256);
    function allOrdersLength() external view returns (uint256);
    function makerOrdersLength(address account) external view returns (uint256);
    function takerOrdersLength(address account) external view returns (uint256);
    function totalPending() external view returns (uint256);
    function totalCompleted() external view returns (uint256);
    function totalCanceled() external view returns (uint256);
}

contract OrderBankViewer {
    using SafeMath for uint256;

    struct OrderBankInfo {
        uint256 allOrdersLength;
        uint256 totalPending;
        uint256 totalCompleted;
        uint256 totalCanceled;
    }

    IOrderBank public immutable orderBank;

    constructor(
        address _orderBank
    ) public  { 
        orderBank = IOrderBank(_orderBank);
    }

    function getOrderBankInfo() public view returns (OrderBankInfo memory orderBankInfo) {
        orderBankInfo = OrderBankInfo(
            orderBank.allOrdersLength(), //전체 주문의 수
            orderBank.totalPending(), //전체 Pending의 수
            orderBank.totalCompleted(), //전체 Completed의 수
            orderBank.totalCanceled() //전체 주문 중 Calceled의 수
        );
    }

    function getTotalOrderList(
        uint256 offset, 
        uint256 limit, 
        IOrderBank.Status status
    ) public view returns (IOrderBank.OrderInfo[] memory orders, uint256 totalOrder, uint256 count, uint256 lastOffset){
        totalOrder = orderBank.allOrdersLength();

        orders = new IOrderBank.OrderInfo[](limit);

        uint256 oid = totalOrder.sub(1).sub(offset);
        count = 0;

        lastOffset = offset;
        while(count <= limit){
            IOrderBank.OrderInfo memory orderInfo = orderBank.allOrders(oid);

            if(status == IOrderBank.Status.None || orderInfo.status == status){
                orders[count] = orderInfo;
                count += 1;
            }
            
            if(oid == 0) break;
            oid -= 1;
            lastOffset += 1;
        }
    }

    function getMakerOrderList(
        address account, 
        uint256 offset, 
        uint256 limit, 
        IOrderBank.Status status
    ) public view returns (IOrderBank.OrderInfo[] memory orders, uint256 totalOrder, uint256 count, uint256 lastOffset){
        totalOrder = orderBank.makerOrdersLength(account);

        orders = new IOrderBank.OrderInfo[](limit);
        uint256 index = totalOrder.sub(1).sub(offset);
        count = 0;

        lastOffset = offset;
        while(count <= limit){
            IOrderBank.OrderInfo memory orderInfo = orderBank.allOrders(orderBank.makerOrders(account, index));

            if(status == IOrderBank.Status.None || orderInfo.status == status){
                orders[count] = orderInfo;
                count += 1;
            }
            
            if(index == 0) break;
            index -= 1;
            lastOffset += 1;
        }
    }

    function getTakerOrderList(
        address account, 
        uint256 offset, 
        uint256 limit
    ) public view returns (IOrderBank.OrderInfo[] memory orders, uint256 totalOrder, uint256 count, uint256 lastOffset) {
        totalOrder = orderBank.takerOrdersLength(account);

        orders = new IOrderBank.OrderInfo[](limit);
        uint256 index = totalOrder.sub(1).sub(offset);
        count = 0;

        lastOffset = offset;
        while(count <= limit){
            IOrderBank.OrderInfo memory orderInfo = orderBank.allOrders(orderBank.takerOrders(account, index));

            orders[count] = orderInfo;
            count += 1;
            
            if(index == 0) break;
            index -= 1;
            lastOffset += 1;
        }
    }
}