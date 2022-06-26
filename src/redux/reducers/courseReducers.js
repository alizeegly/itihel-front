import { ADD_COURSE_SUCCESS, ADD_COURSE_FAIL, GET_COURSE_SUCCESS, GET_USER_ROLES, GET_USER_ROLES_FAIL, GET_COURSE_FAIL, GET_COURSE_SHARED_SUCCESS, GET_COURSE_SHARED_FAIL, GET_FLIP_CARDS_FAIL, GET_FLIP_CARDS } from "../actions/types";

const initialState = {
  course: {},
  user_roles: [],
  flipCards: [],
  loading: true,
  course_shared: []
}

export default function (state = initialState, action) {
	const { type, payload } = action;
	
    switch (type) {
        case GET_USER_ROLES:
            return { ...state, loading: false, user_roles: payload }
        case GET_COURSE_SHARED_SUCCESS:
            return { ...state, loading: false, course_shared: payload }
        case ADD_COURSE_SUCCESS:
            return { ...state, course: payload, loading: false, }
        case GET_COURSE_SUCCESS:
            return { ...state, course: payload, loading: false, }
        case GET_FLIP_CARDS:
            return { ...state, flipCards: payload, loading: false, }
        case ADD_COURSE_FAIL:
        case GET_COURSE_SHARED_FAIL:
        case GET_COURSE_FAIL:
        case GET_USER_ROLES_FAIL:
        case GET_FLIP_CARDS_FAIL:
        default:
            return state;
    }
};