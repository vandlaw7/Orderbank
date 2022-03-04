import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import {
  Bar, ComposedChart, Tooltip, XAxis,
  YAxis
} from 'recharts'
import { abi, address } from '../viewerData/orderBank'

function ChartView(fromToken, toToken) {
  const jsonRpcEndpoint = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.ninicoin.io/')
  const orderBankViewerContract = new ethers.Contract(address, abi, jsonRpcEndpoint)

  const [pendingNumber, setPendingNumber] = useState([])

  useEffect(() => {
    orderBankViewerContract.getOrderBankInfo().then((res) => setPendingNumber(res.totalPending()))
  }, [])

  const [totalOrderList, setTotalOrderList] = useState([])
  useEffect(() => {
    orderBankViewerContract.getTotalOrderList(0, pendingNumber, 'Pending').then((res) => setTotalOrderList(res[0]))
  }, [])

  const barData = [
    {
      ratio: 1,
      pending: 1,
    },
  ]
  return (
    <div>
      <ComposedChart
        width={1000}
        height={500}
        data={barData}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 20,
        }}
      >
        {/* <CartesianGrid stroke='#f5f5f5' /> */}
        <XAxis dataKey="ratio" label={{ value: 'Swap Ratio', position: 'insideBottom', offset: -10 }} />
        <YAxis label={{ value: 'The Number of Orders', position: 'insideLeftBottom', angle: -90 }} />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="pending" barSize={5} fill="#41ae70" />
        {/* <Bar dataKey='pendingSell' barSize={5} fill= '#ff0000' /> */}
      </ComposedChart>
    </div>
  )
}

export default ChartView

/*
	const dummyData = [
		{
			ratio: '50',
			pending: 20,
		},
		{
			ratio: '60',
			pending: 22,
		},
		{
			ratio: '70',
			pending: 24,
		},
		{
			ratio: '80',
			pending: 26,
		},
		{
			ratio: '90',
			pending: 28,
		},
		{
			ratio: '100',
			pending: 30,
		},
		{
			ratio: '110',
			pending: 32,
		},
		{
			ratio: '120',
			pending: 34,
		},
		{
			ratio: '130',
			pending: 36,
		},
		{
			ratio: '140',
			pending: 38,
		},
		{
			ratio: '150',
			pending: 40,
		},
		{
			ratio: '160',
			pending: 42,
		},
		{
			ratio: '170',
			pending: 44,
		},
		{
			ratio: '180',
			pending: 46,
		},
		{
			ratio: '190',
			pending: 48,
		},
		{
			ratio: '200',
			pending: 50,
		},
		{
			ratio: '210',
			pending: 52,
		},
		{
			ratio: '220',
			pending: 54,
		},
		{
			ratio: '230',
			pending: 56,
		},
		{
			ratio: '240',
			pending: 58,
		},
		{
			ratio: '250',
			pending: 60,
		},
		{
			ratio: '260',
			pending: 58,
		},
		{
			ratio: '270',
			pending: 56,
		},
		{
			ratio: '280',
			pending: 54,
		},
		{
			ratio: '290',
			pending: 52,
		},
		{
			ratio: '300',
			pending: 50,
		},
		{
			ratio: '310',
			pending: 48,
		},
		{
			ratio: '320',
			pending: 46,
		},
		{
			ratio: '330',
			pending: 44,
		},
		{
			ratio: '340',
			pending: 42,
		},
		{
			ratio: '350',
			pending: 40,
		},
		{
			ratio: '360',
			pending: 38,
		},
		{
			ratio: '370',
			pending: 36,
		},
		{
			ratio: '380',
			pending: 34,
		},
		{
			ratio: '390',
			pending: 32,
		},
		{
			ratio: '400',
			pending: 30,
		},
		{
			ratio: '410',
			pending: 28,
		},
		{
			ratio: '420',
			pending: 26,
		},
		{
			ratio: '430',
			pending: 24,
		},
		{
			ratio: '440',
			pending: 22,
		},
		{
			ratio: '450',
			pending: 20,
		},
		{
			ratio: '50',
			pending: 20,
		},
		{
			ratio: '60',
			pending: 22,
		},
		{
			ratio: '70',
			pending: 24,
		},
		{
			ratio: '80',
			pending: 26,
		},
		{
			ratio: '90',
			pending: 28,
		},
		{
			ratio: '100',
			pending: 30,
		},
		{
			ratio: '110',
			pending: 32,
		},
		{
			ratio: '120',
			pending: 34,
		},
		{
			ratio: '130',
			pending: 36,
		},
		{
			ratio: '140',
			pending: 38,
		},
		{
			ratio: '150',
			pending: 40,
		},
		{
			ratio: '160',
			pending: 42,
		},
		{
			ratio: '170',
			pending: 44,
		},
		{
			ratio: '180',
			pending: 46,
		},
		{
			ratio: '190',
			pending: 48,
		},
		{
			ratio: '200',
			pending: 50,
		},
		{
			ratio: '210',
			pending: 52,
		},
		{
			ratio: '220',
			pending: 54,
		},
		{
			ratio: '230',
			pending: 56,
		},
		{
			ratio: '240',
			pending: 58,
		},
		{
			ratio: '250',
			pending: 60,
		},
		{
			ratio: '260',
			pending: 58,
		},
		{
			ratio: '270',
			pending: 56,
		},
		{
			ratio: '280',
			pending: 54,
		},
		{
			ratio: '290',
			pending: 52,
		},
		{
			ratio: '300',
			pending: 50,
		},
		{
			ratio: '310',
			pending: 48,
		},
		{
			ratio: '320',
			pending: 46,
		},
		{
			ratio: '330',
			pending: 44,
		},
		{
			ratio: '340',
			pending: 42,
		},
		{
			ratio: '350',
			pending: 40,
		},
		{
			ratio: '360',
			pending: 38,
		},
		{
			ratio: '370',
			pending: 36,
		},
		{
			ratio: '380',
			pending: 34,
		},
		{
			ratio: '390',
			pending: 32,
		},
		{
			ratio: '400',
			pending: 30,
		},
		{
			ratio: '410',
			pending: 28,
		},
		{
			ratio: '420',
			pending: 26,
		},
		{
			ratio: '430',
			pending: 24,
		},
		{
			ratio: '440',
			pending: 22,
		},
		{
			ratio: '450',
			pending: 20,
		},
	];
*/
