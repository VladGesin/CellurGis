import React from 'react';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';

export default function FileTable({ projectFiles, project_id, getFiles }) {
  if (projectFiles.length === 0)
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
                getFiles={getFiles}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
