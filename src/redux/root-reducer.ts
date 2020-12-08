import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import contactsReducer from "./contacts/contacts.reducer";
import messagesReducer from "./messages/messages.reducer";
// import storage from 'redux-presist/lib/storage';

// const presistConfig = {
//   key:'root',
//   storage,
// whitelist:['contacts', 'messages']
// }
export default combineReducers({
  user: userReducer,
  contacts:contactsReducer,
  messages:messagesReducer
});
