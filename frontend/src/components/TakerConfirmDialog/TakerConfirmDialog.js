import { Chip } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box } from '@mui/system'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSettlement } from '../../hooks/useSettlement'
import { setTakerConfirmOpen } from '../../modules/dialog/actions'
import './TakerConfirmDialog.css'

export function TakerConfirmDialog() {
  const dispatch = useDispatch()
  const oid = useSelector((state) => state.takeorder.oid)
  const paths = useSelector((state) => state.takeorder.paths)
  const protocols = useSelector((state) => state.takeorder.protocols)
  const fromToToken = useSelector((state) => state.takeorder.fromToToken)
  const profit = useSelector((state) => state.takeorder.profit)
  const isTakerConfirmOpen = useSelector((state) => state.dialog.isTakerConfirmOpen)

  const handleClose = React.useCallback(() => {
    dispatch(setTakerConfirmOpen(false))
  }, [])

  const { takeOrder } = useSettlement()
  const takeOrderHook = React.useCallback(async () => {
    console.log('@@ params', oid, paths, protocols)
    const res = await takeOrder(oid, paths, protocols)
  }, [oid, paths, protocols, takeOrder])

  return (
    <div>
      <Dialog
        open={isTakerConfirmOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{backgroundColor:'#393C44'}}>
          <DialogTitle id="responsive-dialog-title">
            <Stack direction="row">
              <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                <Typography variant="h5" sx={{ color: 'white' }}>Confirm Take Order</Typography>
              </Box>
              <Box sx={{ marginLeft: '1rem', marginRight: '1rem' }}>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack direction="column" justifyContent="space-between">
              <Box sx={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '1rem' }}>
                <Chip label={fromToToken} />
              </Box>

              <Box sx={{ marginBottom: '1rem' }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                  <Typography color={'white'} variant='h7'>Profit: </Typography>
                  <Typography color={'white'} >{profit}</Typography>
                </Stack>
              </Box>
              <Box>
                <Button
                  className="take_order_btn"
                  onClick={takeOrderHook}
                >
                Take Order
                </Button>
              </Box>
            </Stack>
          </DialogContent>
        </Box>

      </Dialog>
    </div>
  )
}
