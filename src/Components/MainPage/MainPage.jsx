import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewProjectModal from './AddNewProject/NewProjectModal';
import ProjectCard from './ProjectCard/ProjectCard';
import api from '../Utiles/api';

const MainPage = () => {
  const [newProject, setNewProject] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const user_id = '1c9d2f2d-af8a-4be7-bf06-86295e6e3001';
  useEffect(() => {
    getProjectListFromApi();
  }, [newProject]);

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
      <Container id="main-top">
        <Row>
          <Col>
            <h1 className="align-self-center"> Project List</h1>
          </Col>
          <Col md={{ span: 'auto' }} className="align-self-center">
            <Button onClick={() => setNewProject(true)}>New Project</Button>
          </Col>
        </Row>
        <NewProjectModal
          showModal={newProject}
          NewProjectBtn={setNewProject}
          setProjectList={setProjectList}
        />
      </Container>
      <div id="project-List" className="mt-2 mx-5">
        {projectList.length > 0 &&
          projectList.map((projectItem) => {
            console.log(projectItem);
            return (
              <ProjectCard
                projectItem={projectItem}
                key={projectItem.project_id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MainPage;
