import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import Tokens from '../../abi/Tokens.json'
import { getWeb3Instance } from '../../config/Web3'
import { getCountFromBigNum } from '../../utils'

export function useWalletBalance() {
  const viewWeb3 = getWeb3Instance()
  const {
    chainId, account, library, activate, deactivate, active,
  } = useWeb3React()

  const getBalance = useCallback(async (token) => {
    if (!account || !chainId) {
      return '0'
    }

    const { address } = Tokens[token]
    try {
      if (token === 'BNB') {
        const bnbBalance = await viewWeb3.eth.getBalance(account)
        return getCountFromBigNum(bnbBalance, 18, 18)
      }
      const tokenContract = new viewWeb3.eth.Contract(Tokens.abi, address)
      const balance = await tokenContract.methods.balanceOf(account).call()

      return getCountFromBigNum(balance, 18, 18)
    } catch (error) {
      console.error(error)
      return '0'
    }
  }, [account])

  return {
    getBalance,
  }
}
