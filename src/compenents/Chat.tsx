import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import firebase from "firebase";
import "emoji-mart/css/emoji-mart.css";
import { connect } from "react-redux";
import ContactsArea from "./ContactsArea/ContactsArea";
import MessagesArea from "./MessagesArea";
import ProfileSettings from "./ProfileSettings";
import { setCurrentUser } from "../redux/user/user.actions";
import { setContactsList } from "../redux/contacts/contacts.actions";
import { setMessagesList } from "../redux/messages/messages.actions";
import { selectCurrentContact } from "../redux/contacts/contacts.selectors";
import { createStructuredSelector } from "reselect";
// import { selectContactsList, selectCurrentContact } from "../redux/contacts/contacts.selectors";
// import { createStructuredSelector } from 'reselect';

class Chat extends Component {
  // this.singOut();
  // 123456789
  // ha@ha.com
  // yay
  state = {
    profileSettingShown: true
  };
  toggleProfileSettingShow = () => {
    let { profileSettingShown } = this.state;
    // this.state.profileSettingShown = !this.state.profileSettingShown;
    this.setState({ profileSettingShown: !profileSettingShown });
  };
  async getCollection(colName, callback) {
    let data = [];
    try {
      db.ref(colName).on("value", callback);
    } catch (error) {
      this.setState({ readError: error.message });
    }
    return data;
  }
  //1
  //
  async componentDidMount() {
    let { setCurrentUser, setContactsList, setMessagesList } = this.props;
    this.getCollection("users", (snapshot) => {
      let contacts = snapshot.val();
      let contactsListArray = [];
      Object.keys(contacts).forEach((key) => {
        contactsListArray.push(contacts[key]);
      });
      setContactsList(contactsListArray);
    });

    this.getCollection("messages", (snapshot) => {
      let messages = snapshot.val();
      let messagesListArray = [];
      Object.keys(messages).forEach((key) => {
        messagesListArray.push(messages[key]);
      });
      setMessagesList(messagesListArray);
    });
    let uid = auth().currentUser.uid;
    var ref = db.ref("users");
    ref
      .orderByChild("uid")
      .equalTo(uid)
      .on("child_added", (snap) => {
        let user = snap.val();
        user.key = snap.key;
        setCurrentUser(user);
        // console.log(this.props, "yep", snap.val());
      });
  }
  setCurrentContact = (contact) => {
    this.setState({ currentContact: contact });
    console.log(contact);
  };
  showProfileSettings() {}
  render() {
    // let lastMsg = filtredMessages[filtredMessages.length - 1].body;
    let { currentContact } = this.props;
    let { profileSettingShown } = this.state;
    return (
      <div className="container-fluid" id="main-container">
        <div className="row main -100">
          {!profileSettingShown ? <ContactsArea /> : <ProfileSettings />}
          {currentContact ? (
            <MessagesArea />
          ) : (
            <div
              className="d-none d-sm-flex flex-column col-12 col-sm-7 col-md-8 p-0 h-100"
              id="message-area"
            >
              <div className="d-flex flex-column" id="messages"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   contacts:selectContactsList,
//   currentContact:selectCurrentContact
// });

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (usersss) => dispatch(setCurrentUser(usersss)),
  setContactsList: (contacts) => dispatch(setContactsList(contacts)),
  setMessagesList: (messages) => dispatch(setMessagesList(messages))
});

const mapStateToProps = createStructuredSelector({
  currentContact: selectCurrentContact
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
