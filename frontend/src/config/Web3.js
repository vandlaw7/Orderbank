import Web3 from 'web3'

export const RPC_URL = 'https://data-seed-prebsc-1-s2.binance.org:8545/'

export function getWeb3Instance() {
  return new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443'))
}
