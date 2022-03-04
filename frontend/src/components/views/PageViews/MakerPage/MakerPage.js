import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import ChartView from '../../../Swap/ChartView'
// import MakerOrderList from '../../ComponentViews/MakerOrderList';
import { MakerOrderList } from '../../ComponentViews/OrderList'
import { SwapParent } from '../../../Swap/SwapParent'

function MakerView() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  // 	setTimeout(() => {
  // 		setIsLoading(false);
  // 	}, 50);
  // }, []);
  const [walletConnect, setWalletConnect] = useState(false)
  const [isOrderShow, setIsOrderShow] = useState(true)

  useEffect(() => {})
  return (
    <div>
      <div>
        <SwapParent />
        {/* <Button onClick={() => getPath()}> get path </Button> */}
        {/* <ChartView /> */}
        <Button variant="text" onClick={() => setIsOrderShow(true)}>
          Orders
        </Button>
        <Button variant="text" onClick={() => setIsOrderShow(false)}>
          Transaction History
        </Button>
        {isOrderShow ? <MakerOrderList /> : null}
        {/* {isOrderShow ? null : null} */}
      </div>
    </div>
  )
}

export default MakerView
