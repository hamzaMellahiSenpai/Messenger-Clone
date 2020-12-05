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
        <SearchBar />
        <ContactsList />
      </div>
    );
  }
}

const styles={
  contactsArea : {
    background:"#131c21",
    position: "relative"
  }
}