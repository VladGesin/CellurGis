import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import api from '../../Utiles/api';

export default function NewProjectModal({ refreshList }) {
  const [projectName, setProjectName] = useState('');
  const [showErr, setErr] = useState(false);
  const [newProjectBtn, setNewProjectBtn] = useState(false);

  const user_id = '1c9d2f2d-af8a-4be7-bf06-86295e6e3001';

  const handleClose = () => {
    setErr(false);
    setNewProjectBtn(false);
  };

  const handleNewProject = async () => {
    if (projectName.length > 0) {
      setErr(false);
      await api
        .post('apiv1/createnewproject', {
          project_name: projectName,
          user_id: user_id,
        })
        .then((res) => {
          refreshList();
        });
      setNewProjectBtn(false);
      setErr(false);
      setProjectName('');
    } else {
      setErr(true);
    }
  };

  return (
    <div>
      <Button onClick={() => setNewProjectBtn(true)}>New Project</Button>

      <Modal show={newProjectBtn} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
                type="text"
                placeholder="Enter Project Name"
              />
              {showErr && <p className="text-danger"> Input Name</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-start" as="div">
          <Button variant="primary " onClick={handleNewProject}>
            Create New Project
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
