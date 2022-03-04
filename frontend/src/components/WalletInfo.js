import { formatEther } from '@ethersproject/units'
import CloseIcon from '@mui/icons-material/Close'
import {
  Alert,
  Button,
  ClickAwayListener, Divider, IconButton, Paper, Popper, Snackbar, Stack, Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { injectedConnector } from '../connector/injectedConnector'
import { setupNetwork } from '../connector/setUpNetwork'
import '../css/Components.css'
import { CopyIcon, DisconnectedIcon, HistoryIcon, MetamaskImg, ShareIcon } from '../images/index'

function WalletInfo() {
  function shortenAddress(address, chars = 4) {
    return `${address.substring(0, chars + 2)}..${address.substring(42 - chars)}`
  }

  const {
    chainId, account, library, activate, deactivate, active,
  } = useWeb3React()
  const [balance, setBalance] = useState()
  const activateWallet = () => {
    if (setupNetwork()) {
      activate(injectedConnector)
    }
  }

  const deactivateWallet = () => {
    deactivate(injectedConnector)
  }

  const getBnbBalance = () => {
    library
      .getBalance(account)
      .then((balance) => {
        if (!false) {
          setBalance(balance)
        }
      })
      .catch(() => {
        if (!false) {
          setBalance(null)
        }
      })
  }
  useEffect(() => {
    if (account && library) {
      getBnbBalance()

      return () => {
        setBalance(undefined)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
  const [anchorEl, setAnchorEl] = React.useState(null)
  const openAccountDetail = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const handleClose = React.useCallback(() => {
    setAnchorEl(null)
  }, [])
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <>
      <div className="wallet-info" onClick={openAccountDetail} aria-haspopup="true">
        <Stack direction="row" spacing={1} justifyContent={'space-between'} alignItems={'center'}>
          <img className="icon-wallet" src={MetamaskImg} alt="Metamask" />
          <span className="balance">{balance === null ? 'Error ' : balance ? `${Number(formatEther(balance)).toFixed(3)} ` : ''}</span>
          <span className="balance">BNB</span>
          <span className="wallet-address">{shortenAddress(account)}</span>
        </Stack>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <AccountDetail 
          deactivateWallet={deactivateWallet} 
          handleClose={handleClose} 
          balance={balance}
          account={account}
        />
      </Popper>
    </>
  )
}

export default WalletInfo

function AccountDetail({ deactivateWallet, handleClose, account, balance }) {
  const onClckToBscScan = useCallback(() => {
    window.open('https://bscscan.com/')
  },[])
  const onClickCopyText = useCallback(() => {
    navigator.clipboard.writeText(account)
    setOpen(true)
  },[account])

  const [open, setOpen] = useState(false)
  const handleCloseAlert = useCallback(() => {
    setOpen(false)
  },[])
  return (
    <Paper sx={{
      backgroundColor: '#171722', width: '40rem', height: '15rem', marginTop: '4rem',
    }}
    >
      <Snackbar open={open} autoHideDuration={1000} onClose={handleCloseAlert} anchorOrigin={{ vertical:'top',horizontal:'right' }}>
        <Alert severity="success" color="info">Copy to clipboard</Alert>
      </Snackbar>
      <ClickAwayListener onClickAway={handleClose}>
        <Box className='account_wrapper'>
          <Stack direction={'column'} className='account_align'>
            <IconButton
              aria-label="close"
              onClick={undefined}
              sx={{
                color: (theme) => theme.palette.grey[500],
                position:'absolute',
                right:'1rem',
                  
              }}
            >
              <CloseIcon />
            </IconButton>
            <Stack alignItems={'center'} sx={{marginTop:'0.5rem'}}>
              <Typography color={'white'} fontWeight={'bold'}>Account</Typography>
            </Stack>
            
            <Divider 
              style={{ 
                backgroundColor:'rgba(58, 63, 72, 1)',
                marginTop:'0.75rem', 
                marginBottom:'1.5rem',
                marginLeft:'1.5rem',
                marginRight:'1.5rem'
              }}
            />
            
            <Box className='balance_box'>
              <Stack className='balance_txt_wrapper' alignItems={'center'} justifyContent={'space-between'} direction={'row'}>
                <Box className='balance_area'>
                  <Stack direction={'column'}>
                    <Stack>
                      <Typography color={'#C2C2C2'}>Balance</Typography>
                    </Stack>
                    <Stack direction={'row'}>
                      <Typography color={'#C2C2C2'}>{balance ? `${Number(formatEther(balance)).toFixed(3)} ` : ''} &nbsp;</Typography>
                      <Typography color={'#C2C2C2'} fontWeight={'bold'}>BNB</Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Box className='network_area'>
                  <Stack direction={'column'}>
                    <Typography color={'#C2C2C2'}>Network</Typography>
                    <Typography color={'#C2C2C2'} fontWeight={'bold'}>Binance Smart Chain</Typography>
                  </Stack>
                </Box>
                <Box className='wallet_area'>
                  <Stack direction={'column'}>
                    <Typography color={'#C2C2C2'}>Wallet</Typography>
                    <Typography color={'#C2C2C2'} fontWeight={'bold'}>Metamask</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>

            <Box className='account_btn_area'>
              <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
                <Box className='copy_btn_area'>
                  <Button variant='text' sx={{ textDecoration:"none", textTransform:'none', backgroundColor:'transparent', '&:hover':{ backgroundColor: 'transparent' }}} onClick={onClickCopyText}>
                    <Stack direction={'row'}>
                      <img src={CopyIcon} alt='copy icon'/>
                      <Typography color={'#C2C2C2'}>&nbsp; Copy</Typography>
                    </Stack>
                  </Button>
                </Box>
                <Box className='bsc_scan_area'>
                  <Button variant='text' sx={{backgroundColor:'transparent', textTransform:'none', textDecoration:'none', '&:hover':{ backgroundColor: 'transparent'}}} onClick={onClckToBscScan}>
                    <Stack src={ShareIcon} direction={'row'}>
                      <img src={CopyIcon} alt='bsc scan icon'/>
                      <Typography color={'#C2C2C2'}>&nbsp; BSC Scan</Typography>
                    </Stack>
                  </Button>
                </Box>
                <Box className='history_btn_area'>
                  <Link to="/history" style={{ textDecoration: 'none' }}>
                    <Stack direction={'row'}>
                      <img src={HistoryIcon} alt='history icon'/>
                      <Typography color={'#C2C2C2'}>&nbsp; History</Typography>
                    </Stack>
                  </Link>
                </Box>
                <Box className='disconnect_btn_area'>
                  <Button variant='text' sx={{  textDecoration:'none',  textTransform:'none', '&:hover':{ backgroundColor: 'transparent'}  }} onClick={deactivateWallet}>
                    <Stack direction={'row'}>
                      <img src={DisconnectedIcon} alt='disconnected icon'/>
                      <Typography color={'#C2C2C2'}>&nbsp; Disconnected</Typography>
                    </Stack>
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </ClickAwayListener>
    </Paper>
  )
}
