import axios from "axios";
import { setAlert } from "./alertActions";
import { ADD_COURSE_SUCCESS, ADD_COURSE_FAIL, GET_COURSE_SUCCESS, GET_COURSE_FAIL, GET_COURSE_SHARED_SUCCESS, GET_COURSE_SHARED_FAIL, GET_FLIP_CARDS, GET_FLIP_CARDS_FAIL } from "./types";


export const addCourse = ( course ) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.post(
			"http://localhost:8800/api/courses",
			course,
			config
		);

		dispatch({
			type: ADD_COURSE_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
        console.log(err)
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		}

		dispatch({
			type: ADD_COURSE_FAIL,
		});
	}
};

export const getCourse = ( id ) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.get(
			"http://localhost:8800/api/courses/find/" + id,
			config
		);

		dispatch({
			type: GET_COURSE_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
        console.log(err)
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		}

		dispatch({
			type: GET_COURSE_FAIL,
		});
	}
};

export const getCourseSharedOfCourse = ( user, course ) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.get(
			"http://localhost:8800/api/courses-shared/" + user + "/" + course,
			config
		);
		
		dispatch({
			type: GET_COURSE_SHARED_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
        console.log(err)
		// const errors = err.response.data.errors;

		// if (errors) {
		// 	errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		// }

		dispatch({
			type: GET_COURSE_SHARED_FAIL,
		});
	}
};

export const getFlipCardsOfCourse = ( course ) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.get(
			"http://localhost:8800/api/flip-cards/courses/" + course,
			config
		);
		
		dispatch({
			type: GET_FLIP_CARDS,
			payload: res.data,
		});
	} catch (err) {
        console.log(err)
		// const errors = err.response.data.errors;

		// if (errors) {
		// 	errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		// }

		dispatch({
			type: GET_FLIP_CARDS_FAIL,
		});
	}
};

