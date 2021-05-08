import { GET_POINTS, DELETE_POINTS, UPDATE_REF_RSRP } from "../actions/types";

const initialState = {
  filename: "",
  project_id: null,
  site: "",
  rsrpRef: -92,
  markers: [],
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        state,
      };
    case GET_POINTS:
      return {
        ...state,
        filename: action.filename,
        project_id: action.project_id,
        site: action.site,
        markers: action.markers,
      };
    case DELETE_POINTS:
      return {
        filename: "",
        project_id: null,
        site: "",
        rsrpRef: -92,
        markers: [],
      };
    case UPDATE_REF_RSRP:
      return {
        ...state,
        rsrpRef: action.rsrpRef,
      };
  }
};
