import React from 'react';
import Table from 'react-bootstrap/Table';

export default function SiteTableExample() {
  return (
    <div>
      <h3>CSV Table Example</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Site_name</th>
            <th>Site_id</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>BETL01</td>
            <td>12345</td>
            <td>34.9194435</td>
            <td>31.90285728</td>
          </tr>

          <tr>
            <td>2</td>
            <td>BETL02</td>
            <td>12345</td>
            <td>35.2006305</td>
            <td>31.70903056</td>
          </tr>
          <tr>
            <td>3</td>
            <td>BETL03</td>
            <td>12345</td>
            <td>34.9194435</td>
            <td>31.90285728</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
