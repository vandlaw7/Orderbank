import { Button, Typography } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Stack from '@mui/material/Stack'
import { useWeb3React } from '@web3-react/core'
import {
  useCallback, useEffect, useRef, useState
} from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { injectedConnector } from '../../connector/injectedConnector'
import { setupNetwork } from '../../connector/setUpNetwork'
import { PersonDropdown, QuestionDropdown, VaultImg } from '../../images/index'
import ButtonConnected from '../ButtonConnected'
import './Header.css'

export function Header() {
  const [balance, setBalance] = useState()

  const {
    chainId, account, library, activate, deactivate, active,
  } = useWeb3React()

  const activateWallet = () => {
    if (setupNetwork()) {
      activate(injectedConnector)
    }
  }

  const deactivateWallet = () => {
    deactivate(injectedConnector)
    alert('Disconnected!')
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
          setBalance(0)
        }
      })
  }

  useEffect(() => {
    if (account && library) {
      getBnbBalance()

      // return () => {
      // 	setBalance(undefined);
      // };
    }
  }, [account, library, chainId])

  const { pathname } = useLocation()

  return (
    <div className="header">
      {console.log(pathname)}
      <div className="title">
        <Link className="logo" to="/">
          <img className="logo-image" src={VaultImg} alt="PendingSwap" />
          <span className="logo-text">OrderBank</span>
        </Link>
      </div>
      <nav className="menu">
        <ul>
          <NavLink to="/maker">
            <span className={pathname === '/maker' ? 'maker_taker_title_active' : 'maker_taker_title_none'}>Maker</span>
          </NavLink>
          <NavLink to="/taker">
            <span className={pathname === '/taker' ? 'maker_taker_title_active' : 'maker_taker_title_none'}>Taker</span>
          </NavLink>
        </ul>
      </nav>
      <div className="functions">
        <div className="buttons">
          {active ? (
            <ButtonConnected />
          ) : (
            <button className="glow-on-hover" type="button" onClick={activateWallet}>
              Connect Wallet
            </button>
          )}
        </div>
        <div className="divider" />
        <DropDownMenu icon={'question'}>
          <img src={QuestionDropdown} alt='question dropdown'/>
        </DropDownMenu>
        <DropDownMenu icon={'person'}>
          <img src={PersonDropdown} alt='person dropdown'/>
        </DropDownMenu>
      </div>
    </div>
  )
}

function DropDownMenu({ children, icon }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

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
  const { pathname } = useLocation()

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
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper sx={{ backgroundColor:'#2B2B2B', minWidth:'14rem' }}>
                <div style={{ backgroundColor:'#F6931A', height:'0.875rem', marginTop:'45px' }}/>
                <ClickAwayListener onClickAway={handleClose}>
                  <Stack direction={'column'} alignItems={'center'}>
                    <div style={{ marginTop:'1rem' }} />
                    {icon === 'question' 
                      && <Typography className={pathname === '/community' ? 'menu_font_active': 'menu_font'}>Community</Typography>
                    }
                    {icon === 'person' 
                      && <Link className={pathname === '/history' ? 'menu_font_active': 'menu_font'} to="/history">Transaction History</Link>
                    }
                    {icon === 'question' 
                      && <Typography marginTop={'0.5rem'} className={pathname === '/docs' ? 'menu_font_active': 'menu_font'}>docs</Typography>
                    }
                    {icon === 'person' 
                      && <Link className={pathname === '/mypage' ? 'menu_font_active' : 'menu_font'} to="/mypage">My Page</Link>
                    }
                    <div style={{ marginBottom:'1rem' }} />
                  </Stack>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  )
}
