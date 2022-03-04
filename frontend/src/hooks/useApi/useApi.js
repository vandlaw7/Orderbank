import { useCallback } from 'react'

const ORDER_V1_URL = 'https://proxy-jswoo.herokuapp.com/https://us-central1-order-bank.cloudfunctions.net/pendingOrders/'
const ORDER_V2_URL = 'https://us-central1-order-bank.cloudfunctions.net/pendingOrdersV2/'
export function useApi() {
  /**
   * @param {number} offset
   * @param {number} limit
   * @param {number} minProfit
   * @param {boolean} availability
   */
  const getOrder = useCallback(async (offset, limit, minProfit, availability) => {
    try {
      console.log({
        offset,
        limit,
        filter: {
          minProfit,
          availability,
        },
      })
      const param = JSON.stringify({
        offset,
        limit,
        filter: {
          minProfit,
          availability,
        },
      })
      const result = await fetch(ORDER_V2_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: param,
      })
      const data = await result.json()
      return data
    } catch (error) {
      console.error(error)
      return []
    }
  }, [])

  return {
    getOrder,
  }
}
