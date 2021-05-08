import { GET_FILES, CLOSE_MODAL, DELETE_FILE, CREATE_NEW_FILE } from "./types";
import axios from "axios";

export const getProjectFiles = (project) => async (dispatch) => {
  const file_names = await axios
    .get(`http://localhost:5000/apiv1/projectfilenames/${project}`)
    .then((res) => {
      return res.data;
    });

  Promise.all(
    file_names.map(async (file) => {
      const data = await axios
        .get(
          `http://localhost:5000/apiv2/getfilesdata/${project}/${file.file_name}`
        )
        .then((res) => {
          // console.log(res.data);
          return {
            file_name: file.file_name,
            data: res.data,
            project_id: project,
          };
        });
      return data;
    })
  ).then((res) => {
    dispatch({
      type: GET_FILES,
      payload: res,
    });
  });
};

export const closeModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
    payload: [],
  });
};

export const deleteFile = (project_id, filename) => async (dispatch) => {
  axios
    .delete(`http://localhost:5000/apiv1/deletefile`, {
      data: {
        project_id: project_id,
        filename: filename,
      },
    })
    .then(() => {
      dispatch({
        type: DELETE_FILE,
        payload: filename,
      });
    });
};

export const uploadFile = (formData) => async (dispatch) => {
  await axios
    .post("http://localhost:5000/apiv1/csv/newdtfile", formData, {})
    .then(() => {
      dispatch({
        type: CREATE_NEW_FILE,
        payload: true,
      });
    });
};
