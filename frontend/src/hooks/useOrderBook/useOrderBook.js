import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import Web3 from 'web3'
import { abi, address } from '../../abi/OrderBook.json'
import Tokens from '../../abi/Tokens.json'
import { estimateGas, getAmountWithDecimals, plusNum0Num1 } from '../../utils'

export function useOrderBook() {
  const { chainId, account } = useWeb3React()
  const web3 = new Web3(window.ethereum)
  const orderBankCoreContract = new web3.eth.Contract(abi, address)

  const makeOrder = useCallback(async (fromToken, toToken, fromAmount, toAmount) => {
    if (!account || !chainId) return

    try {
      const fromAmountParam = getAmountWithDecimals(fromAmount, Tokens[fromToken].decimals)
      const toAmountParam = getAmountWithDecimals(toAmount, Tokens[toToken].decimals)
      const feeAmount = getAmountWithDecimals('0.01', Tokens.BNB.decimals)

		  const encodedMethod = orderBankCoreContract.methods.makeOrder(
        Tokens[fromToken].address,
        Tokens[toToken].address,
        fromAmountParam,
        toAmountParam,
        feeAmount,
		  ).encodeABI()
		  const gas = await estimateGas(encodedMethod, account)

		  if (fromToken === 'BNB') {
        const totalBNB = plusNum0Num1(feeAmount, fromAmountParam)
        console.log('@@ params ', {
			  fromTokenAddr: Tokens[fromToken].address,
			  toTokenAddr: Tokens[toToken].address,
			  fromAmountParam,
			  toAmountParam,
			  feeAmount,
			  value: totalBNB,
			  gas,
        })
        const result = await orderBankCoreContract.methods.makeOrder(
			  Tokens[fromToken].address,
			  Tokens[toToken].address,
			  fromAmountParam,
			  toAmountParam,
			  feeAmount,
        ).send({ from: account, gas, value: totalBNB })
        console.log('@@@ result ', result)
        return result
      }
		  const value = plusNum0Num1(feeAmount, '0')
      const result = await orderBankCoreContract.methods.makeOrder(
        Tokens[fromToken].address,
        Tokens[toToken].address,
        fromAmountParam,
        toAmountParam,
        value,
		  ).send({ from: account, gas, value })
		  console.log('@@ result ', result)
      return result
    } catch (error) {
      console.error(error)
      return false
    }
  }, [account, chainId])

  const cancelOrder = useCallback(
    async (oid) => {
      if (!account || !chainId) return

      try {
        const encodedMethod = orderBankCoreContract.methods.cancelOrder(oid).encodeABI()
        const gas = await estimateGas(encodedMethod, account)

        const result = await orderBankCoreContract.methods.cancelOrder(oid).send({ from: account, gas })

        return result
      } catch (error) {
        console.error(error)
        return false
      }
    },
    [account, chainId],
  )

  return {
    makeOrder,
    cancelOrder,
  }
}
