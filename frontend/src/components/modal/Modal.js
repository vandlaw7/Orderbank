import React, { useState } from 'react'
// import { Button } from 'react-bootstrap';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import './modal.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
function ModalText(props) {
  return <p style={{ textAlign: 'center' }}>{props.children}</p>
}

function ModalHeader(props) {
  return <h4 style={{ textAlign: 'center' }}>{props.children}</h4>
}

function ModalButton(props) {
  return (
    <Button variant="primary" size="lg" onClick={props.onClick}>
      confirm
    </Button>
  )
}

// export const OrderConfirmModal = (props) => {
// 	return (
// 		<Modal show={props.show} onHide={props.onHide} centered keyboard={false}>
// 			<ModalHeader text={props.header} closeButton />
// 			<Modal.Body style={{}}>
// 				<ModalText>{props.text}</ModalText>
// 			</Modal.Body>
// 			{/* <Modal.Footer>
// 				<ModalButton onClick={props.onHide} />
// 			</Modal.Footer> */}
// 		</Modal>
// 	);
// };

// export const OrderWaitingModal = (props) => {
// 	return (
// 		<Modal show={props.show} onHide={props.onHide} centered keyboard={false}>
// 			<ModalHeader text={props.header} closeButton />
// 			<Modal.Body style={{}}>
// 				<ModalText>{props.text}</ModalText>
// 			</Modal.Body>
// 			{/* <Modal.Footer>

//       </Modal.Footer> */}
// 		</Modal>
// 	);
// };

// export const OrderSuccessModal = (props) => {
// 	return (
// 		<Modal show={props.show} onHide={props.onHide} centered keyboard={false}>
// 			<ModalHeader text={props.header} closeButton />
// 			<Modal.Body style={{}}>
// 				<ModalText>{props.text}</ModalText>
// 			</Modal.Body>
// 			{/* <Modal.Footer>

//       </Modal.Footer> */}
// 		</Modal>
// 	);
// };

export function ConfirmSwapModal(props) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Swap
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Confrim Swap Modal
        </Typography>
      </Box>
    </Modal>
  )
}
