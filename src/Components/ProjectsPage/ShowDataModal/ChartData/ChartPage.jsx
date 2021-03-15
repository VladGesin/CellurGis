import React, { useEffect, useContext, useState } from 'react';
import UploadFile from '../../UploadFile/UploadFile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FileTable from './FilesTable/FileTable';
import ProjectFilesContaxt from '../../../../Context/projectFiles/projectFilesContaxt';
import ProjectsContext from '../../../../Context/projects/projectsContext';
import ErrorModal from '../../ErrorModal/ErrorMsg';

export default function ChartPage({ project }) {
  const projectFilesContaxt = useContext(ProjectFilesContaxt);
  const projectsContext = useContext(ProjectsContext);
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    projectFilesContaxt.getProjectFiles(project);
    return () => {
      projectFilesContaxt.closeModal();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onApplyBtn = async (data) => {
    await projectFilesContaxt
      .uploadFile(data)
      .then(() => {
        projectFilesContaxt.getProjectFiles(projectsContext.openModalId);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorMsg(error.response.data.message);
        setTimeout(() => {
          setErrorMsg('');
        }, 3000);
        //Add Contaxt Error
      });
  };

  return (
    <Container className="mt-2" fluid>
      <ErrorModal headline={'Error Uplouding DT File'} body={errorMsg} />
      <Row>
        <Col>
          <h1>Project ID: {project} Files Uploaded</h1>
        </Col>{' '}
        <Col md={{ span: 2, offset: 2 }} className=" align-self-center ">
          <UploadFile
            aplyBtn={onApplyBtn}
            type={'UploadDT'}
            header={'Upload DT File'}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FileTable />
        </Col>
      </Row>
    </Container>
  );
}
