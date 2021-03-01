import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import ProjectFilesContaxt from '../../../../../Context/projectFiles/projectFilesContaxt';

export default function FileTable() {
  const projectFilesContaxt = useContext(ProjectFilesContaxt);

  if (projectFilesContaxt.files.length === 0)
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
          {projectFilesContaxt.files.map((file, index) => {
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
}
