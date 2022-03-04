import {
  Box,
  Card,
  Checkbox,
  ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Slider, Stack, Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import '../../css/Components.css'
import { useWalletBalance } from '../../hooks/useWalletBalance'
import { 
  FilterIcon,
  BnbCoinIcon,
  BtcCoinIcon,
  BusdBtcCoinIcon,
  CakeCoinIcon,
  CoinDropdownArrow,
  EthCoinIcon,
  SwitchHorizontal } from '../../images/index'

export default function ModalFilter() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClose = React.useCallback(() => {
    setAnchorEl(null)
  }, [])
  const id = open ? 'availability-popper' : undefined
  const openFilter = React.useCallback((event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }, [])

  return (
    <div>
      <Button
        className="button-filter"
        onClick={openFilter}
        sx={{
          fontSize: '14px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'futura-pt',
          color: '#F6931A',
          border: '0.8px solid #F6931A',
          padding: '14px 18px',
          width: '160px',
        }}
      >
        <span>Filter</span>
        <img src={FilterIcon} className="icon-filter" alt='filter icon'/>
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
        <Paper sx={{ backgroundColor: '#24262F', marginTop: '1rem' }}>
          <ClickAwayListener onClickAway={handleClose}>
            <Stack direction="column">
              <FilterBox />
            </Stack>
          </ClickAwayListener>
        </Paper>
      </Popper>

    </div>
  )
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
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

function FilterBox() {
  return (
    <Paper sx={{ minWidth: '20rem', minHeight:'23rem', backgroundColor:'#24262F', padding:'1rem' }}>
      <Stack direction={'column'}>
        <Stack direction={'row'} spacing={2} justifyContent={'left'} alignItems={'center'}>
          <Typography color={'white'} marginLeft={'1rem'}>Availability</Typography>
        </Stack>
        <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'left'}>
          <Checkbox {...label} />
          <Typography>Available</Typography>
        </Stack>
        <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'left'}>
          <Checkbox {...label} />
          <Typography>Unavailable</Typography>
        </Stack>
      </Stack>
      <Stack sx={{marginTop:'0.5rem', marginLeft:'1rem'}} direction={'row'}>
        <Typography>Profit</Typography>
      </Stack>
      <Stack sx={{marginTop:'0.5rem'}} direction={'row'} alignItems={'center'} justifyContent={'center'}>
        <RangeSlider/>
      </Stack>
      <Stack sx={{marginTop:'0.5rem'}} direction={'row'} alignItems={'center'} spacing={1} justifyContent={'center'}>
        <Card sx={{
          backgroundColor:'#393C44', 
          padding:'0.25rem', minWidth:'10rem',
          border: '1px solid #B0B0B0',
          boxSizing: 'border-box',
          borderRadius: '0.5rem',
        }}>
          <Stack direction={'column'}>
            <Typography sx={{ fontSize:'0.8rem'}} color={'#B0B0B0'}>Minimum</Typography>
            <Typography sx={{fontSize:'0.7rem'}} color={'white'}>100</Typography>
          </Stack>
        </Card>
        <Typography> - </Typography>
        <Card sx={{
          backgroundColor:'#393C44', 
          padding:'0.25rem', minWidth:'10rem',
          border: '1px solid #B0B0B0',
          boxSizing: 'border-box',
          borderRadius: '0.5rem',
        }}>
          <Stack direction={'column'}>
            <Typography sx={{ fontSize:'0.8rem'}} color={'#B0B0B0'}>Maximum</Typography>
            <Typography sx={{fontSize:'0.7rem'}} color={'white'}>100</Typography>
          </Stack>
        </Card>
      </Stack>
      <Stack sx={{marginTop:'1rem',marginLeft:'1rem'}} direction={'row'} alignItems={'center'} justifyContent={'left'}>
        <Typography>Swap</Typography>
      </Stack>
      <Stack sx={{marginTop:'0.5rem', marginLeft:'1rem'}} direction={'row'} alignItems={'center'} justifyContent={'left'}>
        <Typography>From token</Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={2}>
        <DropDownMenu route='from'>
					   <img style={{ height:'2rem' }} src={CoinIconMap.BTC} alt='from coin'/>
					   <span className='coin_txt'>&nbsp; BTC</span>
					   &nbsp;<img style={{ height:'0.5rem' }} src={CoinDropdownArrow} alt='coin drop down'/>
        </DropDownMenu>
        <img src={SwitchHorizontal} alt='switch icon'/>
        <DropDownMenu route='from'>
					   <img style={{ height:'2rem' }} src={CoinIconMap.BTC} alt='from coin'/>
					   <span className='coin_txt'>&nbsp; BTC</span>
					   &nbsp;<img style={{ height:'0.5rem' }} src={CoinDropdownArrow} alt='coin drop down'/>
        </DropDownMenu>
      </Stack>
      <Stack sx={{marginTop:'0.5rem', marginLeft:'1rem', marginRight:'1rem'}} direction={'row'} justifyContent={'center'} alignItems={'center'}>
        <Typography>Trades activity performing over the last 30 days.</Typography>
      </Stack>
      <Stack sx={{margin:'1rem'}} direction={'row'} justifyContent={'center'} alignItems={'center'}>
        <Button 
          className={'proceed_button'}
          onClick={undefined}>Save
        </Button>
      </Stack>
    </Paper>
  )
}

function valuetext(value) {
  return `${value}°C`
}

function RangeSlider() {
  const [value, setValue] = React.useState([0, 100])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '20rem' }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  )
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
      // dispatch(setFromToken(e.currentTarget.dataset.value))	
      // const balance = await getBalance(e.currentTarget.dataset.value)
      // dispatch(setFromTokenBalance(balance))
    }else {
      // dispatch(setToToken(e.currentTarget.dataset.value))	
      // const balance = await getBalance(e.currentTarget.dataset.value)
      // dispatch(setToTokenBalance(balance))
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
