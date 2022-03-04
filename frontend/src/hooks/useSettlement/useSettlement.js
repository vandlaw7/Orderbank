import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import Web3 from 'web3'
import { abi, address } from '../../abi/Settlement.json'
import { estimateGas } from '../../utils'

export function useSettlement() {
  const { chainId, account } = useWeb3React()
  const web3 = new Web3(window.ethereum)
  const settlementContract = new web3.eth.Contract(abi, address)

  const takeOrder = useCallback(async (oid, path, protocols) => {
    if (!account || !chainId) return

    try {
      const encodedMethod = settlementContract.methods.takeOrder(
        Number(oid),
        path,
        protocols,
      ).encodeABI()
      const gas = await estimateGas(encodedMethod, account)

      const result = await settlementContract.methods.takeOrder(
        Number(oid),
        path,
        protocols,
      ).send({ from: account, gas })
      console.log('@@ result', result)
      return result
    } catch (error) {
      console.error(error)
      return false
    }
  }, [account, chainId])
  return {
    takeOrder,
  }
}
