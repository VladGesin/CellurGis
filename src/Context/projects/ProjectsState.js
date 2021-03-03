import React, { useReducer } from 'react';
import ProjectsContext from './projectsContext';
import ProjectsReducer from './projectsReducer';
import {
  GET_PROJECTS,
  DELETE_PROJECT,
  OPEN_PROJECT_MODAL,
  CLOSE_PROJECT_MODAL,
  CREATE_NEW_PROJECT,
} from '../types';
import axios from 'axios';

const ProjectsState = (props) => {
  const user_id = '1c9d2f2d-af8a-4be7-bf06-86295e6e3001';
  const initialState = {
    projects: [],
    openModalId: null,
  };
  const [state, dispatch] = useReducer(ProjectsReducer, initialState);

  const getProjectsListFromApi = () => {
    axios
      .get(`http://localhost:5000/apiv1/getuserprojects/${user_id}`)
      .then((res) =>
        dispatch({
          type: GET_PROJECTS,
          payload: res.data,
        })
      );
  };

  const deleteProjectFromApi = (project_id) => {
    axios
      .delete(`http://localhost:5000/apiv1/deleteproject`, {
        data: {
          project_id: project_id,
        },
      })
      .then(() => {
        dispatch({
          type: DELETE_PROJECT,
          payload: project_id,
        });
      });
  };

  const createNewProject = (projectName) => {
    axios
      .post('http://localhost:5000/apiv1/createnewproject', {
        project_name: projectName,
        user_id: user_id,
      })
      .then((res) => {
        dispatch({
          type: CREATE_NEW_PROJECT,
          payload: res.data,
        });
      });
  };

  const openProject = (project_id) => {
    dispatch({
      type: OPEN_PROJECT_MODAL,
      payload: project_id,
    });
  };
  const closeProject = () => {
    dispatch({
      type: CLOSE_PROJECT_MODAL,
      payload: null,
    });
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects: state.projects,
        openModalId: state.openModalId,
        getProjectsListFromApi,
        deleteProjectFromApi,
        openProject,
        closeProject,
        createNewProject,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsState;
