import React from "react";
import DeletetModal from "../../../DeleteData/DeleteModal";
import SiteModal from "./SiteModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteFile } from "../../../../../Redux/actions/projectFiles";

const TableRow = ({
  filename,
  index,
  project_id,
  sites,
  countPoints,
  projectFiles: { loading },
  deleteFile,
}) => {
  return (
    <>
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
              deleteFile(project_id, filename);
            }}
            btnStatus={loading}
            header={"File"}
          />
        </td>
      </tr>
    </>
  );
};

TableRow.prototype = {
  projectFiles: PropTypes.object.isRequired,
  deleteFile: PropTypes.func.isRequired,
};

const projectFilesToProps = (state) => ({
  projectFiles: state.projectFiles,
});

export default connect(projectFilesToProps, { deleteFile })(TableRow);
