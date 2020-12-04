import React, { Component } from "react";
import Messages from "../compenents/Messages";
import Navbar from "./navbar";
import SendMsgBox from "./SendMsgBox";

class MessagesArea extends Component {
  render() {
    let { currentContact, filtredMessages, user } = this.props;
    return (
      <div
        className="d-none d-sm-flex flex-column col-12 col-sm-7 col-md-8 p-0 h-100"
        id="message-area"
        style={{background:"#0e0e0e"}}
      >
        <div className="w-100 h-100 overlay d-none"></div>

        {/* <!-- Navbar --> */}
        <Navbar contact={currentContact} />
        {/* <!-- Messages --> */}
        <Messages />
        {/* <!-- Input --> */}
        <SendMsgBox />
      </div>
    );
  }
}

export default MessagesArea;
