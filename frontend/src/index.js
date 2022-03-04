import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import App from './App'
import getLibrary from './library/web3Provider'
import store from './modules'
import './static/fonts/font.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
