import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import contactsReducer from "./contacts/contacts.reducer";
import messagesReducer from "./messages/messages.reducer";



export default combineReducers({
  user: userReducer,
  contacts:contactsReducer,
  messages:messagesReducer
});
