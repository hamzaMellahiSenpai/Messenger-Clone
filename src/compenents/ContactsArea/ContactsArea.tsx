import React, { Component } from "react";
import propTypes from "prop-types";
import firebase from "firebase";
import Navbar from "./navbar";
import ContactsList from "./ContactsList";
import SearchBar from "./SearchBar";

export default class ContactsArea extends Component {
  render() {
    // let {  getLastMsg, setCurrentContact } = this.props;
    // console.log(getLastMsg());
    return (
      <div
        className="col-12 col-sm-5 col-md-4 d-flex flex-column"
        id="chat-list-area"
        style={styles.contactsArea}
      >
        <Navbar />
        <div className="p-3">
          <div className="row">
            <div className="col">
              <h1 style={styles.label}>Chats</h1>
            </div>
            <div className="col text-right ">
              <i
                className="fa fa-3x fa-plus-circle pt-2 text-fancy"
              ></i>
            </div>
          </div>
        <SearchBar />
        <ContactsList />
        </div>
      </div>
    );
  }
}

const styles = {
  contactsArea: {
    background: "#F1F4F8",
    position: "relative"
  },
  label: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "#101013"
  }
};
