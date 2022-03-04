import { reduxBatch } from '@manaflair/redux-batch'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { load, save } from 'redux-localstorage-simple'
import token from './token/reducers'
import wallet from './wallet/reducers'
import takeorder from './takeorder/reducers'
import dialog from './dialog/reducers'

const PERSISTED_KEYS = ['']
const store = configureStore({
  devTools: true,
  reducer: {
    token,
    wallet,
    takeorder,
    dialog,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
    save({ states: PERSISTED_KEYS })],
  enhancers: [reduxBatch],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
// export type AppDispatch = typeof store.dispatch
// export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
