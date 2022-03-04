import React from 'react'
import './MyPage.css'
import DoughnutChart from './DoughnutChart'

export default function MyPage() {
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

  return (
    <div className="mypage-view">
      <div>
        <h1>My page</h1>

        <div className="overview">
          <h2>Performance Overview</h2>
          <p>How your trades activity performing over the last 30 days.</p>
          <div className="user-profit">
            <div className="balance flex-col">
              <div className="section-top">
                <h1>Total Balance</h1>
                <h2>23,234,234 BNB</h2>
                <h2>≈ $623,23.23 USD</h2>
              </div>
              <div className="section-bottom">
                <h1>Total Profit</h1>
                <h2 className="font-red">+ 23,234,234 BNB</h2>
                <h2>≈ $623,23.23 USD</h2>
                <h2 className="font-red">+ 1232.25%</h2>
              </div>
            </div>
            <div className="charts">
              <DoughnutChart />
              <DoughnutChart />
            </div>
          </div>
          <div className="taker-profit">
            <h1>Taker Profit</h1>
            <div className="balance">
              <div className="section-left">
                <h1>Total Balance</h1>
                <h2>23,234,234 BNB</h2>
                <h2>≈ $623,23.23 USD</h2>
              </div>
              <div className="section-right">
                <h1>Total Profit</h1>
                <h2 className="font-red">+ 23,234,234 BNB</h2>
                <h2>≈ $623,23.23 USD</h2>
                <h2 className="font-red">+ 1232.25%</h2>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
