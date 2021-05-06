import React, { useEffect, useContext, useState } from "react";
import UploadFile from "../../UploadFile/UploadFile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileTable from "./FilesTable/FileTable";
import ProjectFilesContaxt from "../../../../Context/projectFiles/projectFilesContaxt";
import ProjectsContext from "../../../../Context/projects/projectsContext";
import ErrorModal from "../../ErrorModal/ErrorMsg";

export default function ChartPage({ project }) {
  const projectFilesContaxt = useContext(ProjectFilesContaxt);
  const projectsContext = useContext(ProjectsContext);
  const [errorMsg, setErrorMsg] = useState({
    msg: "",
    header: "",
    type: "",
  });
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
        setErrorMsg({
          msg: "DriveTest Uploud Successfully",
          header: "DriveTest Uploud",
          type: "alert-success",
        });
        projectFilesContaxt.getProjectFiles(projectsContext.openModalId);
      })
      .catch((error) => {
        setErrorMsg({
          msg: error.response.data.message,
          header: "Error Uplouding DataBase File",
          type: "alert-danger",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setErrorMsg({ msg: "", header: "", type: "" });
        }, 3000);
      });
  };

  return (
    <Container className="mt-2" fluid>
      <Row className="d-flex">
        <Col className="">
          <h2>Project ID: {project} Files Uploaded</h2>
        </Col>
        <div className="ml-auto mr-1">
          <UploadFile
            aplyBtn={onApplyBtn}
            type={"UploadDT"}
            header={"Upload DT File"}
            className="ml-5"
          />
        </div>
      </Row>
      <Row>
        <Col>
          <FileTable />
          <ErrorModal
            headline={errorMsg.header}
            body={errorMsg.msg}
            type={errorMsg.type}
          />
        </Col>
      </Row>
    </Container>
  );
}
