import cubes from "./cubes.reducer";
import sort from "./sort.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  cubes,
  sort
});
