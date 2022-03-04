import React from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import '../../../css/Components.css'

function TakerOrderList({ orders, onRowClick }) {
  const sampleData = []

  // dummy data
  const SampleStatus = ['Pending', 'Completed']
  const SampleTokens = ['BNB', 'CAKE', 'BTC', 'ETH', 'BUSD']
  const SampleTime = ['0 min ago', '1 min ago', '2 min ago', '3 min ago', '4 min ago', '5 min ago']
  for (let i = 0; i < 100; i++) {
    sampleData.push({
      id: i,
      Status: SampleStatus[Math.floor(Math.random() * 2)],
      Profit: (Math.random() * 12).toFixed(4),
      'From Token': SampleTokens[Math.floor(Math.random() * 5)],
      'To Token': SampleTokens[Math.floor(Math.random() * 5)],
      'Reward BNB': (Math.random() * 12).toFixed(4),
      Total: (Math.random() * 20).toFixed(4),
      Time: SampleTime[Math.floor(Math.random() * 6)],
    })
  }
  // dummy data

  const defaultColDef = {
    editable: false,
    filter: false,
    suppressMovable: true,
    // suppressHorizontalScroll: true,
    // debounceVerticalScrollbar: true,
  }

  return (
    <div className="taker-order-list" rowSelection="single">
      <AgGridReact rowData={sampleData} defaultColDef={defaultColDef}>
        <AgGridColumn field="Profit" width={110} />
        <AgGridColumn field="From Token" width={150} />
        <AgGridColumn field="To Token" width={150} />
        <AgGridColumn field="Reward BNB" unSortIcon sortable />
        <AgGridColumn field="Total" width={110} unSortIcon sortable />
        <AgGridColumn field="Time" width={110} unSortIcon sortable sort="asc" />
        <AgGridColumn field="Status" width={110} />
      </AgGridReact>
    </div>
  )
}

export default TakerOrderList
