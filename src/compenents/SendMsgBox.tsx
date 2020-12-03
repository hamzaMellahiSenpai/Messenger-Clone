import React, { Component } from "react";
// import { Emojis } from "./emojis/emojis";
import { setMsgText } from "../redux/messages/messages.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectMsgText } from "../redux/messages/messages.selectors";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCurrentContact } from "../redux/contacts/contacts.selectors";
import moment from "moment";
import { db } from "../services/firebase";

class SendMsgBox extends Component {
  async storeMessage(newMsg) {
    let { msgText,setMsgText } = this.props;
    this.setState({ writeError: null });
    try {
      await db.ref("messages").push(newMsg);
      setMsgText("");
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }
  sendMessage = () => {
    let { msgText, currentUser, currentContact } = this.props;
    if (msgText === "") return;
    let newMsg = {
      id: Math.floor(Math.random() * 10000000),
      sender: currentUser.uid,
      body: msgText,
      time: moment().format("llll"),
      status: 2,
      recvId: currentContact.uid,
      recvIsGroup: false
    };
    console.log(newMsg);
    this.storeMessage(newMsg);
  };
  handleMessageChanged = (e) => {
    let { setMsgText } = this.props;
    e.preventDefault();
    let msgText = e.currentTarget.value;
    setMsgText(msgText);
  };
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };
  render() {
    let { msgText } = this.props;
    return (
      <div
        className="d-flex justify-self-end align-items-center flex-row"
        id="input-area"
      >
        <span
          className="myClass"
          style={{ float: "left", paddingRight: "5px" }}
        >
          {" "}
        </span>

        <a href="/#">
          <i
            className="far fa-smile text-muted px-3"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </a>
        <input
          type="text"
          name="message"
          id="input"
          placeholder="Type a message"
          className="flex-grow-1 border-0 px-3 py-2 my-3 rounded shadow-sm"
          onChange={this.handleMessageChanged}
          onKeyUp={this.handleKeyPress}
          value={msgText}
        />
        <i
          className="fas fa-paper-plane text-muted px-3"
          style={{ cursor: "pointer" }}
          onClick={this.sendMessage}
        ></i>
        {/* <Emojis showEmojis={showEmojis}/> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMsgText: (msg) => dispatch(setMsgText(msg))
});

const mapStateToProps = createStructuredSelector({
  msgText: selectMsgText,
  currentUser: selectCurrentUser,
  currentContact: selectCurrentContact
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMsgBox);
