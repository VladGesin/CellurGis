import React, { useReducer } from 'react';
import ProjectsFilesContext from './projectFilesContaxt';
import ProjectFilesReducer from './projectFilesReducer';
import { GET_FILES, CLOSE_MODAL, DELETE_FILE, CREATE_NEW_FILE } from '../types';
import axios from 'axios';

const ProjectFilesState = (props) => {
  const initialState = {
    files: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(ProjectFilesReducer, initialState);

  const getProjectFiles = async (project) => {
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

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
      payload: [],
    });
  };

  const deleteFile = (project_id, filename) => {
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

  const uploadFile = async (formData) => {
    await axios
      .post('http://localhost:5000/apiv1/csv/newdtfile', formData, {})
      .then(() => {
        dispatch({
          type: CREATE_NEW_FILE,
          payload: true,
        });
      });
  };

  return (
    <ProjectsFilesContext.Provider
      value={{
        files: state.files,
        loading: state.loading,
        getProjectFiles,
        closeModal,
        deleteFile,
        uploadFile,
      }}
    >
      {props.children}
    </ProjectsFilesContext.Provider>
  );
};

export default ProjectFilesState;
