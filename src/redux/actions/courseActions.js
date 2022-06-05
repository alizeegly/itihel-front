import axios from "axios";
import { setAlert } from "./alertActions";
import { ADD_COURSE_SUCCESS, ADD_COURSE_FAIL } from "./types";


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