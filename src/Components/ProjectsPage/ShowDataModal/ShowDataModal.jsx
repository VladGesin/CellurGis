import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import './ShowDataModal.css';
import ChartPage from './ChartData/ChartPage';
import ProjectsContext from '../../../Context/projects/projectsContext';
import ProjectFilesState from '../../../Context/projectFiles/ProjectFilesState';

export default function ShowDataModal() {
  const [classes, setClasses] = useState(' data-modal slide-in ');

  const projectContext = useContext(ProjectsContext);

  const closeDataModal = () => {
    projectContext.closeProject();
  };

  if (!projectContext.openModalId) return null;
  else {
    return (
      <div className={classes}>
        <ProjectFilesState>
          <Button
            className="d-block "
            onClick={() => {
              setClasses(' data-modal slide-out');
              setTimeout(() => {
                closeDataModal();
                setClasses(' data-modal slide-in ');
              }, 700);
            }}
          >
            Close
          </Button>
          <ChartPage className=" w-100" project={projectContext.openModalId} />
        </ProjectFilesState>
      </div>
    );
  }
}
