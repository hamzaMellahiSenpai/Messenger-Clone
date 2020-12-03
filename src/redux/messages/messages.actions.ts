import { MessagesActionTypes } from "./messages.types";

export const setMessagesList = (messages) => ({
  type: MessagesActionTypes.SET_MESSAGES,
  payload: messages
});

export const setMsgText = (msg:string) => ({
  type: MessagesActionTypes.SET_MSG_TEXT,
  payload: msg
});

export const setSearchText = (search:string) => ({
  type: MessagesActionTypes.SET_SEARCH_TEXT,
  payload: search
});
