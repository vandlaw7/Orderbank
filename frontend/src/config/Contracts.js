import OrderBook from '../abi/OrderBook.json'
import OrderBookViewer from '../abi/OrderBookViewer.json'
import Settlement from '../abi/Settlement.json'

/**
 * 토큰 주소로 토큰 이름 찾기
 */
export const TokenContracts = {
  '0x0000000000000000000000000000000000000000': 'BNB',
  '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82': 'CAKE',
  '0xe9e7cea3dedca5984780bafc599bd69add087d56': 'BUSD',
  '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c': 'BTC',
  '0x2170ed0880ac9a755fd29b2688956bd959f933f8': 'ETH',
}

export const FunctionContracts = {
  ORDER_BOOK: {
    abi: OrderBook.abi,
    address: OrderBook.address,
  },
  ORDER_BOOK_VIEW: {
    abi: OrderBookViewer.abi,
    address: OrderBookViewer.address,
  },
  SET_ORDER: {
    abi: Settlement.abi,
    address: Settlement.address,
  },
}
