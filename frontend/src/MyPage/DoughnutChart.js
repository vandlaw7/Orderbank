import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend, Title,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const data = {
  labels: [
    'BNBD',
    'BNBD',
    'BNBD',
    'BNBD',
  ],
  datasets: [{
    data: [125, 125, 125, 625],
    backgroundColor: [
      '#696969',
      '#6B2C17',
      '#CD6A4C',
      '#B24926',
    ],
    hoverBackgroundColor: [
      '#696969',
      '#6B2C17',
      '#CD6A4C',
      '#B24926',
    ],
  }],
}

const options = {
  elements: {
    arc: {
      borderWidth: 0,
      backgrouindColor: 'white',
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'Tokens',
      font: {
        size: 20,
        family: 'futura-pt, sans-serif',
        weight: 'bold',
      },
      color: 'white',
    },
    legend: {
      display: true,
      position: 'right',
      align: 'center',
      labels: {
        usePointStyle: true,
        color: '#FFFFFF',
      },
    },
  },
}

function DoughnutChart() {
  return (
    <div>
      <Doughnut data={data} options={options} style={{ marginRight: '100px' }} />
    </div>
  )
}
export default DoughnutChart
