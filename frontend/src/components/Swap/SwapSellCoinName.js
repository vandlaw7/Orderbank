import React from 'react'
import { tokenName } from '../../constant/tokenName'

export function SwapSellCoinName(props) {
  function handleChange1(event) {
    const coin1 = event.target.value
    props.onChange(coin1)
  }

  return (
    <div>
      <h4>
        <select id="coin1" onChange={handleChange1}>

          <option value="BNB">
            {tokenName[0]}
          </option>

          <option value="CAKE">
            {tokenName[1]}
          </option>

          <option value="BUSD">
            {tokenName[2]}
          </option>

          <option value="BTCB">
            {tokenName[3]}
          </option>

          <option value="WETH">
            {tokenName[4]}
          </option>

        </select>
      </h4>
    </div>
  )
}
