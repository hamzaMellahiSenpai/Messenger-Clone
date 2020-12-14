import React, { Component } from "react";
import propTypes from "prop-types";
import firebase from "firebase";
import Navbar from "./navbar";
import ContactsList from "./ContactsList";
import Profile from "./Profile";
import Settings from "./Settings";
import Calls from "./Calls";

import { selectActiveNavTab } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class Sidebar extends Component {
  render() {
    let { activeNav } = this.props;
    // let {  getLastMsg, setCurrentContact } = this.props;
    // console.log(getLastMsg());
    return (
      <div
        className="col-12 col-sm-5 col-md-4 d-flex flex-column"
        id="chat-list-area"
        style={styles.contactsArea}
      >
        <Navbar />
        {activeNav === "messages" ? (
          <ContactsList />
        ) : activeNav === "profile" ? (
          <Profile />
        ) : activeNav === "calls" ? (
          <Calls />
        ) : (
          <Settings />
        )}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  activeNav: selectActiveNavTab
});

const styles = {
  contactsArea: {
    background: "#F1F4F8",
    position: "relative"
  }
};
export default connect(mapStateToProps)(Sidebar);
