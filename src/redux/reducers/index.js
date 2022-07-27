import { combineReducers } from "redux";
import alertReducers from "./alertReducers";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./authReducers";
import { CourseCreateReducer, courseDeleteReducer, ListReducer } from "./listReducers";
import listReducers from './listReducers'
import { GetCourseReducer, GetRolesOfUserReducer } from "./courseReducers";
import { GetFlashCardsOfCourseReducer } from "./gameReducers";

export default combineReducers({
	alert: alertReducers,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdate: userUpdateReducer,
	coursesList: ListReducer,
	// course: GetCourseReducer,
	courseCreate: CourseCreateReducer,
	courseDelete: courseDeleteReducer,
	// rolesOfUser: GetRolesOfUserReducer,
	// cards: GetFlashCardsOfCourseReducer
});
