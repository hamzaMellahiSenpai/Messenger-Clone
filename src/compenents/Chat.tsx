import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import firebase from "firebase";
import Bootbox from "bootbox-react";
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
import peer from "peerjs";

// import { selectContactsList, selectCurrentContact } from "../redux/contacts/contacts.selectors";
// import { createStructuredSelector } from 'reselect';

class Chat extends Component {
  // this.singOut();
  // 123456789
  // ha@ha.com
  // yay
  state = {
    show: false,
    callingMsg: "yo",
    result: "no",
    caller: null,
    callInfo: null,
    otherVideo:""
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
    let {
      setCurrentUser,
      setContactsList,
      setMessagesList,
      currentUser
    } = this.props;
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
          if (calls == null) return;
          // console.log("11", calls, uid)
          Object.keys(calls).forEach((key) => {
            let call = calls[key];
            call.key  = key;
            this.setState({ callInfo:call});
            this.getUserByUid(calls[key].sender, (snap) => {
              console.log("call", this.state.callInfo);
              // let caller = snap.val();
              this.setState({ caller: snap.val() });
              let { caller } = this.state;
              if (call.recvId === uid && call.status === 0)
                // show confirm model
                this.displayConfirmBox(true, caller);
                console.log("call2", this.state.callInfo);

            });
          });
        });
        // console.log(this.props, "yep", snap.val());
      });
    // this.getCollection("users/" + uid, (snapshot) => {
    //   console.log("user", snapshot.val());
    //   setCurrentUser(snapshot.val());
    //     });
  }

  async getUserByUid(uid: number, callback) {
    var ref = db.ref("users");
    let user;
    ref.orderByChild("uid").equalTo(uid).on("child_added", callback);

    return user;
  }
  handleYes = () => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    let caaall =  this.state.callInfo;
    console.log("fddf")
    getUserMedia({video: true, audio: true}, (stream)=> {
        // console.log("33",  this.state.callInfo);
      var call = peer.call(caaall, stream);
      call.on('stream', function(remoteStream) {
        // this.setState({otherVideo:remoteStream});
        console.log(remoteStream)
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });
    this.displayConfirmBox(false);
  };

  handleClose = () => {
    db.ref("calls/"+ this.state.callInfo.key).remove();
    this.displayConfirmBox(false);
  };

  displayConfirmBox = (show, caller = null) => {
    if (caller)
      this.setState({
        callingMsg: `u have a call from ${caller.username}, Accept?`
      });
    this.setState({ show });
  };
  render() {
    // let lastMsg = filtredMessages[filtredMessages.length - 1].body;
    let { currentContact, isProfileActive } = this.props;
    let { show, callingMsg ,otherVideo} = this.state;
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
        <Bootbox
          show={show}
          type={"confirm"}
          message={callingMsg}
          onSuccess={this.handleYes}
          onCancel={this.handleClose}
          onClose={this.handleClose}
        />
        <video src={otherVideo} autoPlay/>
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
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
