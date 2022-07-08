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

// export const noteListReducer = (state = { notes: [] }, action) => {
//   switch (action.type) {
//     case NOTES_LIST_REQUEST:
//       return { loading: true };
//     case NOTES_LIST_SUCCESS:
//       return { loading: false, notes: action.payload };
//     case NOTES_LIST_FAIL:
//       return { loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };