import { ContactsActionTypes } from "./contacts.types";

export const setContactsList = (contacts) => ({
  type: ContactsActionTypes.SET_CONTACTS,
  payload: contacts
});

export const setCurrentContact = (currentContact) => ({
  type: ContactsActionTypes.SET_CURRENT_CONTACT,
  payload: currentContact
});
