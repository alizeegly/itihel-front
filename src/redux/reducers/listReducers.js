import { SET_LIST, GET_PUBLIC_COURSES, LIST_REQUEST, LIST_SUCCESS, LIST_FAIL, COURSE_CREATE_REQUEST, COURSE_CREATE_SUCCESS, COURSE_CREATE_FAIL, COURSE_DELETE_REQUEST, COURSE_DELETE_SUCCESS, COURSE_DELETE_FAIL } from "../actions/types";

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

export const CourseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_CREATE_REQUEST:
      return { loading: true };
    case COURSE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case COURSE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const courseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DELETE_REQUEST:
      return { loading: true };
    case COURSE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COURSE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};