import React, { Component } from "react";
import { connect } from "react-redux";
import Conversation from "./Conversation";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import {
  selectContactsList,
  selectCurrentContact
} from "../../redux/contacts/contacts.selectors";
import { selectSearchText } from "../../redux/messages/messages.selectors";
import SearchBar from "./SearchBar";

class ConversationsList extends Component {
  filterContactsBySearchText(contacts) {
    let { searchText } = this.props;
    // return contacts.filter((contact) =>
    //   contact.username.toLowerCase().includes(searchText.toLowerCase())
    // );
    return contacts;
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
        <div className="p-3">
          <div className="row">
            <div className="col">
              <h1 style={styles.label}>Chats</h1>
            </div>
            {/* <div className="col text-right ">
              <i className="fa fa-3x fa-plus-circle pt-2 text-fancy"></i>
            </div> */}
          </div>
          <SearchBar />
          {filterContacts.map((contact) => (
            <Conversation
              contact={contact}
              key={contact.uid}
              lastMsgHandler={lastMsgHandler}
              className={(contact) => this.getClass(contact)}
            />
          ))}
        </div>
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

export default connect(mapStateToProps)(ConversationsList);

// 12345678
// sdaahi@sd.ma
// sender == Current || resvid == Current

// char* s = "0101010101"
// s[1]
const styles = {
  label: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#101013"
  }
};
