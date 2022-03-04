import React from 'react'
import { tokenName } from '../../constant/tokenName'

export function SwapBuyCoinName(props) {
  function handleChange2(event) {
    const coin2 = event.target.value
    props.onChange(coin2)
  }

  return (
    <div>
      <h4>
        <select id="coin2" onChange={handleChange2}>
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
