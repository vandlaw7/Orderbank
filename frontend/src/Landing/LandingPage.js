import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { HeroPatternBg, ArrowIcon, MainBTCLogo } from '../images/index'
import { abi, address } from '../components/viewerData/orderBank'
import DataIndicator from '../components/views/ComponentViews/DataIndicator'
import './Landing.css'

function MainView() {
  const [isLoading, setIsLoading] = useState(true)
  // const [orderBankInfo, setOrderBankInfo] = useState({});
  const [orderBankStatus, setOrderBankStatus] = useState([13837, 0, 0, 0])
  // const [pendingSwapIdx, setPendingSwapIdx] = useState(0);
  // const [canceledSwapIdx, setCanceledSwapIdx] = useState(0);
  // const [completedSwapIdx, setCompletedSwapIdx] = useState(0);

  // const signer = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
  // const signer = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.defibit.io/');
  // const signer = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.ninicoin.io/');
  // const signer = new ethers.providers.JsonRpcProvider('https://bsc-dataseed2.defibit.io/');
  const signer = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s2.binance.org:8545/')
  const orderBankViewerContract = new ethers.Contract(address, abi, signer)
  async function getOrderBankInfo() {
    const orderBankStatus = await Promise.all([
      orderBankViewerContract.allOrdersLength().then((res) => Number(res)),
      orderBankViewerContract.totalPending().then((res) => Number(res)),
      orderBankViewerContract.totalCompleted().then((res) => Number(res)),
      orderBankViewerContract.totalCanceled().then((res) => Number(res)),
    ]).catch((err) => {
      console.log(err)
      return [0, 0, 0, 0]
    })
    return orderBankStatus
  }

  // useEffect(() => {
  // 	setTimeout(() => {
  // 		setIsLoading(false);
  // 	}, 50);
  // }, []);

  useEffect(async () => {
    try {
      const orderBankStatus = await getOrderBankInfo()
      console.log(orderBankStatus)
      setOrderBankStatus(orderBankStatus)
    } catch (err) {
      console.log('jsonRpcProvider error: ', err)
    }
  }, [])

  return (
    <div className="main-view">
      <div className="desc">
        <div className="desc-text">
          <h2>Trade Crypto Your Way</h2>
          <h1>Next Step of AMM</h1>
          <p>
            OrderBank is a complete, non-custodial decentralized exchange
            {' '}
            <br />
            running on an on-chain central
            limit orderbook on BSC.
          </p>
          <div className="desc-buttons">
            <button className="btn-style1 theme1 btn-effect1">
              <img src={ArrowIcon} className="margin-12" alt='arrow icon'/>
              <span>&nbsp; Start Trading</span>
            </button>
            <button className="btn-style1 theme2 btn-effect1">
              <span>Learn More</span>
            </button>
          </div>
        </div>
        <img className="desc-img" src={MainBTCLogo} width="350px" alt="bitcoin-earth" />
      </div>
      <img src={HeroPatternBg} className="pattern-img" alt='hero pattern bg'/>
      <div className="bottom">
        <div className="indicators">
          <DataIndicator classStyle="indicator" value="$912,277,732" name="TVL" />
          {/* <h2>Total Orders {orderBankStatus[0]}</h2> */}
        </div>
        <div className="indicators">
          <DataIndicator classStyle="indicator" value={13837} name="Total Transactions/24hrs" />
          <DataIndicator classStyle="indicator" value={5534} name="Waiting Transactions/24hrs" />
          <DataIndicator classStyle="indicator" value={8303} name="Completed Orders/24hrs" />
        </div>
      </div>
    </div>
  )
}

export default MainView
