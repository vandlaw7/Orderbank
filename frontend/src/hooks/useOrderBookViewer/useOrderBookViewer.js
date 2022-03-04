import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { abi, address } from '../../abi/OrderBookViewer.json'
import { getWeb3Instance } from '../../config/Web3'
import Tokens from '../../abi/Tokens.json'

export function useOrderBookViewer() {
  const {
    chainId, account, library, activate, deactivate, active,
  } = useWeb3React()
  const viewWeb3 = getWeb3Instance()
  const orderBankViewerContract = new viewWeb3.eth.Contract(abi, address)

  const getAllOrders = useCallback(async (offset, limit) => {
    try {
      const res = await orderBankViewerContract.methods.allOrders(offset, limit).call()
      console.log('@@ res ', res)
      return res
    } catch (error) {
      console.error(error)
      return {
        orders: [],
        count: 0,
        total: 0
      }
    }
  }, [chainId, library])
  
  const getOrdersOfMaker = useCallback(async (offset, limit) => {
    try {
      const res = await orderBankViewerContract.methods.ordersOfMaker(account, offset, limit).call()
      return res
    } catch (error) {
      console.error(error)
      return {
        orders: [],
        count: 0,
        total: 0
      }
    }
  }, [chainId, account, library])
  
  const getOrdersOfTaker = useCallback(async (offset, limit) => {
    if (!account || !chainId) return

    try {
      const res = await orderBankViewerContract.methods.ordersOfTaker(account, offset, limit).call()
      return res
    } catch (error) {
      console.error(error)
      return {
        orders: [],
        count: 0,
        total: 0
      }
    }
  }, [chainId, account, library])
  
  const getOrdersOfToToken = useCallback(async (toToken, offset, limit) => {
    if(!Tokens[toToken].address){
      return {
        orders: [],
        total: 0,
        count: 0
      }
    }
    try {
      const res = await orderBankViewerContract.methods.ordersOfToToken(Tokens[toToken].address, offset, limit).call()
      return res
    } catch (error) {
      console.error(error)
      return {
        orders: [],
        count: 0,
        total:0 
      }
    }
  }, [chainId, account, library])

  const getOrdersOfFromToken = useCallback(async (fromToken, offset, limit) => {
    if(!Tokens[fromToken].address){
      return {
        orders: [],
        total: 0,
        count: 0
      }
    }
    try {
      const res = await orderBankViewerContract.methods.ordersOfFromToken(Tokens[fromToken].address, offset, limit).call()
      return res
    } catch (error) {
      console.error(error)
      return {
        orders: [],
        count: 0,
        total:0 
      }
    }
  }, [chainId, account, library])
  return {
    getAllOrders,
    getOrdersOfMaker,
    getOrdersOfTaker,
    getOrdersOfToToken,
    getOrdersOfFromToken   
  }
}
