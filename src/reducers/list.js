import { GET_LIST, LIST_FAIL } from "../actions/types";

const initialState = {
    items: [],
    error: false
};
  
export default function (state = initialState, action) {
  
    switch (action.type) {
        case GET_LIST:
            console.log(action)
            return {
                ...state,
                items: action.payload
            };
        case LIST_FAIL:
            return {
                ...state,
                error: true
            };
    
        default:
            return state;
    }
  
}