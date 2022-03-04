import * as React from 'react'
import Box from '@mui/material/Box'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import NotificationsIcon from '@mui/icons-material/Notifications'

import '../css/Components.css'

const data = [
  {
    icon: <div className="content-idx completed" />, label: 'Completed', sub: '2 Transactions', color: '#6DD400',
  },
  {
    icon: <div className="content-idx waiting" />, label: 'Waiting', sub: '3 Transactions', color: '#F03737',
  },
]

const TxList = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
})

export default function TransactionList({ open, handleOpen }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(15, 36, 67)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ borderRadius: '8px' }}>
          <TxList component="nav" disablePadding>
            <Box
              sx={{
                bgcolor: open ? 'rgba(15, 36, 67, 0.2)' : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={handleOpen}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                }}
              >
                <NotificationsIcon
                  sx={{
                    mr: '10px',
                  }}
                />
                <ListItemText
                  primary="Transaction"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    mr: '20px',
                  }}
                  sx={{ my: '0px' }}
                />
                <ListItemText
                  primary="Mark as Read"
                  primaryTypographyProps={{
                    width: 100,
                    fontSize: 16,
                    fontWeight: 'light',
                  }}
                  sx={{ my: '0px', fontFamily:'Helvetica' }}
                />
                {/* <KeyboardArrowDown
                  sx={{
                    opacity: 0,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.5s',
                  }}
                /> */}
              </ListItemButton>
              {open
                && data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 0, minHeight: 42, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ color: item.color, fontSize: 16, fontWeight: 'bold' }}
                      secondary={item.sub}
                      secondaryTypographyProps={{ fontSize: 12, fontWeight: 'regular' }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </TxList>
        </Paper>
      </ThemeProvider>
    </Box>
  )
}
