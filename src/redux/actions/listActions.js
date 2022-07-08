import axios from "axios";
import { LIST_FAIL, SET_LIST, GET_PUBLIC_COURSES, LIST_REQUEST, LIST_SUCCESS, ADD_COURSE_SUCCESS, ADD_COURSE_FAIL } from "./types";

// export const getCoursesOfUser = ( id ) => async (dispatch) => {
//     const config = {
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	};
//     try {
//         const res = await axios.get(`http://localhost:8800/api/users/${id}/courses`, config)
//         dispatch( {
//             type: SET_LIST,
//             payload: res.data
//         })
//     } catch (err) {
//         dispatch( {
//             type: LIST_FAIL,
//             payload: console.log(err),
//         })
// 	}
// };

export const getCoursesOfUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_REQUEST,
        });
    
        const {userLogin: { userInfo }} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
    
        const { data } = await axios.get(`/api/users/${id}/courses`, config);
        dispatch({
            type: LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
            type: LIST_FAIL,
            payload: message,
        });
    }
  };

export const getCoursesShared = ( id ) => async (dispatch, getState) => {
    dispatch({
        type: LIST_REQUEST,
    });
    
    const {userLogin: { userInfo }} = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    try {
        const { data } = await axios.get(`/api/users/${id}/courses/shared`, config)
        dispatch({
            type: LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
		const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
            type: LIST_FAIL,
            payload: message,
        });
	}
};

export const getPublicCourses = () => async (dispatch, getState) => {
    dispatch({
        type: LIST_REQUEST,
    });
    
    const {userLogin: { userInfo }} = getState();
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    try {
        const { data } = await axios.get(`/api/courses/public`, config)
        dispatch({
            type: LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
		const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
            type: LIST_FAIL,
            payload: message,
        });
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
