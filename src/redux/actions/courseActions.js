import axios from "axios";
import { setAlert } from "./alertActions";
import { ADD_COURSE_SUCCESS, ADD_COURSE_FAIL, GET_COURSE_SUCCESS, GET_COURSE_FAIL, GET_COURSE_SHARED_SUCCESS, GET_COURSE_SHARED_FAIL, GET_FLIP_CARDS_FAIL, GET_USER_ROLES, GET_USER_ROLES_FAIL, COURSE_GET_REQUEST, COURSE_GET_SUCCESS, COURSE_GET_FAIL, COURSE_GET_USER_ROLES_REQUEST, COURSE_GET_USER_ROLES_SUCCESS, COURSE_GET_USER_ROLES_FAIL, GET_FLIP_CARDS_SUCCESS, GET_FLIP_CARDS_REQUEST, GET_COURSE_SHARED_REQUEST, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_LOGIN_SUCCESS, USER_UPDATE_FAIL, COURSE_UPDATE_SUCCESS, COURSE_UPDATE_FAIL, COURSE_UPDATE_REQUEST } from "./types";


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

export const getCourse = ( id ) => async (dispatch, getState) => {

	try {
        dispatch({
            type: COURSE_GET_REQUEST,
        });
    
        const {
            userLogin: { userInfo },
        } = getState();
    
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
    
        const { data } = await axios.get("http://localhost:8800/api/courses/find/" + id, config);
    
        dispatch({
            type: COURSE_GET_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type: COURSE_GET_FAIL,
            payload: message,
        });
    }
};

export const getRolesOfUserCourse = ( user, course ) => async (dispatch, getState) => {
	try {
        dispatch({
            type: COURSE_GET_USER_ROLES_REQUEST,
        });
    
        const {
            userLogin: { userInfo },
        } = getState();
    
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
    
        const { data } = await axios.get("http://localhost:8800/api/courses-shared/" + user + "/" + course, config);

        dispatch({
            type: COURSE_GET_USER_ROLES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
            type: COURSE_GET_USER_ROLES_FAIL,
            payload: message,
        });
    }
};

export const getCourseSharedOfCourse = ( id ) => async (dispatch, getState) => {

    try {
        dispatch({
            type: GET_COURSE_SHARED_REQUEST,
        });
    
        const {
            userLogin: { userInfo },
        } = getState();
    
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
    
        const { data } = await axios.get("http://localhost:8800/api/courses-shared/course/" + id, config);
        console.log(data)
    
        dispatch({
            type: GET_COURSE_SHARED_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type: GET_COURSE_SHARED_FAIL,
            payload: message,
        });
    }
};

export const getFlipCardsOfCourse = ( course ) => async (dispatch, getState) => {
	try {
        dispatch({
            type: GET_FLIP_CARDS_REQUEST,
        });
    
        const {
            userLogin: { userInfo },
        } = getState();
    
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
    
        const { data } = await axios.get("http://localhost:8800/api/flip-cards/courses/" + course, config);
    
        dispatch({
            type: GET_FLIP_CARDS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
            type: GET_FLIP_CARDS_FAIL,
            payload: message,
        });
    }

};

export const updateCourse = (course) => async (dispatch, getState) => {
	try {
		dispatch({ type: COURSE_UPDATE_REQUEST });
	
		const {
			userLogin: { userInfo },
		} = getState();
	
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`http://localhost:8800/api/courses/${course._id}`, course, config);
	
		dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COURSE_UPDATE_FAIL,
			payload:
			error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		});
	}
};