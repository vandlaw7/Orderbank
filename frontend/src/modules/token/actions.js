import { createAction } from '@reduxjs/toolkit'

export const setFromToken = createAction('token/setFromToken')
export const setFromTokenAmount = createAction('token/setFromTokenAmount')
export const setToToken = createAction('token/setToToken')
export const setToTokenAmount = createAction('token/setToTokenAmount')
export const setFromTokenBalance = createAction('token/setFromTokenBalance')
export const setToTokenBalance = createAction('token/setToTokenBalance')
