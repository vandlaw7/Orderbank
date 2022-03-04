import { ethers } from 'ethers'
// import { OrderBankAbi } from '../../constant/OrderBankAbi';
import { ERC20Abi } from '../../constant/ERC20Abi'
import { tokenName } from '../../constant/tokenName'
import { tokenAddress } from '../../constant/tokenAddress'
// import { contractAddress } from '../../constant/contractAddress';

import { orderBankAddress, orderBankAbi } from '../../constant/contracts'

export function makeOrder(account, library, fromToken, toToken, fromAmount, toAmount, feeAmount) {
  const signer = library?.getSigner(account).connectUnchecked()

  // 토큰 이름 인덱스 == 토큰 주소 인덱스
  const fromAddress = tokenAddress[tokenName.indexOf(fromToken)]
  const toAddress = tokenAddress[tokenName.indexOf(toToken)]
  // OrderBank contract
  const orderBankContract = new ethers.Contract(orderBankAddress, orderBankAbi, signer)
  // sell token contract
  const erc20TokenContract = new ethers.Contract(fromAddress, ERC20Abi, signer)
  // uint256 파라미터 parseEther
  const _fromAmount = ethers.utils.parseEther(fromAmount)
  const _toAmount = ethers.utils.parseEther(toAmount)
  const _feeAmount = ethers.utils.parseEther(feeAmount)
  // allowance max_num
  const maxNum = ethers.constants.MaxUint256
  console.log(_fromAmount)
  return fromAddress === tokenAddress[0]
    ? // BNB가 SELL TOKEN 일 경우 로직
		  orderBankContract.makeOrder(fromAddress, toAddress, _fromAmount, _toAmount, _feeAmount, {
      value: ethers.utils.parseEther(String(parseFloat(fromAmount) + parseFloat(feeAmount))),
		  })
    : // BEP20이 SELL TOKEN일 경우 로직
		  erc20TokenContract
      .allowance(account, orderBankAddress)
      .then((allowance) => (allowance.toString() === '0' ? erc20TokenContract.approve(orderBankAddress, maxNum) : ''))
      .then(() =>
        orderBankContract.makeOrder(fromAddress, toAddress, _fromAmount, _toAmount, _feeAmount, { value: _feeAmount })
      )
    // 트랜잭션 해쉬 로깅
      .then((txObj) => {
        console.log('txHash', txObj.hash)
      })
}
