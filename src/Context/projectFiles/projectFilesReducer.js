import { GET_FILES, CLOSE_MODAL, DELETE_FILE, CREATE_NEW_FILE } from '../types';

const fileReducer = (state, action) => {
  switch (action.type) {
    default:
      return {
        state,
      };
    case GET_FILES:
      return {
        files: action.payload,
        loading: false,
      };
    case CLOSE_MODAL:
      return {
        files: action.payload,
      };
    case CREATE_NEW_FILE:
      return {
        ...state,
        loading: action.payload,
      };
    case DELETE_FILE:
      return {
        ...state,
        files: state.files.filter((file) => file.file_name !== action.payload),
      };
  }
};

export default fileReducer;
