import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import DeletetModal from '../../../DeleteData/DeleteModal';

export default function FileTable({ projectFiles, project_id, getFiles }) {
  const [deleteFile, setDeleteFile] = useState(null);

  useEffect(() => {
    getFiles(project_id);
  }, [deleteFile]);

  if (projectFiles.length === 0)
    return <h2>No files in the database related to the project</h2>;

  return (
    <div>
      {deleteFile && (
        <DeletetModal
          project_id={project_id}
          resetDeleteID={setDeleteFile}
          filename={deleteFile}
          url={'apiv1/deletefile'}
          header={'File'}
        />
      )}
      <h2>Files Table</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>Site Id's</th>
            <th>Points count</th>
            <th>Distance from site</th>
            <th>Distance from Border</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projectFiles.map((row, index) => {
            return (
              <TableRow
                filename={row.file_name}
                index={index}
                key={row.file_name}
                project_id={project_id}
                deleteFile={setDeleteFile}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
