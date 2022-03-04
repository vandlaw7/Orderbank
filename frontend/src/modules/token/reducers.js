import { createReducer } from '@reduxjs/toolkit'
import {
  setFromToken,
  setFromTokenAmount,
  setToToken,
  setToTokenAmount,
  setFromTokenBalance,
  setToTokenBalance,
} from './actions'

const initialState = {
  fromToken: 'BTC', // BTC, ETH, BNB, CAKE, BUSD
  toToken: 'ETH',
  fromTokenAmount: '0',
  toTokenAmount: '0',
  fromTokenBalance: '0.0',
  toTokenBalance: '0.0',
}

const token = createReducer(initialState, (builder) => builder
  .addCase(
    setFromToken,
    (state, action) => ({
      ...state,
      fromToken: action.payload,
    }),
  )
  .addCase(
    setToToken,
    (state, action) => ({
      ...state,
      toToken: action.payload,
    }),
  )
  .addCase(
    setFromTokenAmount,
    (state, action) => ({
      ...state,
      fromTokenAmount: action.payload,
    }),
  )
  .addCase(
    setToTokenAmount,
    (state, action) => ({
      ...state,
      toTokenAmount: action.payload,
    }),
  )
  .addCase(
    setFromTokenBalance,
    (state, action) => ({
      ...state,
      fromTokenBalance: action.payload,
    }),
  )
  .addCase(
    setToTokenBalance,
    (state, action) => ({
      ...state,
      toTokenBalance: action.payload,
    }),
  ))
export default token
