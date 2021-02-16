import React from 'react';
import Table from 'react-bootstrap/Table';

export default function TableExample() {
  return (
    <div>
      <h3>CSV Table Example</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>rsrp</th>
            <th>site_id</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>31.90285728</td>
            <td>34.9194435</td>
            <td>-90.9</td>
            <td>42047</td>
          </tr>
          <tr>
            <td>2</td>
            <td>31.90285728</td>
            <td>34.9194435</td>
            <td>-89.5</td>
            <td>42047</td>
          </tr>
          <tr>
            <td>3</td>
            <td>31.90285687</td>
            <td>34.91944612</td>
            <td>-89.5</td>
            <td>42047</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
