import { combineReducers } from "redux";
import { apiReducer, apiReducerPath } from "../services/api";
import authSlice from "./features/authSlice";

export default combineReducers({
  // auth: authSlice,
  [apiReducerPath]: apiReducer,
  authSlice,
});
