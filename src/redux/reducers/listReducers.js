import { SET_LIST, GET_PUBLIC_COURSES, LIST_REQUEST, LIST_SUCCESS, LIST_FAIL } from "../actions/types";

const initialState = {
  courses: [],
  publicCourses: []
}

// export default function (state = initialState, action) {
// 	const { type, payload } = action;
	
//   switch (type) {
//     case GET_PUBLIC_COURSES:
//       return { ...state, publicCourses: payload };
//     case SET_LIST:
//       return { ...state, courses: payload };
//     default:
//       return state;
//   }
// };

export const ListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case LIST_REQUEST:
      return { loading: true };
    case LIST_SUCCESS:
      return { loading: false, courses: action.payload };
    case LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};