import { ADD_COURSE_SUCCESS, ADD_COURSE_FAIL, GET_COURSE_SUCCESS, GET_COURSE_FAIL, GET_COURSE_SHARED_SUCCESS, GET_COURSE_SHARED_FAIL } from "../actions/types";

const initialState = {
  course: {},
  user_roles: [],
  loading: true,
}

export default function (state = initialState, action) {
	const { type, payload } = action;
	
    switch (type) {
        case GET_COURSE_SHARED_SUCCESS:
            return { ...state, loading: false, user_roles: payload }
        case ADD_COURSE_SUCCESS:
            return { ...state, course: payload, loading: false, }
        case GET_COURSE_SUCCESS:
            return { ...state, course: payload, loading: false, }
        case ADD_COURSE_FAIL:
        case GET_COURSE_FAIL:
        case GET_COURSE_SHARED_FAIL:
        default:
            return state;
    }
};