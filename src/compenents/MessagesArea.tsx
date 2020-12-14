import React, { Component } from "react";
import Messages from "../compenents/Messages";
import Navbar from "./navbar";
import SendMsgBox from "./SendMsgBox";
import { selectActiveNavTab } from "../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class Sidebar extends Component {
  render() {
    let { currentContact, filtredMessages, user } = this.props;
    return (
      <div
        className="d-none d-sm-flex flex-column col-12 text-dark col-sm-7 col-md-8 p-0 h-100"
        id="message-area"
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
const mapStateToProps = createStructuredSelector({
  activeNav: selectActiveNavTab
});

export default connect(mapStateToProps)(Sidebar);
