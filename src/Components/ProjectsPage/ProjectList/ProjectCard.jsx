import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './ProjectCard.css';
import DeleteModal from '../DeleteData/DeleteModal';
import ProjectsContext from '../../../Context/projects/projectsContext';
import Spinner from 'react-bootstrap/Spinner';

export default function ProjectCard({ project }) {
  const projectContext = useContext(ProjectsContext);
  const [spinner, setSpinner] = useState(false);

  const openDataModal = (project_id) => {
    projectContext.openProject(project_id);
  };

  if (spinner)
    return (
      <div className="project_card">
        <Spinner className="project_card" animation="border" role="status" />
      </div>
    );
  else
    return (
      <div className="project_card">
        <h5>
          <strong>Project Name: </strong>
          {project.project_name}
        </h5>
        <div>
          <strong>Project ID:</strong>
          {project.project_id}
        </div>
        <div>
          <strong>Created On:</strong> {project.created_on.slice(0, 10)}{' '}
          {project.created_on.slice(11, 19)}
        </div>
        <p id="footer">
          <Button
            size="sm"
            variant="primary"
            className="mr-1"
            onClick={() => openDataModal(project.project_id)}
          >
            Open Charts
          </Button>
          <Button disabled size="sm" variant="secondary" className="mr-1">
            Open Map
          </Button>

          <DeleteModal
            project_id={project.project_id}
            applyBtn={() => {
              setSpinner(true);
              projectContext.deleteProjectFromApi(project.project_id);
            }}
            header={'project'}
          />
          <Button disabled size="sm" variant="info">
            Share
          </Button>
        </p>
      </div>
    );
}
