import { getWeb3Instance } from '../config/Web3'

const web3 = getWeb3Instance()
export async function getBlockNumber() {
  try {
    const blockNumber = await web3.eth.getBlockNumber()
    return blockNumber
  } catch (error) {
    return 0
  }
}
/**
 *
 * @param {number} unixTimestamp
 * @returns {string}
 */
export function getRemainTime(unixTimestamp) {
  const seconds = Math.floor((new Date() - new Date(unixTimestamp * 1000)) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return `${Math.floor(interval)} years`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} months`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)} days`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)} hours`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`
  }
  return `${Math.floor(seconds)} seconds`
}
