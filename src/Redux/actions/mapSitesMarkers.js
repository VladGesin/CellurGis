import { SITES_ARR_GET, SITES_ARR_LOADING, SITES_ARR_ERR } from "./types";
import axios from "axios";

export const mapSitesMarkers = () => async (dispatch) => {
  try {
    setLoading();
    axios
      .get(`${process.env.REACT_APP_AXIOS_IP}/apiv2/sites/map`)
      .then((res) => {
        dispatch({
          type: SITES_ARR_GET,
          payload: res.data,
        });
      });
  } catch (error) {
    dispatch({
      type: SITES_ARR_ERR,
      payload: error,
    });
  }
};

export const setLoading = () => async (dispatch) => {
  return {
    type: SITES_ARR_LOADING,
  };
};
