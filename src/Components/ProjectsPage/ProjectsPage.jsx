import React from 'react';
import Container from 'react-bootstrap/Container';
import NewProjectModal from './AddNewProject/NewProjectModal';
import ProjectList from './ProjectList/ProjectList';
import ShowDataModal from './ShowDataModal/ShowDataModal';
import './ProjectsPage.css';
import ProjectsState from '../../Context/projects/ProjectsState';
import UploadFile from './UploadFile/UploadFile';
import axios from 'axios';

const uploadDataBase = async (databaseFile) => {
  await axios.post(
    'http://localhost:5000/apiv2/csv/sitedatabase',
    databaseFile,
    {}
  );
};

const ProjectsPage = () => {
  return (
    <div>
      <ProjectsState>
        <ShowDataModal />
        <Container fluid className="d-flex">
          <div className="mr-auto p-2">
            <h1> Project List</h1>
          </div>
          <div className="p-2">
            <NewProjectModal />
          </div>
          <div className="p-2">
            <UploadFile
              header={'SIte DataBase'}
              type={'SiteDB'}
              aplyBtn={uploadDataBase}
            />
          </div>
        </Container>
        <div id="project-List" className="mt-2 mx-5">
          <ProjectList />
        </div>
      </ProjectsState>
    </div>
  );
};

export default ProjectsPage;
