import React, { Component } from "react";
import Message from "../compenents/Message";
import { selectMessagesList } from "../redux/messages/messages.selectors";
import { selectCurrentContact } from "../redux/contacts/contacts.selectors";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

class Messages extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  getMsgBoxStyle(msg) {
    let className = "p-1 my-1 mx-3 rounded bg-white shadow-sm message-item";
    if (msg.sender === this.state.user.uid) className += "align-self-start";
    else className += "align-self-end";
    return className;
  }
  showOnlyContactMsgs = (contactId = undefined) => {
    let { currentContact, messages, currentUser } = this.props;
    console.log("c", messages);
    if (contactId === undefined) contactId = currentContact.uid;
    let msgs = messages.filter(
      (message) => message.sender === contactId || message.recvId === contactId
    );
    msgs = msgs.filter(
      (message) =>
        message.sender === currentUser.uid || message.recvId === currentUser.uid
    );
    return msgs;
    // return "say hi fam";
  };
  render() {
    let { currentUser, messages } = this.props;
    let filtredMessages = [];
    filtredMessages = this.showOnlyContactMsgs();
    // let lastMsg = filtredMessages[filtredMessages.length - 1].body;
    return (
      <div className="d-flex flex-column" id="messages">
        <div className="mx-auto my-2 bg-primary text-white small py-1 px-2 rounded">
          27/03/2018
        </div>
        {filtredMessages != null &&
          filtredMessages.map((msg) => (
            <Message message={msg} userId={currentUser.uid} key={msg.id} />
          ))}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  messages: selectMessagesList,
  currentContact: selectCurrentContact,
  currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(Messages);
