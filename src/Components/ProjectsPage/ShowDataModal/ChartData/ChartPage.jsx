import React, { useEffect, useState } from "react";
import UploadFile from "../../UploadFile/UploadFile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileTable from "./FilesTable/FileTable";
import ErrorModal from "../../ErrorModal/ErrorMsg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProjectFiles,
  closeModal,
  uploadFile,
} from "../../../../Redux/actions/projectFiles";

const ChartPage = ({
  projectList: { openModalId },
  getProjectFiles,
  closeModal,
  uploadFile,
}) => {
  const [errorMsg, setErrorMsg] = useState({
    msg: "",
    header: "",
    type: "",
  });
  useEffect(() => {
    getProjectFiles(openModalId);
    return () => {
      closeModal();
    };
    // eslint-disable-next-line
  }, []);

  const onApplyBtn = async (data) => {
    await uploadFile(data)
      .then(() => {
        setErrorMsg({
          msg: "DriveTest Uploud Successfully",
          header: "DriveTest Uploud",
          type: "alert-success",
        });
        getProjectFiles(openModalId);
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
          <h2>Project ID: {openModalId} Files Uploaded</h2>
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
};

ChartPage.prototype = {
  projectList: PropTypes.object.isRequired,
  getProjectFiles: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

const projectFilesToProps = (state) => ({
  projectList: state.projectList,
});

export default connect(projectFilesToProps, {
  getProjectFiles,
  closeModal,
  uploadFile,
})(ChartPage);
