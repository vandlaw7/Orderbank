import React, { useEffect, useState } from 'react'
// import TakerOrderList from '../../ComponentViews/TakerOrderList';
import { Button } from '@mui/material'
import { EnhancedTable } from '../../ComponentViews/OrderListTest'

function TestView() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  // 	setTimeout(() => {
  // 		setIsLoading(false);
  // 	}, 50);
  // }, []);
  // const [isOrderShow, setIsOrderShow] = useState(true);
  return (
    <div>
      <EnhancedTable />
    </div>
  )
}

export default TestView
