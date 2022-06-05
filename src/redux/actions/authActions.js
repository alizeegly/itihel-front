import axios from "axios";
import { setAlert } from "./alertActions";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	UPDATE_SUCCESS,
	UPDATE_FAIL,
} from "./types";
import setAuthToken from "../setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("http://localhost:8800/api/auth/auth");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register = ({ first_name, last_name, pseudo, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ first_name, last_name, pseudo, email, password });

	try {
		const res = await axios.post(
			"http://localhost:8800/api/auth/register",
			body,
			config
		);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// Login User
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(
			"http://localhost:8800/api/auth/login",
			body,
			config
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		console.log(err)
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};

// Update user
export const updateUser = ({user}) => async (dispatch) => {
	try {
		const res = await axios.put(
			"http://localhost:8800/api/users/" + user._id,
			user
		);

		dispatch({
			type: UPDATE_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		console.log(err)
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		}

		dispatch({
			type: UPDATE_FAIL,
		});
	}
};