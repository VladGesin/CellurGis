import { SITES_ARR_GET, SITES_ARR_LOADING, SITES_ARR_ERR } from "./types";
import axios from "axios";

export const getSitesArr = () => async (dispatch) => {
  try {
    setLoading();
    axios.get("http://localhost:5000/apiv2/sites/map").then((res) => {
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

export const setLoading = () => {
  return {
    type: SITES_ARR_LOADING,
  };
};
