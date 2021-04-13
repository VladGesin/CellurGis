import { GET_POINTS, DELETE_POINTS, UPDATE_REF_RSRP } from '../types';

const mapPointsReducer = (state, action) => {
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
        filename: '',
        project_id: null,
        site: '',
        rsrpRef: -92,
        markers: [],
      };
    case UPDATE_REF_RSRP:
      console.log(action);
      return {
        ...state,
        rsrpRef: action.rsrpRef,
      };
  }
};

export default mapPointsReducer;
