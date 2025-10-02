import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

function DeleteModal({header, isOpen, isLoading, close, onClick, data}) {
  return (
    <Modal centered isOpen={isOpen}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this entry?
        <ul style={{listStyle: "none"}}>
          {
            data && Object.entries(data)
            .filter(([key]) => (!key.startsWith("_")))
            .map(([key, value], index) => (<li key={index}><b>{key}:</b> {value}</li>))
          }
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' outline onClick={close} disabled={isLoading}>
          Cancel
        </Button>
        <Button color='danger' onClick={onClick} disabled={isLoading}>
          {isLoading && <Spinner size='sm' />} Permanently Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteModal