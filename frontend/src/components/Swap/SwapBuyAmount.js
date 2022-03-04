import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { SwapEthers } from './SwapEthers'
import { makeOrder } from './makeOrder'
import { ConfirmSwapModal } from '../modal/Modal'

export function SwapBuyAmount(props) {
  function handleChange4(event) {
    const coin4 = event.target.value
    props.onChange(coin4)
  }

  const { account, library } = useWeb3React()

  return (
    <div className="App">
      <h4>
        Buy
        {' '}
        {props.coin2}
        :
        {'         '}
        <input id="coin4" onChange={handleChange4} />
      </h4>
      <button
        type="button"
        onClick={() => (window.confirm('Confirm Order?')
          ? makeOrder(account, library, props.coin1, props.coin2, props.coin3, props.coin4, props.coin5)
          : alert('Order Denied'))}
      >
        Make Order
      </button>
    </div>
  )
}
