import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import {
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead, TableRow,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Box } from '@mui/system'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'short-uuid'
import { TokenContracts } from '../config/Contracts'
import { useEnableToken } from '../hooks/useEnableToken'
import { useOrderBook } from '../hooks/useOrderBook'
import { useOrderBookViewer } from '../hooks/useOrderBookViewer'
import { useWalletBalance } from '../hooks/useWalletBalance'
import {
  BnbCoinIcon,
  BtcCoinIcon,
  BusdBtcCoinIcon,
  CakeCoinIcon,
  CoinDropdownArrow,
  EthCoinIcon,
  SwitchIcon
} from '../images/index'
import {
  setFromToken,
  setFromTokenAmount,
  setFromTokenBalance,
  setToToken,
  setToTokenAmount,
  setToTokenBalance
} from '../modules/token/actions'
import { getCountFromBigNum, getUniqueListBy } from '../utils'
import './Maker.css'

export default function Maker() {
  const isMobile = useMediaQuery('(max-width:1000px)')
  return (
    <div className="maker_view">
      {!isMobile && (
        <Stack direction="row" spacing={10}>
          <Paper style={{ width: '30%', backgroundColor: 'transparent' }}>
            <OrderArea />
          </Paper>
          <Paper style={{ width: '70%', backgroundColor: 'transparent' }}>
            <Stack direction="column" spacing={3}>
              <ChartArea />
              <MakerTable />
            </Stack>
          </Paper>
        </Stack>
      )}
      {isMobile && (
        <Stack direction="column" spacing={10}>
          <Paper style={{ backgroundColor: 'transparent' }}>
            <OrderArea />
          </Paper>
          <Paper style={{ backgroundColor: 'transparent' }}>
            <ChartArea />
          </Paper>
          <Paper style={{ backgroundColor: 'transparent' }}>
            <MakerTable />
          </Paper>
        </Stack>
      )}
    </div>
  )
}

const CoinIconMap = {
  BTC: BtcCoinIcon,
  '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c': BtcCoinIcon,
  ETH: EthCoinIcon,
  '0x2170ed0880ac9a755fd29b2688956bd959f933f8': EthCoinIcon,
  BNB: BnbCoinIcon,
  '0x0000000000000000000000000000000000000000': BnbCoinIcon,
  BUSD: BusdBtcCoinIcon,
  '0xe9e7cea3dedca5984780bafc599bd69add087d56': BusdBtcCoinIcon,
  CAKE: CakeCoinIcon,
  '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82': CakeCoinIcon,
}

