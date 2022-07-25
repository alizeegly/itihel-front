import axios from "axios";
import { setAlert } from "./alertActions";
import {
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_LOGIN_REQUEST,
	USER_REGISTER_REQUEST,
	USER_UPDATE_REQUEST
} from "./types";
import setAuthToken from "../setAuthToken";

// // Update user
// export const updateUser = ({user}) => async (dispatch) => {
// 	try {
// 		const res = await axios.put(
// 			"http://localhost:8800/api/users/" + user._id,
// 			user
// 		);

// 		dispatch({
// 			type: UPDATE_SUCCESS,
// 			payload: res.data,
// 		});

// 		dispatch(loadUser());
// 	} catch (err) {
// 		console.log(err)
// 		dispatch(setAlert(err.message, "error"))

// 		dispatch({
// 			type: UPDATE_FAIL,
// 		});
// 	}
// }


export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
	
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
	
		const { data } = await axios.post(
			"/api/auth/login",
			{ email, password },
			config
		);
		
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
	
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch(setAlert(error.response.data.errors[0].msg, "error"))

		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
  
export const logout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
};

export const register = (formData) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });
	
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		const body = JSON.stringify({ first_name: formData.first_name, last_name: formData.last_name, pseudo: formData.pseudo, email: formData.email, password: formData.password });
		const { data } = await axios.post(
			"/api/auth/register",
			body,
			config
		);
	
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
	
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		console.log(error.response)
		dispatch(setAlert(error.response.data.errors[0].msg, "error"))

		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
			error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
};

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });
	
		const {
			userLogin: { userInfo },
		} = getState();
	
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		console.log(user)
	
		const { data } = await axios.put(`http://localhost:8800/api/users/${userInfo._id}`, user, config);
	
		dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
	
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
	
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
			error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
  };