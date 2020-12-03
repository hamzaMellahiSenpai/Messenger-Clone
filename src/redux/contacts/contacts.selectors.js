import { createSelector } from "reselect";

const selectContact = (state) => state.contacts;
console.log(selectContact);
export const selectContactsList = createSelector(
  [selectContact],
  (contacts) => contacts.list
);

export const selectCurrentContact = createSelector(
  [selectContact],
  (contacts) => contacts.currentContact
);
