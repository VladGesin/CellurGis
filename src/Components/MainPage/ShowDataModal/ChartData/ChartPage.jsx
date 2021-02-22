import React, { useState, useEffect } from 'react';
import UploadFile from './UploadFile/UploadFile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../../../Utiles/api';
import FileTable from './FilesTable/FileTable';

export default function ChartPage({ project }) {
  const [projectFiles, setProjectFiles] = useState([]);
  useEffect(() => {
    getProjectFiles(project);

    return () => {
      setProjectFiles([]);
    };
  }, [project]);

  const getProjectFiles = (project) => {
    api.get(`apiv1/projectfilenames/${project}`).then((res) => {
      setProjectFiles(res.data);
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Project ID: {project} Files Uploaded</h1>
        </Col>{' '}
        <Col md={{ span: 2, offset: 2 }} className=" align-self-center ">
          <UploadFile project={project} getFiles={getProjectFiles} />
        </Col>
      </Row>
      <Row>
        <Col>
          <FileTable
            projectFiles={projectFiles}
            project_id={project}
            getFiles={getProjectFiles}
          />{' '}
        </Col>
      </Row>
    </Container>
  );
}
