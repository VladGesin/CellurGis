import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdDelete } from 'react-icons/md';

export default function DeletetModal({ applyBtn, header }) {
  const [show, setShow] = useState(false);

  const deleteProject = () => {
    applyBtn();
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  //Open Upload
  const handleShow = () => setShow(true);

  return (
    <>
      <Button size="sm" variant="danger" className="mr-1" onClick={handleShow}>
        <MdDelete />
      </Button>

      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you sure you want to delete this project</Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="primary" onClick={() => handleClose()}>
            No
          </Button>
          <Button variant="danger" onClick={deleteProject}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
