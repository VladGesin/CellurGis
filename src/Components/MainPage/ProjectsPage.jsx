import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewProjectModal from './AddNewProject/NewProjectModal';
import ProjectCard from './ProjectCard/ProjectCard';
import api from '../Utiles/api';
import DeleteModal from './DeleteData/DeleteModal';
import ShowDataModal from './ShowDataModal/ShowDataModal';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [newProject, setNewProject] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [deleteID, setdeleteID] = useState(null);
  const [dataModal, setDataModal] = useState({
    project_id: '',
    class: 'hide',
    openCharts: false,
    openMap: false,
  });
  const user_id = '1c9d2f2d-af8a-4be7-bf06-86295e6e3001';

  useEffect(() => {
    getProjectListFromApi();
  }, [newProject, deleteID]);

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
            <Button onClick={() => setNewProject(true)}>New Project</Button>
          </Col>
        </Row>
        <NewProjectModal
          showModal={newProject}
          NewProjectBtn={setNewProject}
          setProjectList={setProjectList}
        />
        {deleteID && (
          <DeleteModal
            project_id={deleteID}
            resetDeleteID={setdeleteID}
            filename={null}
            url={'apiv1/deleteproject'}
            header={'project'}
          />
        )}
      </Container>
      <div id="project-List" className="mt-2 mx-5">
        {projectList.length > 0 &&
          projectList.map((projectItem) => {
            return (
              <ProjectCard
                projectItem={projectItem}
                key={`ProjectID:${projectItem.project_id}`}
                deleteID={setdeleteID}
                setData={setDataModal}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProjectsPage;
