import { MessagesActionTypes } from "./messages.types";

const INITIAL_STATE = {
  list: [],
  msgText: "",
  searchText: ""
};

const userReducer = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case MessagesActionTypes.SET_MESSAGES:
      return {
        ...state,
        list: action.payload
      };
    case MessagesActionTypes.SET_MSG_TEXT:
      return {
        ...state,
        msgText: action.payload
      };
    case MessagesActionTypes.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
