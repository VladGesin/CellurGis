import React from "react";
import Button from "react-bootstrap/Button";
import "./ProjectCard.css";
import DeleteModal from "../DeleteData/DeleteModal";
import { BsBarChart } from "react-icons/bs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  openProject,
  deleteProjectFromApi,
} from "../../../Redux/actions/projectsList";

const ProjectCard = ({ project, openProject, deleteProjectFromApi }) => {
  return (
    <div className="d-flex project_card mr-2 mt-2">
      <div className="p-2 w-100">
        <h5 className="header">
          <strong>Project Name: </strong>
          {project.project_name}
        </h5>
        <div className="d-flex footer">
          <div className="pr-2">
            <strong>ID:</strong>
            {project.project_id}
          </div>
          <div className="pr-2">
            {project.created_on.slice(0, 10)} {project.created_on.slice(11, 19)}
          </div>
        </div>
      </div>
      <div className="d-flex ml-auto align-items-center mr-2">
        <Button
          size="sm"
          variant="primary"
          className="mr-1"
          onClick={() => openProject(project.project_id)}
        >
          <BsBarChart />
        </Button>
        <DeleteModal
          project_id={project.project_id}
          applyBtn={async () => {
            await deleteProjectFromApi(project.project_id);
          }}
          header={"project"}
        />
      </div>
    </div>
  );
};

ProjectCard.prototype = {
  openProject: PropTypes.func.isRequired,
  deleteProjectFromApi: PropTypes.func.isRequired,
};

export default connect(null, {
  openProject,
  deleteProjectFromApi,
})(ProjectCard);
