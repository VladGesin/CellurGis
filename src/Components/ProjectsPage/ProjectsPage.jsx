import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewProjectModal from './AddNewProject/NewProjectModal';
import ProjectCard from './ProjectCard/ProjectCard';
import api from '../Utiles/api';
import ShowDataModal from './ShowDataModal/ShowDataModal';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [projectList, setProjectList] = useState([]);
  const [dataModal, setDataModal] = useState({
    project_id: '',
    class: 'hide',
    openCharts: false,
    openMap: false,
  });
  const user_id = '1c9d2f2d-af8a-4be7-bf06-86295e6e3001';

  useEffect(() => {
    getProjectListFromApi();
  }, []);

  const getProjectListFromApi = async () => {
    await api
      .get(`apiv1/getuserprojects/${user_id}`)
      .then((res) => setProjectList(res.data));
  };

  return (
    <div>
      <ShowDataModal openData={dataModal} />
      <Container id="main-top" fluid>
        <Row>
          <Col>
            <h1 className="align-self-center"> Project List</h1>
          </Col>
          <Col md={{ span: 'auto' }} className="align-self-center">
            <NewProjectModal refreshList={getProjectListFromApi} />
          </Col>
        </Row>
      </Container>
      <div id="project-List" className="mt-2 mx-5">
        {projectList.length > 0 &&
          projectList.map((projectItem) => {
            return (
              <ProjectCard
                projectItem={projectItem}
                key={`ProjectID:${projectItem.project_id}`}
                setData={setDataModal}
                refreshList={getProjectListFromApi}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProjectsPage;
