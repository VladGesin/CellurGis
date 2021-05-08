import React from "react";
import Table from "react-bootstrap/Table";
import TableRow from "./TableRow";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const FileTable = ({ projectFiles: { files, loading } }) => {
  if (loading) {
    return (
      <div className="d-flex h-100">
        <Spinner animation="border" className="mx-auto" />
      </div>
    );
  }

  if (files.length === 0)
    return <h2>No files in the database related to the project</h2>;

  return (
    <div>
      <h2>Files Table</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>Site Id's</th>
            <th>Points count</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => {
            return (
              <TableRow
                filename={file.file_name}
                index={index}
                key={file.file_name}
                project_id={file.project_id}
                sites={file.data.fileSites}
                countPoints={file.data.fileCount.count}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

FileTable.prototype = {
  projectFiles: PropTypes.object.isRequired,
};

const projectFilesToProps = (state) => ({
  projectFiles: state.projectFiles,
});

export default connect(projectFilesToProps)(FileTable);
