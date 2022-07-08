import { combineReducers } from "redux";
import alertReducers from "./alertReducers";
import { userLoginReducer, userRegisterReducer } from "./authReducers";
import courseReducers from "./courseReducers";
import listReducers from './listReducers'

export default combineReducers({
	alert: alertReducers,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	list: listReducers,
	course: courseReducers
});
