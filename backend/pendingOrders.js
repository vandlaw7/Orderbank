const { fetchNowPools, findOptimalPath } = require("./findOptimalPath");
const { getTotalOrderListV1, getTotalOrderListV2 } = require("./orderList");
const { DOGE, DOGE_DECIMAL, ALICE, ALICE_DECIMAL } = require("./statics");
const { getTokensUsdValue } = require("./utils");

const PENDING = 1;

const pendingOrdersWithVersion = async (
  offset,
  limit,
  filter = {},
  version = 2
) => {
  let {
    availability = null,
    minProfit = 0,
    maxProfit = Number.MAX_SAFE_INTEGER,
    fromToken = null,
    toToken = null,
  } = filter;

  if (fromToken) {
    fromToken = fromToken.toLowerCase();
  }
  if (toToken) {
    toToken = toToken.toLowerCase();
  }

  let pendingOrders;
  if (version === 1) {
    pendingOrders = await getTotalOrderListV1(offset, limit, PENDING);
  } else if (version === 2) {
    pendingOrders = await getTotalOrderListV2(offset, limit, PENDING);
  }

  // console.log(pendingOrders);

  if (fromToken) {
    pendingOrders = pendingOrders.filter(
      (order) => order.fromToken === fromToken
    );
  }
  if (toToken) {
    pendingOrders = pendingOrders.filter((order) => order.toToken === toToken);
  }

  const pools = await fetchNowPools();
  // console.log(pools);

  let result = [];

  const pendingOrdersForAsync = pendingOrders.map((order) => {
    let { fromToken, toToken, fromAmount } = order;
    fromToken = fromToken.toLowerCase();
    toToken = toToken.toLowerCase();
    if ((fromToken = "0x0000000000000000000000000000000000000000")) {
      fromToken = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
    }
    return findOptimalPath(fromToken, toToken, fromAmount, pools);
  });
  // console.log('start!!')
  // const startTime = Date.now();
  const foundSwapInfos = await Promise.all(pendingOrdersForAsync);
  // console.log('total elapsed time: ', (Date.now() - startTime) /1000);

  const tokensToUsd = await getTokensUsdValue();

  foundSwapInfos.forEach((swapInfo, index) => {
    const { id, fromToken, toToken, fromAmount, toAmount, updatedAt } =
      pendingOrders[index];

    let availability = false;
    let profitRaw = 0;
    let profit = 0;
    let profitUsd = 0;
    let isValidSwapRequest = false;
    let path = [];
    let protocols = [];
    if (swapInfo) {
      isValidSwapRequest = true;

      const { amountOut } = swapInfo;
      profitRaw = amountOut - toAmount;
      availability = profitRaw > 0;

      if (toAmount === DOGE) {
        profit = profitRaw / Math.pow(10, DOGE_DECIMAL);
      } else if (toAmount === ALICE) {
        profit = profitRaw / Math.pow(10, ALICE_DECIMAL);
      } else {
        profit = profitRaw / Math.pow(10, 18);
      }

      profitUsd = profit * tokensToUsd[toToken];

      path = swapInfo.path;
      protocols = swapInfo.protocols;
    }
    result.push({
      // null이면 알아서 안 들어감
      id,
      isValidSwapRequest,
      availability: profit > 0,
      profitRaw,
      profit,
      profitUsd,
      fromToken,
      fromAmount,
      toToken,
      toAmount,
      path,
      protocols,
      time: updatedAt,
    });
  });

  if (availability === true) {
    result = result.filter((swap) => swap.availability === true);
  } else if (availability === false) {
    result = result.filter((swap) => swap.availability === false);
  }

  if (minProfit) {
    result = result.filter((swap) => swap.profitUsd > minProfit);
  }
  if (maxProfit < Number.MAX_SAFE_INTEGER) {
    result = result.filter((swap) => swap.profitUsd < maxProfit);
  }

  console.log(result);
  return result;
};

module.exports = { pendingOrdersWithVersion };
