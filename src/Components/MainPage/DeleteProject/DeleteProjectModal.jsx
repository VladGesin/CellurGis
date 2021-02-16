import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../Utiles/api';

export default function DeleteProjectModal({ project_id, resetDeleteID }) {
  const handleClose = () => {
    resetDeleteID(null);
  };

  const deleteProject = async () => {
    await api
      .delete('apiv1/deleteproject', { project_id: project_id })
      .then(() => resetDeleteID(null));
  };

  return (
    <div>
      <Modal show={project_id} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you ssure you want to delete this project</Modal.Body>
        <Modal.Footer className="d-block">
          <Button variant="primary" onClick={handleClose}>
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
