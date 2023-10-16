'use client'

import ModalMUI from '@mui/material/Modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/atoms/modalAtom';

const Modal = () => {
  const [showModal, setShowModal ] = useRecoilState(modalState)
  const [open, setOpen] = useState(false)

  const handleClose = () => setShowModal(false);

  return (
    <ModalMUI
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        The modal
      </>
    </ModalMUI>
  )
}

export default Modal