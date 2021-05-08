import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProjectsListFromApi } from "../../../Redux/actions/projectsList";

const ProjectList = ({ projectList: { projects }, getProjectsListFromApi }) => {
  useEffect(() => {
    getProjectsListFromApi();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {projects.map((project) => {
        return <ProjectCard project={project} key={project.project_id} />;
      })}
    </>
  );
};

ProjectList.prototype = {
  projectList: PropTypes.object.isRequired,
  getProjectsListFromApi: PropTypes.func.isRequired,
};

const projectListToProps = (state) => ({
  projectList: state.projectList,
});

export default connect(projectListToProps, {
  getProjectsListFromApi,
})(ProjectList);
