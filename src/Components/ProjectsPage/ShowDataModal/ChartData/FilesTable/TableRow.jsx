import React, { useContext } from 'react';
import ChartModal from '../ChartModal/ChartModal';
import DeletetModal from '../../../DeleteData/DeleteModal';
import ProjectFilesContaxt from '../../../../../Context/projectFiles/projectFilesContaxt';

export default function TableRow({
  filename,
  index,
  project_id,
  sites,
  countPoints,
}) {
  const projectFilesContaxt = useContext(ProjectFilesContaxt);
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
        <td>{countPoints}</td>
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
            applyBtn={() => {
              projectFilesContaxt.deleteFile(project_id, filename);
            }}
            btnStatus={projectFilesContaxt.loading}
            header={'File'}
          />
        </td>
      </tr>
    </>
  );
}
