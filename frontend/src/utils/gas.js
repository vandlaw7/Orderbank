import Web3 from 'web3'

export async function estimateGas(encodedMethod, walletAddr) {
  const web3 = new Web3(window.ethereum)
  try {
    const gas = await web3.eth.estimateGas({
      to: walletAddr,
      data: encodedMethod,
    })
    return (gas * 60).toString() || '800000'
  } catch (error) {
    console.error(error)
    return '800000'
  }
}

// 0.019279 스왑
// 0.002375 사용승인
// 0.021942 풀
