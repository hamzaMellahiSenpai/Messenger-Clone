import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isProfileActive:false
};

const userReducer = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
      case UserActionTypes.TOGGLE_PROFILE:
        return {
          ...state,
          isProfileActive: !state.isProfileActive
        };
    default:
      return state;
  }
};

export default userReducer;
