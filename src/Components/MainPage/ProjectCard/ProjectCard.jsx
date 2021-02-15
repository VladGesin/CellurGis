import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './ProjectCard.css';
import DeleteProjectModal from '../DeleteProject/DeleteProjectModal';

export default function ProjectCard(props) {
  const [deleteProject, setDeleteProject] = useState(false);

  return (
    <div className="project_card">
      {deleteProject && (
        <DeleteProjectModal
          project_id={props.projectItem.project_id}
          deleteProject={deleteProject}
          setDeleteProject={setDeleteProject}
        />
      )}
      <h5>
        <strong>Project Name: </strong>
        {props.projectItem.project_name}
      </h5>
      <div>
        <strong>Project ID:</strong>
        {props.projectItem.project_id}
      </div>
      <div>
        <strong>Created On:</strong> {props.projectItem.created_on.slice(0, 10)}{' '}
        {props.projectItem.created_on.slice(11, 19)}
      </div>
      <p id="footer">
        <Button size="sm" variant="primary" className="mr-1">
          Open Charts
        </Button>
        <Button size="sm" variant="secondary" className="mr-1">
          Open Map
        </Button>
        <Button
          size="sm"
          variant="danger"
          className="mr-1"
          onClick={() => setDeleteProject(true)}
        >
          Delete
        </Button>
        <Button disabled size="sm" variant="info">
          Share
        </Button>
      </p>
    </div>
  );
}
