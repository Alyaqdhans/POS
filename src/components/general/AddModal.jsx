import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

function AddModal({header, children, isOpen, isLoading, close, onSubmit}) {
  return (
    <Modal centered isOpen={isOpen}>
      <form onSubmit={onSubmit}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' outline onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button color="info" type='submit' disabled={isLoading}>
            {isLoading && <Spinner size='sm' />} Save
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default AddModal