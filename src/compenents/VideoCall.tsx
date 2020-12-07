import React, { Component } from "react";
import { db } from "../services/firebase";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCurrentContact } from "../redux/contacts/contacts.selectors";
import moment from "moment";
import { createStructuredSelector } from "reselect";
import peer from "peerjs";

class VideoCall extends Component {
  componentDidMount(){
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
      console.log("call " , call)
      this.storeCall(call);
    });
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    peer.on('call', function(call) {
        getUserMedia({video: true, audio: true}, function(stream) {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on('stream', function(remoteStream) {
            console.log("on Streaaaaam yeaah");
          });
        }, function(err) {
          console.log('Failed to get local stream' ,err);
        });
      });
  };
  
  storeCall = async (call) => {
    try {
      await db.ref("calls").push(call);
      // setMsgText("");
    } catch (error) {
      console.log(error)
    }
  };
  render() {
    let {currentContact} = this.props;
    let {username} = currentContact;
    return <h1>Calling {username}.....</h1>;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentContact: selectCurrentContact
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCall);
