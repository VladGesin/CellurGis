import { GET_POINTS, DELETE_POINTS, UPDATE_REF_RSRP } from "./types";
import axios from "axios";

export const setMapData = (filename, project_id, site) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.REACT_APP_AXIOS_IP}/apiv2/getmappoints/${site}/${project_id}/${filename}`
      )
      .then((res) => {
        dispatch({
          type: GET_POINTS,
          filename: filename,
          project_id: project_id,
          site: site,
          markers: res.data,
        });
      });
  } catch (error) {
    console.log(error.massage);
  }
};

export const deleteMapData = () => (dispatch) => {
  dispatch({
    type: DELETE_POINTS,
  });
};

export const updateRefRsrp = (refRsrp) => (dispatch) => {
  dispatch({
    type: UPDATE_REF_RSRP,
    rsrpRef: refRsrp,
  });
};
