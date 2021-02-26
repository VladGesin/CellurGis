import React, { useState, useEffect } from 'react';
import api from '../../../../Utiles/api';
import ChartModal from '../ChartModal/ChartModal';
import DeletetModal from '../../../DeleteData/DeleteModal';

export default function TableRow({ filename, index, project_id, getFiles }) {
  const [sites, setSites] = useState([]);
  const [countPoints, setCountPoints] = useState([]);

  useEffect(() => {
    getSites(project_id, filename);
    getCountPoints(project_id, filename);
    return () => {
      setSites([]);
      setCountPoints([]);
    };
  }, [filename, project_id]);

  const getSites = (project_id, filename) => {
    api.get(`apiv1/getfilesites/${project_id}/${filename}`).then((res) => {
      setSites(res.data);
    });
  };

  const getCountPoints = (project_id, filename) => {
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
        <td className="justify-content-centers">
          <DeletetModal
            project_id={project_id}
            refreshList={() => getFiles(project_id)}
            filename={filename}
            url={'apiv1/deletefile'}
            header={'File'}
          />
        </td>
      </tr>
    </>
  );
}
