import {
  SITES_ARR_GET,
  SITES_ARR_LOADING,
  SITES_ARR_ERR,
} from "../actions/types";

const initialState = {
  sites: [],
  loading: false,
  error: "",
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case SITES_ARR_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SITES_ARR_GET:
      return {
        ...state,
        sites: action.payload,
        loading: false,
      };
    case SITES_ARR_ERR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
