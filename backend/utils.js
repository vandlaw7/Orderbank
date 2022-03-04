const BigNumber = require('bignumber.js');
const {tokenToBinanceSymbol} = require('./statics');
const axios = require('axios');

const fee = 0.9975;

const estimateOut = (pool, from, amountIn) => {
  if (BigNumber(amountIn).isZero()) {
		return BigNumber(0);
	};

  const {token0, token0Reserve, token1Reserve} = pool;

  let fromTokenReserve = (from == token0) ? token0Reserve : token1Reserve;
  let toTokenReserve = (from == token0) ? token1Reserve : token0Reserve;

  fromTokenReserve = BigNumber(String(fromTokenReserve));
  toTokenReserve = BigNumber(String(toTokenReserve));

	const adjustedAmountIn = BigNumber(String(amountIn)).multipliedBy(fee);
  const exchangeRate = toTokenReserve.div(fromTokenReserve.plus(adjustedAmountIn));
  
  return adjustedAmountIn.multipliedBy(exchangeRate);
}

const findPool = (pools, token0, token1) => {
  let targetPool = null;
  pools.forEach((pool)=> {
    if ( 
      (token0 === pool['token0'] && token1 === pool['token1']) || 
      (token0 === pool['token1'] && token1 === pool['token0'])
    ) {
      targetPool = pool;
    }
  })
    
  return targetPool;
}

const tokenToUsd = async (token) => {
  const binanceSymbol = tokenToBinanceSymbol[token];
  const requestURL = `https://api.binance.com/api/v3/ticker/price?symbol=${binanceSymbol}USDT`
  try {
    const result = await axios.get(requestURL);
    return result.data.price;
  } catch (err) {
    console.log('Binance API error');
    return 0;
  }
}

const getTokensUsdValue = async () => {
    const result = {};
    await Promise.all(Object.keys(tokenToBinanceSymbol).map(async (token) => {
      if (tokenToBinanceSymbol[token] === 'USDT') {
        result[token] = 1;
      } else {
        const usdValue = await tokenToUsd(token);
        result[token] = Number(usdValue);  
      }
    }))
    return result;

}

module.exports = {estimateOut, findPool, tokenToUsd, getTokensUsdValue};
