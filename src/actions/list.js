import axios from "axios";
import { GET_LIST } from "./types";
import { setAlert } from "./alert";

export const getCourseOfUser = ({ id }) => async (dispatch) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
    try {
        const res = await axios.get(`http://localhost:8800/api/users/628e4fc1a44c0787af339310/courses`, config)
        console.log(res)
        dispatch({
            type: GET_LIST,
            payload: res.data
        })
    } catch (err) {
		console.log(err)
        const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		}
	}
};


export const getCourseShared = ({ id }) => async (dispatch) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
    try {
        const res = await axios.get(`http://localhost:8800/api/courses-shared/user/62928baba1d3851a8848fe19`, config)
        console.log(res)
        dispatch({
            type: GET_LIST,
            payload: res.data
        })
    } catch (err) {
		console.log(err)
        const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
		}
	}
};
