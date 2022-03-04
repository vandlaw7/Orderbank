import { createReducer } from '@reduxjs/toolkit'
import {
  setOid,
  setProtocols,
  setPaths,
  setFromToToken,
  setProfit,
} from './actions'

const initialState = {
  oid: '', // BTC, ETH, BNB, CAKE, BUSD
  paths: [],
  protocols: [],
  fromToToken: '',
  profit: 0,
}

const takeorder = createReducer(initialState, (builder) => builder
  .addCase(
    setPaths,
    (state, action) => ({
      ...state,
      paths: action.payload,
    }),
  )
  .addCase(
    setOid,
    (state, action) => ({
      ...state,
      oid: action.payload,
    }),
  )
  .addCase(
    setProtocols,
    (state, action) => ({
      ...state,
      protocols: action.payload,
    }),
  )
  .addCase(
    setFromToToken,
    (state, action) => ({
      ...state,
      fromToToken: action.payload,
    }),
  )
  .addCase(
    setProfit,
    (state, action) => ({
      ...state,
      profit: action.payload,
    }),
  ))
export default takeorder
