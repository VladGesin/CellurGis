import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import './ShowDataModal.css';
import ChartPage from './ChartData/ChartPage';
import ProjectsContext from '../../../Context/projects/projectsContext';
import ProjectFilesState from '../../../Context/projectFiles/ProjectFilesState';
import { BsBoxArrowLeft } from 'react-icons/bs';

export default function ShowDataModal() {
  const [classes, setClasses] = useState(' data-modal slide-in ');

  const projectContext = useContext(ProjectsContext);

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
                projectContext.closeProject();
                setClasses(' data-modal slide-in ');
              }, 1000);
            }}
          >
            <div className="align-self-start">
              <BsBoxArrowLeft />
            </div>
          </Button>
          <ChartPage className=" w-100" project={projectContext.openModalId} />
        </ProjectFilesState>
      </div>
    );
  }
}
