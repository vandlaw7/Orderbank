import MuiTableCell from "@material-ui/core/TableCell"
import { withStyles } from '@material-ui/styles'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import { Button, IconButton, Stack, TableFooter, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import uuid from 'short-uuid'
import { TokenContracts } from '../../config/Contracts'
import { useOrderBookViewer } from '../../hooks/useOrderBookViewer'
import { GreenBox, GreyBox, RedBox, ShareIcon } from '../../images'
import { getCountFromBigNum, getUniqueListBy } from '../../utils'
import './HistoryTable.css'

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MuiTableCell)

export function HistoryTable() {
  const { getAllOrders, getOrdersOfMaker, getOrdersOfTaker } = useOrderBookViewer()
  const { account } = useWeb3React()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)
  const [orderType, setOrderType] = useState('maker')
  const [orders, setOrders]= useState([])
  
  const fetchOrdersOfTaker = useCallback(async() => {
    const res = await getOrdersOfTaker(offset, limit)
    const orders = getUniqueListBy(res?.orders || [], 'id')
    setOrders(orders)
  }, [offset, limit, getOrdersOfTaker])
  
  const fetchOrdersOfMaker = useCallback(async () => {
    const res = await getOrdersOfMaker(offset, limit)
    const orders = getUniqueListBy(res?.orders || [], 'id')
    setOrders(orders)
  },[offset, limit, getOrdersOfMaker])

  const onClickRightPage = useCallback(() => {
    if(orders.length < 3) {
      return 
    }
    console.log('@@ new page ', offset+1)
    setOffset(offset + 1)
  }, [setOffset, offset, orders])

  const onClickLeftPage = useCallback(() => {
    console.log('@@ new page ', offset-1)
    if((offset - 1) < 0) {
      setOffset(0)
    } else {
      setOffset(offset - 1)
    }
  }, [setOffset, offset])

  const onClickTaker = useCallback(() => {
    setOrderType('taker')
  },[])
  const onClickMaker = useCallback(() => {
    setOrderType('maker')
  },[])

  useEffect(() => {
    if(orderType === 'maker') {
      fetchOrdersOfMaker(offset, limit)
      return
    }
    fetchOrdersOfTaker(offset, limit)
  }, [account, offset, limit, orderType])
  
  return (
    <Box sx={{ marginRight:'5%', marginLeft:'5%', marginTop:'5%'}}>
      {!account && (
        <Paper sx={{ width: '100%', mb: 2, backgroundColor: 'transparent', position:'absolute', left:'50%', right:'50%' }}>
          <Typography color={'white'}>Wallet Disconnected</Typography>
        </Paper>
      )}
      {orders?.length > 0 && account
      && (
        <Paper sx={{ width: '100%', mb: 2, backgroundColor: 'transparent' }}>
          <Box sx={{marginBottom:'1rem'}}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'left'}>
              <Typography variant='h6' color={'white'}>Transaction History</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'left'}>
              <Button onClick={onClickMaker}>
                <Typography color={orderType === 'maker' ? 'white' : 'gray'} sx={{textTransform:'none'}}>Maker</Typography>
              </Button>
              <Button onClick={onClickTaker}>
                <Typography color={orderType === 'taker' ? 'white' : 'gray'} sx={{textTransform:'none'}}>Taker</Typography>
              </Button>
            </Stack>
          </Box>
          <TableContainer>
            <Table
              aria-label="a dense table"
              sx={{ minWidth: 1200, minHeight: 600 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell align='center'>{/* cell 1 */}
                    <Typography color={'white'}>Status</Typography>
                  </TableCell>
                  <TableCell align='center'>{/* cell 2 */}
                    <Typography color={'white'}>Time</Typography>
                  </TableCell>
                  <TableCell align='center'>{/* cell 3 */}
                    <Typography color={'white'}>From Token</Typography>
                  </TableCell>
                  <TableCell align='center'>{/* cell 4 */}
                    <Typography color={'white'}>Ratio</Typography>
                  </TableCell>
                  <TableCell align='center'>{/* cell 5 */}
                    <Typography color={'white'}>To Token</Typography>
                  </TableCell>
                  <TableCell align='center'>{/* cell 6 */}
                    <Typography color={'white'}>Tx link</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`
                  return (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={undefined}
                      key={`${uuid.generate()}-trades`}
                    >
                      <TableCell
                        className="table_font"
                        align='center'
                        id={labelId}
                      >
                        <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
                          {Number(order.status) === 2 && (
                            <>
                              <img src={GreenBox} alt='green box'/>
                              <Typography>Completed</Typography>
                            </>
                          )}
                          {Number(order.status) === 1 && (
                            <>
                              <img src={RedBox} alt='red box'/>
                              <Typography>Waiting</Typography>
                            </>
                          )}
                          {Number(order.status) === 3 && (
                            <>
                              <img src={GreyBox} alt='red box'/>
                              <Typography>Canceled</Typography>
                            </>
                          )}
                        </Stack>
                         
                      </TableCell>
                      <TableCell className="table_font" align='center'>
                        <Typography>
                          {new Date(Number(order.orderedAt) * 1000).toLocaleDateString()} &nbsp; {new Date(Number(order.orderedAt) * 1000).toLocaleTimeString()}
                        </Typography>
                      </TableCell>
                      <TableCell className="table_font" align="center">
                        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'}>
                          <Typography>{getCountFromBigNum(order.fromAmount, 18, 6)}</Typography>
                          <Typography>{TokenContracts[order.fromToken.toLowerCase()]}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell className="table_font" align="center">
                        <Typography color={'white'}>{`${1 + TokenContracts[order.toToken.toLowerCase()]  } = ${ (new BigNumber(order.fromAmount).div(new BigNumber(order.toAmount))) }${TokenContracts[order.fromToken.toLowerCase()]}`}</Typography>
                      </TableCell>
                      <TableCell className="table_font" align="center">
                        <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'center'}>
                          <Typography>{getCountFromBigNum(order.toAmount, 18, 6)}</Typography>
                          <Typography>{TokenContracts[order.toToken.toLowerCase()]}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell className="table_font" align="center">
                        <img src={ShareIcon} alt='share icon' />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6} style={{position:'absolute', right:'20%', borderBottom:'none'}}>
                    <Stack direction={'row'} spacing={3}>
                      <Box>
                        <Typography>{offset + 1} page</Typography>
                      </Box>
                      <Box>
                        <IconButton
                          onClick={onClickLeftPage}
                          sx={{backgroundColor:'white','&:hover':{ backgroundColor: 'gray'} }}>
                          <FirstPageIcon/>
                        </IconButton>
                      </Box>
                      <Box>
                        <IconButton
                          onClick={onClickRightPage}
                          sx={{backgroundColor:'white','&:hover':{ backgroundColor: 'gray'} }}>
                          <LastPageIcon/>
                        </IconButton>
                      </Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  )
}


// fee: "10000000000000000"
// fromAmount: "10000000000000000"
// fromToken: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"
// id: "1"
// maker: "0x298cfBb09aD2ea6B7646c74C11736C2325e2C10d"
// orderedAt: "1642904849"
// outAmount: "0"
// status: "3"
// taker: "0x0000000000000000000000000000000000000000"
// toAmount: "100000000000000000"
// toToken: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
// updatedAt: "1643204925"