import {
  GET_PROJECTS,
  DELETE_PROJECT,
  OPEN_PROJECT_MODAL,
  CLOSE_PROJECT_MODAL,
  CREATE_NEW_PROJECT,
} from "./types";

import axios from "axios";

const user_id = "1c9d2f2d-af8a-4be7-bf06-86295e6e3001";

export const getProjectsListFromApi = () => async (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_AXIOS_IP}/apiv1/getuserprojects/${user_id}`)
    .then((res) =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      })
    );
};

export const deleteProjectFromApi = (project_id) => async (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_AXIOS_IP}/apiv1/deleteproject`, {
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

export const createNewProject = (projectName) => async (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_AXIOS_IP}/apiv1/createnewproject`, {
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

export const openProject = (project_id) => (dispatch) => {
  dispatch({
    type: OPEN_PROJECT_MODAL,
    payload: project_id,
  });
};

export const closeProject = () => (dispatch) => {
  dispatch({
    type: CLOSE_PROJECT_MODAL,
    payload: null,
  });
};
