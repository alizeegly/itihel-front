import { ADD_COURSE_SUCCESS, ADD_COURSE_FAIL, GET_COURSE_SUCCESS, GET_USER_ROLES, GET_USER_ROLES_FAIL, GET_COURSE_FAIL, GET_COURSE_SHARED_SUCCESS, GET_COURSE_SHARED_FAIL, GET_FLIP_CARDS_FAIL, GET_FLIP_CARDS, COURSE_GET_REQUEST, COURSE_GET_SUCCESS, COURSE_GET_FAIL, COURSE_GET_USER_ROLES_REQUEST, COURSE_GET_USER_ROLES_SUCCESS, COURSE_GET_USER_ROLES_FAIL, GET_COURSE_SHARED_REQUEST, COURSE_UPDATE_REQUEST, COURSE_UPDATE_SUCCESS, COURSE_UPDATE_FAIL } from "../actions/types";

const initialState = {
  course: {},
  user_roles: [],
  flipCards: [],
  loading: true,
  course_shared: []
}

// export default function (state = initialState, action) {
// 	const { type, payload } = action;
	
//     switch (type) {
//         case GET_USER_ROLES:
//             return { ...state, loading: false, user_roles: payload }
//         case GET_COURSE_SHARED_SUCCESS:
//             return { ...state, loading: false, course_shared: payload }
//         case ADD_COURSE_SUCCESS:
//             return { ...state, course: payload, loading: false, }
//         case GET_COURSE_SUCCESS:
//             return { ...state, course: payload, loading: false, }
//         case GET_FLIP_CARDS:
//             return { ...state, flipCards: payload, loading: false, }
//         case ADD_COURSE_FAIL:
//         case GET_COURSE_SHARED_FAIL:
//         case GET_COURSE_FAIL:
//         case GET_USER_ROLES_FAIL:
//         case GET_FLIP_CARDS_FAIL:
//         default:
//             return state;
//     }
// };

export const GetCourseReducer = (state = {}, action) => {
    switch (action.type) {
      case COURSE_GET_REQUEST:
        return { loading: true };
      case COURSE_GET_SUCCESS:
        return { loading: false, success: true, course: action.payload };
      case COURSE_GET_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
};

export const GetRolesOfUserReducer = (state = {}, action) => {
    switch (action.type) {
      case COURSE_GET_USER_ROLES_REQUEST:
        return { loading: true };
      case COURSE_GET_USER_ROLES_SUCCESS:
        return { loading: false, success: true, user_roles: action.payload };
      case COURSE_GET_USER_ROLES_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
};

export const GetSharedOfCourse = (state = [], action) => {
  switch (action.type) {
    case GET_COURSE_SHARED_REQUEST:
      return { loading: true };
    case GET_COURSE_SHARED_SUCCESS:
      return { loading: false, success: true, courseShared: action.payload };
    case GET_COURSE_SHARED_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const courseUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_UPDATE_REQUEST:
			return { loading: true };
		case COURSE_UPDATE_SUCCESS:
			return { loading: false, courseUpdate: action.payload, success: true };
		case COURSE_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};