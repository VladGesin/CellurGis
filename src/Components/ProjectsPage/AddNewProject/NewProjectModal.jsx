import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ProjectsContext from '../../../Context/projects/projectsContext';

export default function NewProjectModal() {
  const [projectName, setProjectName] = useState('');
  const [showErr, setErr] = useState(false);
  const [newProjectBtn, setNewProjectBtn] = useState(false);

  const projectContext = useContext(ProjectsContext);

  const handleClose = () => {
    setErr(false);
    setNewProjectBtn(false);
  };

  const handleNewProject = async () => {
    if (projectName.length > 0) {
      setErr(false);
      projectContext.createNewProject(projectName);
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
