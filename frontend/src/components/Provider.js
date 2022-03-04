import React from 'react'
import '../css/Components.css'

import { BscLogo } from '../images/index'

function Provider() {
  return (
    <div className="provider">
      <img className="icon-chainlogo" src={BscLogo} alt="Transactions" />
      <span className="desc-txt">BSC Mainnet</span>
    </div>
  )
}

export default Provider
