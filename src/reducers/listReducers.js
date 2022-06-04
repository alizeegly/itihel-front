import {SET_LIST} from "../actions/types";

const initialState = {
    courses: [],
}

export default function (state = initialState, action) {
	const { type, payload } = action;
	
    switch (type) {
      case SET_LIST:
        return { ...state, courses: payload };
      default:
        return state;
    }
};