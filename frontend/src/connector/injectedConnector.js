import { InjectedConnector } from '@web3-react/injected-connector'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    56, // BSC Mainnet
    97, // BSC Testnet
  ],
})
