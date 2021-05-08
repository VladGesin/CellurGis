import { combineReducers } from "redux";
import mapSitesReducer from "./mapSitesReducer";
import mapPointsReducer from "./mapPointsReducer";
import projectFilesReducer from "./projectFilesReducer";
import projectListReducer from "./projectListReducer";

export default combineReducers({
  sitesArr: mapSitesReducer,
  mapDriveTestPoints: mapPointsReducer,
  projectFiles: projectFilesReducer,
  projectList: projectListReducer,
});
