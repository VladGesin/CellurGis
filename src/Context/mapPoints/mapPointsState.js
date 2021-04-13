import React, { useReducer } from 'react';
import MapPointsContext from './mapPointsContaxt';
import MapPointsReducer from './mapPointsReducer';
import { GET_POINTS, DELETE_POINTS, UPDATE_REF_RSRP } from '../types';
import axios from 'axios';

const MapPointsState = (props) => {
  const initialState = {
    filename: '',
    project_id: null,
    site: '',
    rsrpRef: -92,
    markers: [],
  };

  const [state, dispatch] = useReducer(MapPointsReducer, initialState);

  const setMapData = async (filename, project_id, site) => {
    axios
      .get(
        `http://localhost:5000/apiv2/getmappoints/${site}/${project_id}/${filename}`
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
  };

  const deleteMapData = () => {
    dispatch({
      type: DELETE_POINTS,
    });
  };

  const updateRefRsrp = (refRsrp) => {
    dispatch({
      type: UPDATE_REF_RSRP,
      rsrpRef: refRsrp,
    });
  };

  return (
    <MapPointsContext.Provider
      value={{
        filename: state.filename,
        project_id: state.project_id,
        site: state.site,
        rsrpRef: state.rsrpRef,
        markers: state.markers,
        setMapData,
        deleteMapData,
        updateRefRsrp,
      }}
    >
      {props.children}
    </MapPointsContext.Provider>
  );
};

export default MapPointsState;
