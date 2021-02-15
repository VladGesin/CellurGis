import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DeleteProjectModal({
  project_id,
  deleteProject,
  setDeleteProject,
}) {
  const handleClose = () => {
    setDeleteProject(false);
  };

  return (
    <div>
      <Modal show={deleteProject} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you ssure you want to delete this project</Modal.Body>
        <Modal.Footer className="d-block">
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
