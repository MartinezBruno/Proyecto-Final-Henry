import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import profesorado from "./profesorado"

export default combineReducers({
  auth,
  message,
  profesorado,
});