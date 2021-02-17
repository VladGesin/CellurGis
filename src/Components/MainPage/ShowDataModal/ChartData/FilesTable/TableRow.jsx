import React, { useState, useEffect } from 'react';
import api from '../../../../Utiles/api';
import Button from 'react-bootstrap/Button';

export default function TableRow({ filename, index, project_id, deleteFile }) {
  const [sites, setSites] = useState([]);
  const [countPoints, setCountPoints] = useState([]);
  useEffect(() => {
    getSites();
    getCountPoints();
  }, [filename, project_id]);

  const getSites = async () => {
    await api
      .get(`apiv1/getfilesites/${project_id}/${filename}`)
      .then((res) => {
        setSites(res.data);
      });
  };

  const getCountPoints = async () => {
    await api
      .get(`apiv1/getcountpoints/${project_id}/${filename}`)
      .then((res) => {
        setCountPoints(res.data);
      });
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{filename}</td>
        <td>
          {sites.map((site) => {
            return `${site.site_id} `;
          })}
        </td>
        <td>{countPoints.count}</td>
        <td>
          <Button variant="info"> Dist From Site</Button>
        </td>
        <td>
          <Button variant="info">Dist From Border</Button>
        </td>
        <td>
          <Button variant="danger" onClick={() => deleteFile(filename)}>
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
}
