import { createReducer } from '@reduxjs/toolkit'
import { setWalletAddr, connectWallet } from './actions'

const initialState = {
  ADDR: null,
  connectWallet: false,
}

const wallet = createReducer(initialState, (builder) => builder
  .addCase(
    setWalletAddr,
    (state, action) => ({
      ...state,
      ADDR: action.payload,
    }),
  )
  .addCase(
    connectWallet,
    (state, action) => ({
      ...state,
      connectWallet: action.payload,
    }),
  ))
export default wallet
