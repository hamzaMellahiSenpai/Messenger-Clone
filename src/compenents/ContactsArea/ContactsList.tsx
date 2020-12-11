import React, { Component } from "react";
import { connect } from "react-redux";
import Contact from "./Contact";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import {
  selectContactsList,
  selectCurrentContact
} from "../../redux/contacts/contacts.selectors";
import { selectSearchText } from "../../redux/messages/messages.selectors";

class ContactsList extends Component {
  filterContactsBySearchText(contacts) {
    let { searchText } = this.props;
    return contacts.filter((contact) =>
      contact.username.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  getClass(contact) {
    let { currentContact } = this.props;
    console.log("yoo", contact, currentContact);
    if (contact.uid === currentContact.uid) return "active-chat";
    return null;
  }
  render() {
    let { contacts, lastMsgHandler, currentUser } = this.props;
    if (currentUser == null) return null;
    let filterContacts = contacts.filter(
      (contact) => contact.uid !== currentUser.uid
    );
    filterContacts = this.filterContactsBySearchText(filterContacts);
    return (
      <div className="">
        {filterContacts.map((contact) => (
          <Contact
            contact={contact}
            key={contact.uid}
            lastMsgHandler={lastMsgHandler}
            className={(contact) => this.getClass(contact)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  contacts: selectContactsList,
  currentContact: selectCurrentContact,
  searchText: selectSearchText
});

export default connect(mapStateToProps)(ContactsList);

// 12345678
// sdaahi@sd.ma
// sender == Current || resvid == Current

// char* s = "0101010101"
// s[1]
