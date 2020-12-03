import { createSelector } from "reselect";

const selectContact = (state) => state.messages;

export const selectMessagesList = createSelector(
  [selectContact],
  (messages) => messages.list
);

export const selectMsgText = createSelector(
  [selectContact],
  (messages) => messages.msgText
);

export const selectSearchText = createSelector(
  [selectContact],
  (messages) => messages.searchText
);
