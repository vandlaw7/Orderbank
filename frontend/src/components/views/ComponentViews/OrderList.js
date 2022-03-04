import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import '../../../css/Component.css'
import oval from '../../../images/Oval.png'
import greenBox from '../../../images/StatusGreen.png'
import greyBox from '../../../images/StatusGrey.png'
import { DescendIcon } from '../../../images/index'

function addOrder(oId, status, fromToken, fromAmount, toToken, toAmount, rewardBnb, time, profit = 0, txLink = '') {
  return {
    oId,
    status,
    fromToken,
    fromAmount,
    toToken,
    toAmount,
    rewardBnb,
    time,
    profit,
    txLink,
  }
}

// async function useMakerOrders() {
// 	const { chainId, account, library, activate, deactivate, active } = useWeb3React();
// 	// const signer = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
// 	// const signer = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.defibit.io/');
// 	const signer = new ethers.providers.JsonRpcProvider('http://data-seed-prebsc-1-s2.binance.org:8545/');
// 	const orderBankViewerContract = new ethers.Contract(address, abi, signer);
// 	const makerOrders = await orderBankViewerContract.makerOrders(account, 100).then((res) => {
// 		console.log(res);
// 		return res;
// 	});

// 	//

// 	//

// 	return makerOrders;
// }
export function MakerOrderList(orders) {
  // const [orderUserOrders, setOrderUserOrders] = useState([]);
  // useMakerOrders().then((res) => {
  // 	setOrderUserOrders(res);
  // });

  orders = [addOrder(0, 'Pending', 'BNB', '0.1', 'BTC', '0.1', '440', '2021-12-01', '0.1')]
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Swap </TableCell>
            <TableCell>From Token</TableCell>
            <TableCell>To Token</TableCell>
            <TableCell>Total(Ratio)</TableCell>
            <TableCell>Reward BNB</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.oId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                Swap
                {' '}
                {order.fromToken}
                {' '}
                to
                {order.toToken}
              </TableCell>
              <TableCell>
                {order.fromAmount + order.fromToken}
                <img src={oval} style={{ height: '34px', width: '34px' }} alt='oval'/>
              </TableCell>
              <TableCell>
                {order.toAmount + order.toToken}
                <img src={oval} style={{ height: '34px', width: '34px' }} alt='oval'/>
              </TableCell>
              <TableCell>{order.toAmount / order.fromAmount}</TableCell>
              <TableCell>{order.rewardBnb}</TableCell>
              <TableCell>{order.time}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => {}}>
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function TakerOrderList(orders) {
  orders = [
    addOrder(
      0,
      'Completed',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '12',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      1,
      'Complete',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '450',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      2,
      'Completed',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '460',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      3,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      4,
      'Completed',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      5,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      6,
      'Completed',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      7,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      8,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      9,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      10,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
  ]
  return (
    <TableContainer className="table-theme">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <span className="mg-r-15">Procedable</span>
              <img src={DescendIcon} alt='descend icon'/>
            </TableCell>
            <TableCell>
              <span className="mg-r-15">Profit</span>
              <img src={DescendIcon} alt='descend icon'/>
            </TableCell>
            <TableCell>From Token</TableCell>
            <TableCell>Ratio</TableCell>
            <TableCell>To Token</TableCell>
            <TableCell>Reward BNB</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Total(Ratio)</TableCell>
            <TableCell>Tx Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.oId}
              onClick={() => {
                console.log('order specific modal')
              }}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {order.status === 'Completed' ? (
                  <img src={greenBox} style={{ height: '14px', width: '14px' }} alt='green box'/>
                ) : (
                  <img src={greyBox} style={{ height: '14px', width: '14px' }} alt='grey box'/>
                )}
                {order.status}
              </TableCell>
              <TableCell>{order.time}</TableCell>
              <TableCell component="th" scope="row">
                Swap
                {' '}
                {order.fromToken}
                {' '}
                to
                {order.toToken}
              </TableCell>
              <TableCell>
                {order.fromAmount + order.fromToken}
                <img src={oval} style={{ height: '34px', width: '34px' }} alt='oval'/>
              </TableCell>
              <TableCell>
                {order.toAmount + order.toToken}
                <img src={oval} style={{ height: '34px', width: '34px' }} alt='oval'/>
              </TableCell>
              <TableCell>{order.rewardBnb}</TableCell>
              <TableCell>{order.profit}</TableCell>
              <TableCell>{order.toAmount / order.fromAmount}</TableCell>
              <TableCell onClick={() => window.open(order.txLink, '_blank')}>to tx</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function MakerHistoryList(orders) {
  orders = [
    addOrder(
      0,
      'Completed',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '12',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      1,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '450',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      2,
      'Completed',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '460',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      3,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      4,
      'Completed',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      5,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      6,
      'Completed',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      7,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      8,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      9,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
    addOrder(
      10,
      'Pending',
      'BNB',
      '0.1',
      'BTC',
      '0.1',
      '0.1',
      '2021-12-01',
      '0.1',
      'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8',
    ),
  ]
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Swap </TableCell>
            <TableCell>From Token</TableCell>
            <TableCell>To Token</TableCell>
            <TableCell>Reward BNB</TableCell>
            <TableCell>Profit</TableCell>
            <TableCell>Total(Ratio)</TableCell>
            <TableCell>Tx Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.oId}
              onClick={() => {
                console.log('order specific modal')
              }}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {order.status === 'Completed' ? (
                  <img src={greenBox} style={{ height: '14px', width: '14px' }} alt='green box'/>
                ) : (
                  <img src={greyBox} style={{ height: '14px', width: '14px' }} alt='grey box'/>
                )}
                {order.status}
              </TableCell>
              <TableCell>{order.time}</TableCell>
              <TableCell component="th" scope="row">
                Swap
                {' '}
                {order.fromToken}
                {' '}
                to
                {order.toToken}
              </TableCell>
              <TableCell>
                {order.fromAmount + order.fromToken}
                <img src={oval} style={{ height: '34px', width: '34px' }} alt='oval'/>
              </TableCell>
              <TableCell>
                {order.toAmount + order.toToken}
                <img src={oval} style={{ height: '34px', width: '34px' }} alt='oval'/>
              </TableCell>
              <TableCell>{order.rewardBnb}</TableCell>
              <TableCell>{order.profit}</TableCell>
              <TableCell>{order.toAmount / order.fromAmount}</TableCell>
              <TableCell onClick={() => window.open(order.txLink, '_blank')}>to tx</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// export const TakerHistoryList = (orders) => {
// 	orders = [
// 		addOrder(
// 			0,
// 			'Completed',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'12',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			1,
// 			'Pending',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'450',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			2,
// 			'Completed',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'460',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			3,
// 			'Pending',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'0.1',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			4,
// 			'Completed',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'0.1',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			5,
// 			'Pending',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'0.1',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			6,
// 			'Completed',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'0.1',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			7,
// 			'Pending',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'0.1',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			8,
// 			'Pending',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'0.1',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			9,
// 			'Pending',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'0.1',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 		addOrder(
// 			10,
// 			'Pending',
// 			'BNB',
// 			'0.1',
// 			'BTC',
// 			'0.1',
// 			'0.1',
// 			'2021-12-01',
// 			'0.1',
// 			'https://bscscan.com/tx/0x6d784bf47e8ad978e429032169faad62a0c568546545b76c0729fb7e14dd04e8'
// 		),
// 	];
// 	return (
// 		<TableContainer component={Paper}>
// 			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
// 				<TableHead>
// 					<TableRow>
// 						<TableCell>Status</TableCell>
// 						<TableCell>Time</TableCell>
// 						<TableCell>Swap </TableCell>
// 						<TableCell>From Token</TableCell>
// 						<TableCell>To Token</TableCell>
// 						<TableCell>Reward BNB</TableCell>
// 						<TableCell>Profit</TableCell>
// 						<TableCell>Total(Ratio)</TableCell>
// 						<TableCell>Tx Link</TableCell>
// 					</TableRow>
// 				</TableHead>
// 				<TableBody>
// 					{orders.map((order) => (
// 						<TableRow
// 							key={order.oId}
// 							onClick={() => {
// 								console.log('order specific modal');
// 							}}
// 							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
// 							<TableCell>
// 								{order.status === 'Completed' ? (
// 									<img src={greenBox} style={{ height: '14px', width: '14px' }} />
// 								) : (
// 									<img src={greyBox} style={{ height: '14px', width: '14px' }} />
// 								)}
// 								{order.status}
// 							</TableCell>
// 							<TableCell>{order.time}</TableCell>
// 							<TableCell component='th' scope='row'>
// 								Swap {order.fromToken} to {order.toToken}
// 							</TableCell>
// 							<TableCell>
// 								{order.fromAmount + order.fromToken}
// 								<img src={oval} style={{ height: '34px', width: '34px' }} />
// 							</TableCell>
// 							<TableCell>
// 								{order.toAmount + order.toToken}
// 								<img src={oval} style={{ height: '34px', width: '34px' }} />
// 							</TableCell>
// 							<TableCell>{order.rewardBnb}</TableCell>
// 							<TableCell>{order.profit}</TableCell>
// 							<TableCell>{order.toAmount / order.fromAmount}</TableCell>
// 							<TableCell onClick={() => window.open(order.txLink, '_blank')}>to tx</TableCell>
// 						</TableRow>
// 					))}
// 				</TableBody>
// 			</Table>
// 		</TableContainer>
// 	);
// };
