import axios from "axios";
import { LIST_FAIL, SET_LIST, GET_PUBLIC_COURSES, LIST_REQUEST, LIST_SUCCESS, ADD_COURSE_SUCCESS, ADD_COURSE_FAIL, COURSE_CREATE_REQUEST, COURSE_CREATE_SUCCESS, COURSE_CREATE_FAIL, COURSE_DELETE_REQUEST, COURSE_DELETE_FAIL, COURSE_DELETE_SUCCESS } from "./types";

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

export const createCourseAction = (course) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: COURSE_CREATE_REQUEST,
        });
  
        const {
            userLogin: { userInfo },
        } = getState();
    
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
    
        const { data } = await axios.post(
            `/api/courses`,
            course,
            config
        );
    
        dispatch({
            type: COURSE_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COURSE_CREATE_FAIL,
        payload: message,
      });
    }
};

export const deleteCourseAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COURSE_DELETE_REQUEST,
        });
    
        const {
            userLogin: { userInfo },
        } = getState();
    
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
    
        const { data } = await axios.delete(`/api/courses/${id}/${userInfo._id}`, config);
    
        dispatch({
            type: COURSE_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
            type: COURSE_DELETE_FAIL,
            payload: message,
        });
    }
};