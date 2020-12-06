import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import firebase from "firebase";
// import BootBox from "../../react-bootbox";
import "emoji-mart/css/emoji-mart.css";
import { connect } from "react-redux";
import ContactsArea from "./ContactsArea/ContactsArea";
import MessagesArea from "./MessagesArea";
import ProfileSettings from "./ProfileSettings";
import { setCurrentUser } from "../redux/user/user.actions";
import { setContactsList } from "../redux/contacts/contacts.actions";
import { setMessagesList } from "../redux/messages/messages.actions";
import { selectCurrentContact } from "../redux/contacts/contacts.selectors";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectProfile } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
// import { selectContactsList, selectCurrentContact } from "../redux/contacts/contacts.selectors";
// import { createStructuredSelector } from 'reselect';

class Chat extends Component {
  // this.singOut();
  // 123456789
  // ha@ha.com
  // yay
  state = {
show:false
  }
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
    let { setCurrentUser, setContactsList, setMessagesList,currentUser } = this.props;
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
        try {
          let msg = messages[key];
          msg.key = key;
          messagesListArray.push(messages[key]);
        } catch {
          return;
        }
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
        this.getCollection("calls", (snapshot) => {
          let calls = snapshot.val();
          // check if user called
          if (calls == null && currentUser.uid != null)
            return;
          // console.log("11", calls, uid)
          Object.keys(calls).forEach((key) => {
            let call = calls[key];
            console.log("11", call, uid);
            if (call.recvId === uid && call.status === 0)
            {
              // show confirm model 
              // if yes then respond
              // this.showConfirmBox();
              // confirm("")
            }
          });
        });
        // console.log(this.props, "yep", snap.val());
      });
    // this.getCollection("users/" + uid, (snapshot) => {
    //   console.log("user", snapshot.val());
    //   setCurrentUser(snapshot.val());
    //     });
  }
  showConfirmBox = () => {
    bootbox.confirm({
      message: "This is a confirm with custom button text and color! Do you like it?",
      buttons: {
          confirm: {
              label: 'Call',
              className: 'btn-success'
          },
          cancel: {
              label: 'Cancel',
              className: 'btn-danger'
          }
      },
      callback: function (result) {
          console.log('This was logged in the callback: ' + result);
      }
  });
  }
  render() {
    // let lastMsg = filtredMessages[filtredMessages.length - 1].body;
    let { currentContact, isProfileActive } = this.props;
    return (
      <div className="container-fluid" id="main-container">
        <div className="row main -100">
          {!isProfileActive ? <ContactsArea /> : <ProfileSettings />}
          {currentContact ? (
            <MessagesArea />
          ) : (
            <div
              className="d-none d-sm-flex flex-column col-12 col-sm-7 col-md-8 p-0 h-100"
              id="message-area"
              style={styles.messageArea}
            >
              <div className="d-flex flex-column" id="messages"></div>
            </div>
          )}
        </div>
        <BootBox 
        message="Do you want to Continue?"
        show={this.state.show} 
        onYesClick = {this.showAlert}
        onNoClick = {this.handleClose}
        onClose = {this.handleClose}/>
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   contacts:selectContactsList,
//   currentContact:selectCurrentContact
// });

const styles = {
  messageArea: {
    background: "#0e0e0e"
  }
};
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (usersss) => dispatch(setCurrentUser(usersss)),
  setContactsList: (contacts) => dispatch(setContactsList(contacts)),
  setMessagesList: (messages) => dispatch(setMessagesList(messages))
});

const mapStateToProps = createStructuredSelector({
  currentContact: selectCurrentContact,
  isProfileActive: selectProfile,
  currentUser:selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
