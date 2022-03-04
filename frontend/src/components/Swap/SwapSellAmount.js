import React, { useState, useEffect } from 'react'

export function SwapSellAmount(props) {
  function handleChange3(event) {
    const coin3 = event.target.value
    props.onChange(coin3)
  }

  return (
    <div className="App">
      <h4>
        Sell
        {' '}
        {props.coin1}
        :
        {'         '}
        <input id="coin3" onChange={handleChange3} />
      </h4>
    </div>
  )
}
