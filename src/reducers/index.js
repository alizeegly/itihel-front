import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import courseReducers from "./courseReducers";
import listReducers from './listReducers'

export default combineReducers({
	alert,
	auth,
	list: listReducers,
	course: courseReducers
});
