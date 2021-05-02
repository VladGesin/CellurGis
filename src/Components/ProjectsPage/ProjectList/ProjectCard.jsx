import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import './ProjectCard.css';
import DeleteModal from '../DeleteData/DeleteModal';
import ProjectsContext from '../../../Context/projects/projectsContext';
import { BsBarChart } from 'react-icons/bs';

export default function ProjectCard({ project }) {
  const projectContext = useContext(ProjectsContext);

  const openDataModal = (project_id) => {
    projectContext.openProject(project_id);
  };

  return (
    <div className="d-flex project_card mr-2 mt-2">
      <div className="p-2 w-100">
        <h5 className="header">
          <strong>Project Name: </strong>
          {project.project_name}
        </h5>
        <div className="d-flex footer">
          <div className="pr-2">
            <strong>ID:</strong>
            {project.project_id}
          </div>
          <div className="pr-2">
            {project.created_on.slice(0, 10)} {project.created_on.slice(11, 19)}
          </div>
        </div>
      </div>
      <div className="d-flex ml-auto align-items-center mr-2">
        <Button
          size="sm"
          variant="primary"
          className="mr-1"
          onClick={() => openDataModal(project.project_id)}
        >
          <BsBarChart />
        </Button>
        <DeleteModal
          project_id={project.project_id}
          applyBtn={async () => {
            await projectContext.deleteProjectFromApi(project.project_id);
          }}
          header={'project'}
        />
      </div>
    </div>
  );
}
