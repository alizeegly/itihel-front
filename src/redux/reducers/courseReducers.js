import { ADD_COURSE_SUCCESS, ADD_COURSE_FAIL } from "../actions/types";

const initialState = {
  course: {}
}

export default function (state = initialState, action) {
	const { type, payload } = action;
	
    switch (type) {
        case ADD_COURSE_SUCCESS:
            return { ...state, course: payload }
        case ADD_COURSE_FAIL:
        default:
            return state;
    }
};