import React, { useState, useEffect } from 'react'

export function SwapFee(props) {
  function handleChange5(event) {
    const coin5 = event.target.value
    props.onChange(coin5)
  }

  return (
    <div className="App">
      <h4>
        Taker fee:
        {' '}
        <input id="coin5" onChange={handleChange5} />
      </h4>
    </div>
  )
}
