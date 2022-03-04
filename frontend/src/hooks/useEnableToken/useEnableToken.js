import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import Web3 from 'web3'
import { MaxUint256 } from '@ethersproject/constants'
import Tokens from '../../abi/Tokens.json'
import { FunctionContracts } from '../../config/Contracts'
import { getWeb3Instance } from '../../config/Web3'

export function useEnableToken() {
  const { account } = useWeb3React()
  const web3 = new Web3(window.ethereum)
  const viewWeb3 = getWeb3Instance()
  const maxuint = MaxUint256.toString()

  /**
     * @param {string} tokenName
     * @param {string} contractName
     */
  const enableToken = useCallback(async (tokenName, contractName) => {
    if (!account) {
      return false
    }
    if (!Tokens[tokenName]) {
      return false
    }
    try {
      const userTokenContract = new web3.eth.Contract(Tokens.abi, Tokens[tokenName].address)
      const contractData = FunctionContracts[contractName]
      if (!contractData) {
        return false
      }
      const result = await userTokenContract.methods.approve(contractData.address, maxuint).send({ from: account, gas: 250000 })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }, [account])

  /**
     * @param {string} tokenName
     * @param {string} contractName
     */
  const checkEnabled = useCallback(async (tokenName, contractName) => {
    if (!account) {
      return false
    }
    if (!Tokens[tokenName]) {
      return false
    }
    if (tokenName === 'BNB') {
      return true
    }
    const contract = new viewWeb3.eth.Contract(Tokens.abi, Tokens[tokenName].address)
    try {
      const contractData = FunctionContracts[contractName]
      const viewAllow = await contract.methods.allowance(account, contractData.address).call()

      if (!viewAllow || viewAllow === '0') {
        return false
      }
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }, [account])

  return {
    enableToken,
    checkEnabled,
  }
}
