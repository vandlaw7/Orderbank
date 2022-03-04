import axios from 'axios'
import React from 'react'
import { TakerConfirmDialog } from '../components/TakerConfirmDialog/TakerConfirmDialog'
import { TakerTable } from '../components/TakerTable'
import './Taker.css'

export default function Taker() {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  // 	setTimeout(() => {
  // 		setIsLoading(false);
  // 	}, 50);
  // }, []);
  const getPath = async (fromAddress, toAddress, amountIn) => {
    const path = await axios
      .post('https://us-central1-order-bank.cloudfunctions.net/findPath/', {
        fromToken: fromAddress,
        toToken: toAddress,
        amountIn,
      })
      .then((res) => res.data)
    console.log(path)
    return path
  }

  return (
    <div className="taker-view">
      <div>
        <TakerConfirmDialog />
        <TakerTable />
      </div>
    </div>
  )
}
