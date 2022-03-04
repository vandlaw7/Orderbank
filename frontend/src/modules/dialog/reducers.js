import { createReducer } from '@reduxjs/toolkit'
import {
  setTakerConfirmOpen,
} from './actions'

const initialState = {
  isTakerConfirmOpen: false,
}

const dialog = createReducer(initialState, (builder) => builder
  .addCase(
    setTakerConfirmOpen,
    (state, action) => ({
      ...state,
      isTakerConfirmOpen: action.payload,
    }),
  ))
export default dialog
