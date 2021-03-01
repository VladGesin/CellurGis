import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import DtTableExample from './DtTableExample';
import SiteTableExample from './SiteTableExample';
import ProjectsContext from '../../../Context/projects/projectsContext';

//Need find soluthin on duplicated file names

export default function UploadFile({ aplyBtn, type, header }) {
  const projectsContext = useContext(ProjectsContext);

  const [show, setShow] = useState(false);
  const [file, setFile] = useState({
    fileName: '',
    file: [],
  });
  const [spinner, setSpinner] = useState(false);
  const [validFile, setValidFile] = useState(true);

  //Check file Type
  useEffect(() => {
    if (file.file.type !== 'text/csv' || file.fileName.length === 0)
      setValidFile(false);
    else setValidFile(true);
  }, [file]);

  //Close Upload
  const handleClose = () => {
    if (!spinner) {
      setShow(false);
      setSpinner(false);
      setValidFile(true);
      setFile({
        fileName: '',
        file: [],
      });
    }
  };

  //Open Upload
  const handleShow = () => setShow(true);

  //Upload File
  const handleUpload = async () => {
    setSpinner(true);
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('filename', file.fileName);
    formData.append('project_id', projectsContext.openModalId);
    await aplyBtn(formData);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {header}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <Form.Group controlId="formBasicText">
              <Form.Label>
                File Name , <strong> Upload Only CSV </strong>{' '}
              </Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFile({
                    fileName: e.target.value,
                    file: file.file,
                  })
                }
                type="text"
                placeholder="File Name"
              />
              <Form.File id="formcheck-api-regular">
                <Form.File.Label>Regular file input</Form.File.Label>
                <Form.File.Input
                  isInvalid={true}
                  onChange={(e) => {
                    setFile({
                      fileName: file.fileName,
                      file: e.target.files[0],
                    });
                  }}
                />
              </Form.File>
            </Form.Group>
            {type === 'UploadDT' && <DtTableExample />}
            {type === 'SiteDB' && <SiteTableExample />}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          {!spinner && (
            <Button
              disabled={!validFile}
              variant="primary"
              onClick={handleUpload}
            >
              Upload
            </Button>
          )}
          {!spinner && (
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          )}
          {spinner && <Spinner animation="border" />}
          {spinner && <p className="text-danger"> Do Not Close Window</p>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
