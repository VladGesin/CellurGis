import {
  GET_PROJECTS,
  DELETE_PROJECT,
  OPEN_PROJECT_MODAL,
  CLOSE_PROJECT_MODAL,
  CREATE_NEW_PROJECT,
} from '../types';

const projectReducer = (state, action) => {
  switch (action.type) {
    default:
      return {
        state,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.project_id !== action.payload
        ),
      };
    case OPEN_PROJECT_MODAL:
      return {
        ...state,
        openModalId: action.payload,
      };
    case CLOSE_PROJECT_MODAL:
      return {
        ...state,
        openModalId: null,
      };
    case CREATE_NEW_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
  }
};

export default projectReducer;
