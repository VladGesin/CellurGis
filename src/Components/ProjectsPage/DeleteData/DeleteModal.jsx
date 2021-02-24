import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../Utiles/api';
import Spinner from 'react-bootstrap/Spinner';

export default function DeletetModal({
  project_id,
  resetDeleteID,
  filename,
  url,
  header,
}) {
  const [spinner, setSpinner] = useState(false);

  const deleteProject = () => {
    setSpinner(true);
    api
      .delete(`${url}`, {
        project_id: project_id,
        filename: filename,
      })
      .then(() => resetDeleteID(null));
  };

  const handleClose = () => {
    if (!spinner) resetDeleteID(null);
  };

  return (
    <div>
      <Modal show={true} onHide={() => handleClose()}>
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
    </div>
  );
}
