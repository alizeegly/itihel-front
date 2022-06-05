import { combineReducers } from "redux";
import alertReducers from "./alertReducers";
import authReducers from "./authReducers";
import courseReducers from "./courseReducers";
import listReducers from './listReducers'

export default combineReducers({
	alert: alertReducers,
	auth: authReducers,
	list: listReducers,
	course: courseReducers
});
