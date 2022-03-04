import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 1e+9, ROUNDING_MODE: BigNumber.ROUND_FLOOR })

export function getAmountWithDecimals(tokenCount, decimal) {
  if (Number(tokenCount) === 0 || Number.isNaN(Number(tokenCount)) || !decimal) {
    return '0'
  }
  try {
    const multiply = new BigNumber(10).pow(decimal)
    const amountWithDecimals = new BigNumber(tokenCount).times(multiply).toFixed(0)
    return amountWithDecimals
  } catch (error) {
    console.log('throw error')
    return '0'
  }
}

export function plusNum0Num1(num0, num1) {
  return new BigNumber(num0).plus(new BigNumber(num1)).toString()
}

export function getCountFromBigNum(tokenCount, decimal, fixedValue) {
  if (Number(tokenCount) === 0 || Number.isNaN(Number(tokenCount)) || !decimal) {
    return '0'
  }
  if (fixedValue !== undefined) {
    const multiply = new BigNumber(10).pow(decimal)
    const amountWithDecimals = new BigNumber(tokenCount).div(multiply).toFixed(fixedValue)
    return amountWithDecimals
  }
  const multiply = new BigNumber(10).pow(decimal)
  const amountWithDecimals = new BigNumber(tokenCount).div(multiply).toFixed(6)
  return amountWithDecimals
}
