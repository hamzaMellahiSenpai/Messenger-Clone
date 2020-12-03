import {ContactsActionTypes} from "./contacts.types"

const INITIAL_STATE = {
  list:[],
  currentContact:null
};

const userReducer = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case ContactsActionTypes.SET_CONTACTS:
      return {
        ...state,
        list: action.payload
      };
    case ContactsActionTypes.SET_CURRENT_CONTACT:
      return {
        ...state,
        currentContact: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
