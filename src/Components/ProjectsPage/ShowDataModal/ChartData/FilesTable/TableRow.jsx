import React, { useContext } from 'react';
import DeletetModal from '../../../DeleteData/DeleteModal';
import ProjectFilesContaxt from '../../../../../Context/projectFiles/projectFilesContaxt';
import SiteModal from './SiteModal';
import MapPointsState from '../../../../../Context/mapPoints/mapPointsState';

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
      <MapPointsState>
        <tr>
          <td>{index + 1}</td>
          <td>{filename}</td>
          <td>
            {sites.length > 0 &&
              sites.map((site) => {
                return (
                  <SiteModal
                    filename={filename}
                    project_id={project_id}
                    site={site}
                    key={filename + site.site_id}
                  />
                );
              })}
          </td>
          <td>{countPoints}</td>
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
      </MapPointsState>
    </>
  );
}
