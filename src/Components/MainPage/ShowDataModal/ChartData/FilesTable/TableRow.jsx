import React, { useState, useEffect } from 'react';
import api from '../../../../Utiles/api';
import Button from 'react-bootstrap/Button';
import ChartModal from '../ChartModal/ChartModal';

export default function TableRow({ filename, index, project_id, deleteFile }) {
  const [sites, setSites] = useState([]);
  const [countPoints, setCountPoints] = useState([]);
  useEffect(() => {
    getSites();
    getCountPoints();
  }, [filename, project_id]);

  const getSites = () => {
    api.get(`apiv1/getfilesites/${project_id}/${filename}`).then((res) => {
      setSites(res.data);
    });
  };

  const getCountPoints = () => {
    api.get(`apiv1/getcountpoints/${project_id}/${filename}`).then((res) => {
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
          {sites.length > 0 && (
            <ChartModal
              btnText={'Distance From Site'}
              project_id={project_id}
              filename={filename}
              sites={sites}
            />
          )}
        </td>
        <td>
          {sites.length > 0 && (
            <ChartModal
              btnText={'Distance From Border'}
              project_id={project_id}
              filename={filename}
              sites={sites}
            />
          )}
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
