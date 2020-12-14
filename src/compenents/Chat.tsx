import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import firebase from "firebase";
import Bootbox from "bootbox-react";
import "emoji-mart/css/emoji-mart.css";
import Sidebar from "./Sidebar/Sidebar";
import MessagesArea from "./MessagesArea";
import { setCurrentUser } from "../redux/user/user.actions";
import { setContactsList } from "../redux/contacts/contacts.actions";
import { setMessagesList } from "../redux/messages/messages.actions";
import { selectCurrentContact } from "../redux/contacts/contacts.selectors";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectActiveNavTab } from "../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Call from "./call/call";
import Peer from "peerjs";
import "./chat.styles.scss";
import "animate.css";
import ContactProfile from "./ContactProfile";

// import { selectContactsList, selectCurrentContact } from "..\redux\contacts/contacts.selectors";
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
    otherVideo: null,
    myVideo: null
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
  populateUsers = (setContactsList) => {
    this.getCollection("users", (snapshot) => {
      let contacts = snapshot.val();
      let contactsListArray = [];
      Object.keys(contacts).forEach((key) => {
        contactsListArray.push(contacts[key]);
      });
      setContactsList(contactsListArray);
    });
  };
  populateMessages = (setMessagesList) => {
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
  }

  getUser = (setCurrentUser)=> {
    let uid = auth().currentUser.uid;
    var ref = db.ref("users");
    ref
      .orderByChild("uid")
      .equalTo(uid)
      .on("child_added", (snap) => {
        let user = snap.val();
        user.key = snap.key;
        user.isOnline = true;
        const reference = db.ref(`/users/${user.key}`);
        user.isOnline = false;
        console.log("idk presence set");
        setCurrentUser(user);
        this.getCollection("calls", (snapshot) => {
          let calls = snapshot.val();
          // check if user called
          if (calls == null) return;
          // console.log("11", calls, uid)
          Object.keys(calls).forEach((key) => {
            let call = calls[key];
            call.key = key;
            this.setState({ callInfo: call });
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
      });
  }
  async componentDidMount() {
    let {
      setCurrentUser,
      setContactsList,
      setMessagesList,
    } = this.props;
    await this.populateUsers(setContactsList);
    await this.populateMessages(setMessagesList);
    await this.getUser(setCurrentUser);
  }

  async getUserByUid(uid: number, callback) {
    var ref = db.ref("users");
    let user;
    ref.orderByChild("uid").equalTo(uid).on("child_added", callback);

    return user;
  }
  handleYes = () => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    let caaall = this.state.callInfo;
    // console.log("fddf")
    var peer = new Peer();
    getUserMedia(
      { video: true, audio: true },
      (stream) => {
        // console.log("33",  this.state.callInfo);
        var call = peer.call(caaall.body, stream);
        // this.setState({myVideo:stream});
        // this.video.srcObject = stream;
        document.getElementById("myVideo").srcObject = stream;
        call.on("stream", (remoteStream) => {
          document.getElementById("otherVideo").srcObject = remoteStream;
          //document.getElementById("otherVideo").RL.createObjectURL = remoteStream//.setAttribute("src" ,URL.createObjectURL(remoteStream))
          // document.getElementById("otherVideo").src = remoteStream//.setAttribute("src" ,URL.createObjectURL(remoteStream))
          console.log("streamingg....", remoteStream);
          // this.setState({otherVideo:remoteStream});
        });
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
    this.displayConfirmBox(false);
  };

  handleClose = () => {
    db.ref("calls/" + this.state.callInfo.key).remove();
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
    let { currentContact, activeNav } = this.props;
    let { show, callingMsg, otherVideo, myVideo } = this.state;
    return (
      <section className="bc-white">
        <div className="container-fluid col-md-10" id="main-container">
          <div className="top-right-gradient"></div>
          <div className="row main -100 shadow">

            <Sidebar />
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
            {/* <ContactProfile/>  */}
            {/* <div
                className="d-none d-sm-flex flex-column col-sm-3 col-md-8 p-0 h-100"
                id="message-area"
                style={styles.messageArea}
              >
                <div className="d-flex flex-column" id="messages">yo</div>
              </div> */}
          </div>
          <div className="bot-right-gradient"></div>
          <Bootbox
            show={show}
            type={"confirm"}
            message={callingMsg}
            onSuccess={this.handleYes}
            onCancel={this.handleClose}
            onClose={this.handleClose}
          />
          {/* <h1>you:</h1>
          <div>
            <video id="myVideo" autoPlay />
            <video id="otherVideo" autoPlay />
          </div>  */}
          {/* <img alt="" src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.now.howstuffworks.com%2Fmedia-content%2F0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg&imgrefurl=https%3A%2F%2Fplay.howstuffworks.com%2Fquiz%2Fwhat-kind-of-person-are-you&tbnid=ioc8TekMD0xRiM&vet=12ahUKEwj-7budqcTtAhUQ4RoKHcerBk0QMygJegUIARC2AQ..i&docid=LXtvfEqq4Hfp2M&w=1920&h=1080&q=person&ved=2ahUKEwj-7budqcTtAhUQ4RoKHcerBk0QMygJegUIARC2AQ"/> */}
          {/* <Call/> */}
        </div>
      </section>
    );
  }
}

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
  activeNav: selectActiveNavTab,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
