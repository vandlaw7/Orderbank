const ethers = require("ethers");
const { PANCAKE_VIEWER_ABI } = require("./abis");
const { estimateOut, findPool } = require("./utils");
const {
  CENTRAL_TOKENS,
  BNB_ATTACHED_TOKENS,
  BUSD_ATTACHED_TOKENS,
  WHOLE_TOKENS,
  BNB,
  BUSD,
  CENTRAL_TOKENS_GRAPH,
  TOP_30_POOLS,
  JSON_RPC_ENDPOINT,
  PANCAKE_VIEWER_CONTRACT_ADDRESS,
  PANCAKE_SWAP_ADDRESS,
} = require("./statics");
const BigNumber = require("bignumber.js");

const fetchNowPools = async () => {
  const provider = new ethers.providers.JsonRpcProvider(JSON_RPC_ENDPOINT);
  const viewerContract = new ethers.Contract(
    PANCAKE_VIEWER_CONTRACT_ADDRESS,
    PANCAKE_VIEWER_ABI,
    provider
  );
  const poolsRaw = await viewerContract.poolInfosByList(TOP_30_POOLS);

  const pools = poolsRaw.map((pool) => {
    let lowerPool = { ...pool };
    lowerPool["token0"] = pool["token0"].toLowerCase();
    lowerPool["token1"] = pool["token1"].toLowerCase();
    return lowerPool;
  });

  //이렇게 pool 여러 개를 불러낸 다음에, 최적 비율을 알아야 한다.

  return pools;
};

const findOptimalPath = async (from, to, amountIn, pools) => {
  from = from.toLowerCase();
  to = to.toLowerCase();

  let path = [from];
  // ------------------------------------------------------------------
  // 1) BNB 부속이면 BNB로, BUSD 부속이면 BUSD로 스왚
  // ------------------------------------------------------------------

  if (!WHOLE_TOKENS.includes(from) || !WHOLE_TOKENS.includes(to)) {
    console.log("This token can not be swapped in this service.");
    return null;
  }

  if (BNB_ATTACHED_TOKENS.includes(from)) {
    const bnbPool = findPool(pools, from, BNB);
    amountIn = estimateOut(bnbPool, from, amountIn);
    path.push(BNB);
    from = BNB;
  } else if (BUSD_ATTACHED_TOKENS.includes(from)) {
    const busdPool = findPool(pools, from, BUSD);
    amountIn = estimateOut(busdPool, from, amountIn);
    path.push(BUSD);
    from = BUSD;
  }

  // ------------------------------------------------------------------
  // 2) 만약 BNB 부속이나 BUSD 부속 토큰 내부의 스왚이라면, 그대로 스왚해주고 종료
  // ------------------------------------------------------------------
  if (
    (from === BNB && BNB_ATTACHED_TOKENS.includes(to)) ||
    (from === BUSD && BUSD_ATTACHED_TOKENS.includes(to))
  ) {
    path.push(to);
    return path;
  }

  // ------------------------------------------------------------------
  // 3) 중심 토큰들 7개 사이에서 최적 경로를 탐색
  // ------------------------------------------------------------------

  const real_to = to;
  if (BNB_ATTACHED_TOKENS.includes(real_to)) {
    to = BNB;
  } else if (BUSD_ATTACHED_TOKENS.includes(real_to)) {
    to = BUSD;
  }

  // 재귀함수를 돌려서,
  // (1)경로 상의 이전 토큰이 들어있고,
  // (2)지금까지의 경로에 없었던 LP를 찾아서 교환하고 산출량을 저장.
  // (3)to token에 도달하면 함수 종료.
  // 이렇게 찾은 to token 산출량 중에서 가장 산출량이 큰 경로를 채택.

  let pathsWithAmountOut = [];

  const addPath = (nowPath, amountIn) => {
    const nowFrom = nowPath[nowPath.length - 1];
    if (nowFrom === to) {
      pathsWithAmountOut.push({ path: nowPath, amountOut: amountIn });
      return;
    }
    const candidates = CENTRAL_TOKENS_GRAPH[nowFrom];
    const filteredCandidates = candidates.filter(
      (candidate) => !nowPath.includes(candidate)
    );
    filteredCandidates.forEach((candidate) => {
      // forEach 돌면서 같은 pathNow에 add되는 현상 피하기 위해 copy
      const nowPathForExtend = nowPath.slice();
      const pool = findPool(pools, nowFrom, candidate);
      const amountOut = estimateOut(pool, nowFrom, amountIn);
      nowPathForExtend.push(candidate);
      addPath(nowPathForExtend, amountOut);
    });
  };
  // central token의 경로만 maxPath에 기록하고, 전체경로는 나중에 concat해준다.
  const nowPath = [path[path.length - 1]];
  addPath(nowPath, amountIn);

  let maxPath = [];
  let maxAmountOut = 0;
  pathsWithAmountOut.forEach((pathWithAmountOut) => {
    if (pathWithAmountOut.amountOut > maxAmountOut) {
      maxPath = pathWithAmountOut.path;
      maxAmountOut = pathWithAmountOut.amountOut;
    }
  });

  path.pop();
  path = path.concat(maxPath);

  // ------------------------------------------------------------------
  // 4) 최종 path 반환
  // ------------------------------------------------------------------
  if (!CENTRAL_TOKENS.includes(real_to)) {
    const nowFrom = path[path.length - 1];
    const pool = findPool(pools, nowFrom, real_to);
    maxAmountOut = estimateOut(pool, nowFrom, maxAmountOut);
    path.push(real_to);
  }

  // console.log('final path', path);
  // console.log('maxAmountOut', String(maxAmountOut))
  // console.log('elapsed time: ', (Date.now() - startTime) / 1000);
  return {
    path,
    amountOut: String(maxAmountOut),
    protocols: new Array(path.length - 1).fill(PANCAKE_SWAP_ADDRESS),
  };
};

const setImmediate = (fn) => {
  setTimeout(fn, 0);
};

module.exports = { findOptimalPath, fetchNowPools };

const main = async () => {
  const wow = await fetchNowPools();
  console.log(wow);
};
main();
