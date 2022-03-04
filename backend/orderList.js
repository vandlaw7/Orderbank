const ethers = require("ethers");
const BigNumber = require("bignumber.js");
const { ORDER_BANK_VIEWER_ABI, ORDER_BANK_V2_VIEWER_ABI } = require("./abis");
const {
  JSON_RPC_ENDPOINT,
  ORDER_BANK_VIEWER_CONTRACT_ADDRESS,
} = require("./statics");
const { getViewerContractAddress } = require("./getViewerContractAddress");

const provider = new ethers.providers.JsonRpcProvider(JSON_RPC_ENDPOINT);

const organizeTotalOrderInfo = (totalOrderList, count) => {
  const rawCount = BigNumber(String(totalOrderList.length));
  count = BigNumber(String(count));
  let ret = totalOrderList;
  if (rawCount.minus(count) > 0) {
    ret = totalOrderList.slice(0, count);
  }
  const lowerRet = ret.map((order) => {
    let lowerOrder = { ...order };
    lowerOrder.fromToken = order.fromToken.toLowerCase();
    lowerOrder.toToken = order.toToken.toLowerCase();
    return lowerOrder;
  });
  return lowerRet;
};

const getTotalOrderListV1 = async (offset, limit, status) => {
  const viewerContract = new ethers.Contract(
    ORDER_BANK_VIEWER_CONTRACT_ADDRESS,
    ORDER_BANK_VIEWER_ABI,
    provider
  );

  const totalOrderInfo = await viewerContract.getTotalOrderList(
    offset,
    limit,
    status
  );

  const totalOrderList = totalOrderInfo[0];
  const { count } = totalOrderInfo;

  return organizeTotalOrderInfo(totalOrderList, count);
};

const getTotalOrderListV2 = async (offset, limit, status = 0) => {
  const orderBookViewerContractAddress = await getViewerContractAddress();
  const viewerContract = new ethers.Contract(
    orderBookViewerContractAddress,
    ORDER_BANK_V2_VIEWER_ABI,
    provider
  );

  const totalOrderInfo = await viewerContract.allOrders(offset, limit);
  let { orders, total } = totalOrderInfo;

  let result = organizeTotalOrderInfo(orders, total);

  if (status !== 0) {
    result = result.filter((order) => order.status === status);
  }

  return result;
};

const main = async () => {
  const orders = await getTotalOrderListV2(0, 15);
  console.log(orders);
};

main();

module.exports = { getTotalOrderListV1, getTotalOrderListV2 };