function OrderArea() {
  const fromToken = useSelector((state) => state.token.fromToken)
  const fromTokenAmount = useSelector((state) => state.token.fromTokenAmount)
  const toToken = useSelector((state) => state.token.toToken)
  const toTokenAmount = useSelector((state) => state.token.toTokenAmount)
  const [isFromTokenEnabled, setFromTokenEnabled] = useState(false)
  const [isToTokenEnabled, setToTokenEnabled] = useState(false)
	
  const fromTokenBalance = useSelector((state) => state.token.fromTokenBalance)
  const toTokenBalance = useSelector((state) => state.token.toTokenBalance)
	
  const { makeOrder } = useOrderBook()
  const { enableToken, checkEnabled } = useEnableToken()
  const { account } = useWeb3React()

  const onClickProceed = useCallback(async() => {
    const res = await makeOrder(fromToken, toToken, fromTokenAmount, toTokenAmount)
    if(!res) {
      console.log('error')
    }
  },[fromToken, fromTokenAmount, toToken, toTokenAmount, makeOrder])
  const dispatch = useDispatch()
  const onChangeFromTokenAmount = useCallback((e) => {
    const value = e.target.value
    const decimalLength = value?.split('.')[1]?.length
    if(decimalLength > 18){
		  return
    }
    dispatch(setFromTokenAmount(value))
	  },[dispatch])
  const onChangeToTokenAmount = useCallback((e) => {
    const value = e.target.value
    const decimalLength = value?.split('.')[1]?.length
    if(decimalLength > 18){
      return
    }
    dispatch(setToTokenAmount(value))
  },[dispatch])
	

  const enableTokenHook = useCallback(async (tokenName, side) => {
    const res = await enableToken(tokenName,'ORDER_BOOK')
    if(side === 'FROM') {
      setFromTokenEnabled(res)
    } else {
      setToTokenEnabled(res)
    }
  },[enableToken, setFromTokenEnabled, setToTokenEnabled])

  const checkEnabledHook = useCallback(async () => {
    const isEnableFromToken = await checkEnabled(fromToken, 'ORDER_BOOK')
    console.log('@@ fromtoken ', fromToken, 'enabled ', isEnableFromToken)
    setFromTokenEnabled(isEnableFromToken)
    const isEnableToToken = await checkEnabled(toToken, 'ORDER_BOOK')
    console.log('@@ totoken ', toToken, 'enabled', isEnableToToken)
    setToTokenEnabled(isEnableToToken)
  },[checkEnabled, setFromTokenEnabled,setToTokenEnabled, fromToken, toToken])
	
  useEffect(() => {
    checkEnabledHook()
  },[fromToken, toToken, account,isFromTokenEnabled, isToTokenEnabled])
  return (
    <Stack 
      direction="column" 
      className='order_area_root'
      style={{
        borderRadius: '0.5rem',
        paddingLeft:'2rem',
        paddingRight:'2rem',
        backgroundColor:'#393C44'
      }}>
      <Box
        className="order_area_con" 
        sx={{ 
          marginTop:'2rem',
          marginBottom:'2rem', 
          backgroundColor:'transparent', 
          border: 'none'
        }}>
        <Stack direction="row" justifyContent="space-between">
          <span className="order_txt">You pay</span>
          <span className="order_txt">Balance 55</span>
        </Stack>
      </Box>
			
      <Paper 
        className="order_area_con" 
        sx={{
          borderRadius: '0.5rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          paddingRight: '0.5rem',
          paddingLeft: '0.5rem', 
          marginBottom:'2rem',
          backgroundColor:'#585858'
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <span className='order_txt'>{fromToken}</span>	
          <span className='order_txt'>{fromTokenBalance}</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <DropDownMenu route='from'>
					   <img style={{ height:'2rem' }} src={CoinIconMap[fromToken]} alt='from coin'/>
					   <span className='coin_txt'>&nbsp;{fromToken}</span>
					   &nbsp;<img style={{ height:'0.5rem' }} src={CoinDropdownArrow} alt='coin drop down'/>
          </DropDownMenu>
          {!isFromTokenEnabled && <Box sx={{ marginBottom:'2rem', backgroundColor:'transparent', width:'8rem' }}>
            <Button 
              className="enable_button" 
              onClick={() => enableTokenHook(fromToken)}>Enable Token
            </Button>
          </Box>}
          {isFromTokenEnabled && <InputBase
            sx={{ color: 'white' }}
            className="amount_txt" 
            value={fromTokenAmount}
            placeholder="0.0"
            onChange={(e) => onChangeFromTokenAmount(e)}
          />}
        </Stack>
      </Paper>
			
      <Box sx={{
        marginBottom:'2rem', backgroundColor:'transparent', border: 0, outline: 0,
        justifyContent:'center'
      }}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <img src={SwitchIcon} alt='switch icon'/>
        </Stack>
      </Box>

      <Paper
        className="order_area_con" 
        sx={{ 
          borderRadius: '0.5rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          paddingRight: '0.5rem',
          paddingLeft: '0.5rem',
          marginBottom:'2rem',
          backgroundColor:'#585858',
        }}
      >
        <Stack direction="row" justifyContent="flex-start" style={{ marginBottom:'1rem' }}>
          <span className='order_txt'>You receive</span>	
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <span className='order_txt'>{toToken} Token</span>	
          <span className='order_txt'>{toTokenBalance}</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <DropDownMenu route='to'>
            <img style={{ height:'2rem' }} src={CoinIconMap[toToken]} alt='to coin'/>
					   	<span className='coin_txt'>&nbsp;{toToken}</span>
						&nbsp;<img style={{ height:'0.5rem' }} src={CoinDropdownArrow} alt='coin dropdown'/>
          </DropDownMenu>
          {!isToTokenEnabled && <Box sx={{ marginBottom:'2rem', backgroundColor:'transparent', width:'8rem' }}>
            <Button 
              className="enable_button" 
              onClick={() => enableTokenHook(toToken)}>Enable Token
            </Button>
          </Box>}
          {isToTokenEnabled && <InputBase
            sx={{ color: 'white' }}
            className="amount_txt" 
            value={toTokenAmount}
            placeholder="0.0"
            onChange={(e) => onChangeToTokenAmount(e)}
          />}
        </Stack>
      </Paper>


      <Box sx={{ marginBottom:'2rem', backgroundColor:'transparent' }}>
        <Stack direction="row" justifyContent="space-between">
          <span className='order_txt'>1 WBNB cost</span>
          <span className='order_txt'>0.0231561 OBCO</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <span className='order_txt'>1 OBCO cost</span>
          <span className='order_txt'>0.0231561 WBNB</span>
        </Stack>
      </Box>
			
      <Divider style={{ backgroundColor:'gray',marginTop:'1rem', marginBottom:'3rem' }}/>

      <Box sx={{ marginBottom:'2rem', backgroundColor:'transparent' }}>
        <Stack direction="row" justifyContent="flex-start">
          <span className='order_txt'>{fromToken} to {toToken}</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <span className='order_txt'>Fee(Taker)</span>
          <span className='order_txt'>0.1231</span>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <span className='order_txt'>Total</span>
          <span className='order_txt'>123123.31</span>
        </Stack>
      </Box>

      <Box sx={{ backgroundColor:'transparent',marginBottom:'2rem' }}>		
        <Button 
          className={(isFromTokenEnabled && isToTokenEnabled) ? 'proceed_button': 'not_able'}
          onClick={(isFromTokenEnabled && isToTokenEnabled) ? onClickProceed : undefined}>Proceed
        </Button>
      </Box>
		
    </Stack>
  )
}


function MakerTable() {
  const { cancelOrder } = useOrderBook()
  const { getOrdersOfMaker } = useOrderBookViewer()
  const { account } = useWeb3React()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(5)
  const [orders, setOrders]= useState([])
  
  const fetchOrdersOfMaker = useCallback(async() => {
    const res = await getOrdersOfMaker(offset, limit)
    const orders = getUniqueListBy(res.orders, 'id')
    setOrders(orders)
  }, [offset, limit, getOrdersOfMaker])

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

  useEffect(() => {
    fetchOrdersOfMaker()
  }, [account, offset, limit])

  const onClickCancelOrder = useCallback(async(oid) => {
    const res = await cancelOrder(oid)
    console.log('@@ cancel res ', res)
  },[])
  
  return (
    <TableContainer component={Paper} sx={{ backgroundColor:'transparent'}}>
      <Table sx={{ minWidth: 650, maxHeight:300 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>{/* cell 1 */}
              <Typography color={'white'}>Swap</Typography>
            </TableCell>
            <TableCell>{/* cell 2 */}
              <Typography color={'white'}>From Token</Typography>
            </TableCell>
            <TableCell>{/* cell 3 */}
              <Typography color={'white'}>Total(Ratio)</Typography>
            </TableCell>
            <TableCell>{/* cell 4 */}
              <Typography color={'white'}>To Token</Typography>
            </TableCell>
            <TableCell>{/* cell 5 */}
              <Typography color={'white'}>Reward BNB</Typography>
            </TableCell>
            <TableCell>{/* cell 6 */}
              <Typography color={'white'}>Time</Typography>
            </TableCell>
            <TableCell>{/* cell 7 */}
              <Typography color={'white'}>Status</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={uuid.generate()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                <Typography color={'white'}>Swap {TokenContracts[order.fromToken.toLowerCase()]} to {TokenContracts[order.toToken.toLowerCase()]}</Typography>
              </TableCell>
              <TableCell>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <Typography color={'white'}>{getCountFromBigNum(order.fromAmount, 18)}</Typography>
                  <img src={CoinIconMap[order.fromToken.toLowerCase()]} style={{ height: '1rem', width: '1rem' }} alt='from coin'/>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography color={'white'}>{`${1 + TokenContracts[order.toToken.toLowerCase()]  } = ${ (new BigNumber(order.fromAmount).div(new BigNumber(order.toAmount))) }${TokenContracts[order.fromToken.toLowerCase()]}`}</Typography>
              </TableCell>
              <TableCell>
                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                  <Typography color={'white'}>{getCountFromBigNum(order.toAmount, 18)}</Typography>
                  <img src={CoinIconMap[order.toToken.toLowerCase()]} style={{ height: '1rem', width: '1rem' }} alt='to coin'/>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography color={'white'}>{order.rewardBnb}</Typography>
              </TableCell>
              <TableCell>
                <Typography color={'white'}>
                  {new Date(Number(order.orderedAt) * 1000).toLocaleDateString()} &nbsp; {new Date(Number(order.orderedAt) * 1000).toLocaleTimeString()}
                </Typography>
              </TableCell>
              <TableCell>
                <Button
                  sx={{
                    textTransform:'none',
                    backgroundColor:'#222832'
                  }}
                  variant='contained'
                  onClick={() => {
                    console.log(order.id)
                    onClickCancelOrder(order.id)
                  }}
                >
									Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} style={{position:'absolute', right:'20%', borderBottom:'none'}}>
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
  )
}


function ChartArea() {
  return <h2>chart area</h2>
}

function DropDownMenu({ children, route }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  
  const handleToggle = () => {
	  setOpen((prevOpen) => !prevOpen)
  }
  
  const handleClose = useCallback(() => {
    setOpen(false)
  },[])
  const { getBalance } = useWalletBalance()
  const dispatch = useDispatch()
  const setTokeName = useCallback(async(e) => {
    if(route === 'from') {
      dispatch(setFromToken(e.currentTarget.dataset.value))	
      const balance = await getBalance(e.currentTarget.dataset.value)
      dispatch(setFromTokenBalance(balance))
    }else {
      dispatch(setToToken(e.currentTarget.dataset.value))	
      const balance = await getBalance(e.currentTarget.dataset.value)
      dispatch(setToTokenBalance(balance))
    }
	  handleClose()
  },[getBalance])
  
  function handleListKeyDown(event) {
	  if (event.key === 'Tab') {
      event.preventDefault()
      handleClose()
	  } else if (event.key === 'Escape') {
      handleClose()
	  }
  }
  
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
	  if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
	  }
  
	  prevOpen.current = open
  }, [open])
  
  return (
	  <Stack direction="row" spacing={2}>
      <div>
		  <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
		  >
		  {children}
		  </Button>
		  <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
		  >
          {({ TransitionProps, placement }) => (
			  <Grow
              {...TransitionProps}
              style={{
				  transformOrigin:
					placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
			  >
              <Paper sx={{ backgroundColor:'#24262F' }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
					  autoFocusItem={open}
					  id="composition-menu"
					  aria-labelledby="composition-button"
					  onKeyDown={handleListKeyDown}
                  >
                    {['CAKE', 'BNB', 'BUSD', 'BTC', 'ETH'].map((val) => {
                      return (
                        <MenuItem key={val} data-value={val} onClick={setTokeName}>
                          <img style={{ height:'1rem' }} src={CoinIconMap[val]} alt='coin'/>
                          <span className='order_txt'>{val}</span>
                        </MenuItem>
                      )
                    })}
                  </MenuList>
				  </ClickAwayListener>
              </Paper>
			  </Grow>
          )}
		  </Popper>
      </div>
	  </Stack>
  )
}
