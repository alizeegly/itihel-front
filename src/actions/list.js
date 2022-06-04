import axios from "axios";
import { LIST_FAIL, SET_LIST, GET_PUBLIC_COURSES } from "./types";

export const getCoursesOfUser = ( id ) => async (dispatch) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
    try {
        const res = await axios.get(`http://localhost:8800/api/users/${id}/courses`, config)
        dispatch( {
            type: SET_LIST,
            payload: res.data
        })
    } catch (err) {
        dispatch( {
            type: LIST_FAIL,
            payload: console.log(err),
        })
	}
};

export const getCoursesShared = ( id ) => async (dispatch) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
    try {
        const res = await axios.get(`/api/users/${id}/courses/shared`, config)
        dispatch( {
            type: SET_LIST,
            payload: res.data
        })
    } catch (err) {
		dispatch( {
            type: LIST_FAIL,
            payload: console.log(err),
        })
	}
};

export const getPublicCourses = () => async (dispatch) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
    try {
        const res = await axios.get(`/api/courses/public`, config)
        dispatch( {
            type: SET_LIST,
            payload: res.data
        })
    } catch (err) {
		dispatch( {
            type: LIST_FAIL,
            payload: console.log(err),
        })
	}
};

export const getPublicCoursesOfUser = ( id ) => async (dispatch) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
    try {
        const res = await axios.get(`http://localhost:8800/api/users/${id}/courses/public`, config)
        console.log(res.data)
        dispatch( {
            type: GET_PUBLIC_COURSES,
            payload: res.data
        })
    } catch (err) {
        console.log("error")
        dispatch( {
            type: LIST_FAIL,
            payload: console.log(err),
        })
	}
};