import { combineReducers } from "redux";
import alertReducers from "./alertReducers";
import { userLoginReducer, userRegisterReducer } from "./authReducers";
import { CourseCreateReducer, courseDeleteReducer, ListReducer } from "./listReducers";
import courseReducers from "./courseReducers";
import listReducers from './listReducers'

export default combineReducers({
	alert: alertReducers,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	coursesList: ListReducer,
	course: courseReducers,
	courseCreate: CourseCreateReducer,
	courseDelete: courseDeleteReducer
});
