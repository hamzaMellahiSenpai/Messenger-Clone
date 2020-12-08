import React, { Component } from "react";
import { db } from "../services/firebase";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCurrentContact } from "../redux/contacts/contacts.selectors";
import moment from "moment";
import { createStructuredSelector } from "reselect";
import peer from "peerjs";

class VideoCall extends Component {
  state = {
    otherVideo: null,
    myVideo: null
  };
  componentDidMount() {
    this.makeVideoCall();
  }
  makeVideoCall = () => {
    console.log("yee");
    var peer = new Peer();
    peer.on("open", (id) => {
      console.log(peer.id);
      let { currentUser, currentContact } = this.props;
      let call = {
        id: Math.floor(Math.random() * 10000000),
        sender: currentUser.uid,
        body: peer.id,
        time: moment().format("llll"),
        recvId: currentContact.uid,
        status: 0
      };
      console.log("call ", call);
      this.storeCall(call);
    });
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    peer.on("call", (call) =>{
      getUserMedia(
        { video: true, audio: true },
        (stream) =>{
          document.getElementById("myVideo").srcObject = stream;
          call.answer(stream); // Answer the call with an A/V stream.
          call.on("stream",  (remoteStream) =>{
            document.getElementById("otherVideo").srcObject = remoteStream;
            console.log("streamingg....", remoteStream)
          });
        },
        function (err) {
          console.log("Failed to get local stream", err);
        }
      );
    });
  };

  storeCall = async (call) => {
    try {
      await db.ref("calls").push(call);
      // setMsgText("");
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let { currentContact } = this.props;
    let { username } = currentContact;
    // let { otherVideo,myVideo} = this.state;
    return (
      <div>
        <h1>Calling {username}.....</h1>
        <video id="myVideo" autoPlay />
        <video id="otherVideo"  autoPlay />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentContact: selectCurrentContact
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCall);
