import React, { useEffect, useState } from 'react'
// import TakerOrderList from '../../ComponentViews/TakerOrderList';
import { Button } from '@mui/material'
import { TakerOrderList } from '../ComponentViews/OrderList'

function HistoryView() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  // 	setTimeout(() => {
  // 		setIsLoading(false);
  // 	}, 50);
  // }, []);
  const [isMakerShow, setIsMakerShow] = useState(true)
  return (
    <div>
      <div>
        <p>Transaction History</p>
        <Button variant="text" onClick={() => setIsMakerShow(true)}>
          Maker
        </Button>
        <Button variant="text" onClick={() => setIsMakerShow(false)}>
          Taker
        </Button>
        {isMakerShow ? <TakerOrderList /> : null}
      </div>
    </div>
  )
}

export default HistoryView
