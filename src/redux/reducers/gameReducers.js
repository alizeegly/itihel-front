import { GET_FLIP_CARDS_SUCCESS, GET_FLIP_CARDS_FAIL, GET_FLIP_CARDS_REQUEST } from "../actions/types";

export const GetFlashCardsOfCourseReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_FLIP_CARDS_REQUEST:
        return { loading: true };
      case GET_FLIP_CARDS_SUCCESS:
        return { loading: false, success: true, cards: action.payload };
      case GET_FLIP_CARDS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
};