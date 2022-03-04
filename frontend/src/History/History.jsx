import axios from 'axios'
import React from 'react'
import { TakerConfirmDialog } from '../components/TakerConfirmDialog/TakerConfirmDialog'
import { HistoryTable } from '../components/HistoryTable'
import './History.css'

export default function History() {
  return (
    <div className="history-view">
      <div>
        {/* <TakerConfirmDialog /> */}
        <HistoryTable />
      </div>
    </div>
  )
}
