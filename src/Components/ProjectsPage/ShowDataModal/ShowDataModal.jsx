import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./ShowDataModal.css";
import ChartPage from "./ChartData/ChartPage";
import { BsBoxArrowLeft } from "react-icons/bs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { closeProject } from "../../../Redux/actions/projectsList";

const ShowDataModal = ({ projectList: { openModalId }, closeProject }) => {
  const [classes, setClasses] = useState(" data-modal slide-in ");

  if (!openModalId) return null;
  else {
    return (
      <div className={classes}>
        <Button
          className="d-block "
          onClick={() => {
            setClasses(" data-modal slide-out");
            setTimeout(() => {
              closeProject();
              setClasses(" data-modal slide-in ");
            }, 1000);
          }}
        >
          <div className="align-self-start">
            <BsBoxArrowLeft />
          </div>
        </Button>
        <ChartPage className=" w-100" />
      </div>
    );
  }
};

ShowDataModal.prototype = {
  projectList: PropTypes.object.isRequired,
  closeProject: PropTypes.func.isRequired,
};

const projectListToProps = (state) => ({
  projectList: state.projectList,
});

export default connect(projectListToProps, { closeProject })(ShowDataModal);
