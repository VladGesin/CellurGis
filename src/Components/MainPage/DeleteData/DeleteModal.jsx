import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../Utiles/api';

export default function DeletetModal({
  project_id,
  resetDeleteID,
  filename,
  url,
  header,
}) {
  // const [show, setShow] = useState(false);

  // useEffect(() => {
  //   setShow(true);
  // }, [filename, project_id]);

  const deleteProject = () => {
    api
      .delete(`${url}`, {
        project_id: project_id,
        filename: filename,
      })
      .then(() => resetDeleteID(null));
  };

  return (
    <div>
      <Modal show={true} onHide={() => resetDeleteID(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you sure you want to delete this project</Modal.Body>
        <Modal.Footer className="d-block">
          <Button variant="primary" onClick={() => resetDeleteID(null)}>
            No
          </Button>
          <Button variant="danger" onClick={deleteProject}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
