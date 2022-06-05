import { SET_LIST, GET_PUBLIC_COURSES } from "../actions/types";

const initialState = {
  courses: [],
  publicCourses: []
}

export default function (state = initialState, action) {
	const { type, payload } = action;
	
  switch (type) {
    case GET_PUBLIC_COURSES:
      return { ...state, publicCourses: payload };
    case SET_LIST:
      return { ...state, courses: payload };
    default:
      return state;
  }
};