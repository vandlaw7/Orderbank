import React from 'react'
import '../css/Components.css'
import Provider from './Provider'
import TransactionList from './TransactionList'
import WalletInfo from './WalletInfo'

function ButtonConnected() {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className="button-connected">
      <div style={{ marginTop: open ? 142 : 0, marginRight: 15 }}>
        <TransactionList open={open} handleOpen={handleOpen} />
      </div>
      <Provider />
      <WalletInfo />
    </div>
  )
}

export default ButtonConnected
