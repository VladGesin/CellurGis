import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../Utiles/api';
import Spinner from 'react-bootstrap/Spinner';

export default function DeletetModal({
  project_id,
  refreshList,
  filename,
  url,
  header,
}) {
  const [spinner, setSpinner] = useState(false);
  const [show, setShow] = useState(false);

  const deleteProject = () => {
    setSpinner(true);
    api
      .delete(`${url}`, {
        project_id: project_id,
        filename: filename,
      })
      .then(() => {
        setShow(false);
        refreshList();
      });
  };

  const handleClose = () => {
    if (!spinner) setShow(false);
  };

  //Open Upload
  const handleShow = () => setShow(true);

  return (
    <>
      <Button size="sm" variant="danger" className="mr-1" onClick={handleShow}>
        Delete
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
          <Button disabled={spinner} variant="danger" onClick={deleteProject}>
            Yes
          </Button>
          {spinner && <Spinner animation="border" />}
          {spinner && <p className="text-danger"> Do Not Close Window</p>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
