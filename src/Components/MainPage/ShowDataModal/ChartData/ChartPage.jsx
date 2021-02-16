import React from 'react';
import UploadFile from './UploadFile/UploadFile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ChartPage({ project }) {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Project ID: {project} Files Uploaded</h1>
        </Col>{' '}
        <Col md={{ span: 1, offset: 1 }} className=" align-self-center ">
          <UploadFile project={project} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Files Table</h2>
        </Col>
      </Row>
    </Container>
  );
}
