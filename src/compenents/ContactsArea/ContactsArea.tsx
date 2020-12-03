import React, { Component } from "react";
import propTypes from "prop-types";
import firebase from "firebase";
import Navbar from "./navbar";
import ContactsList from "./ContactsList";
import SearchBar from "./SearchBar";


export default class ContactsArea extends Component {
  singOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  render() {
    let {  getLastMsg, setCurrentContact } = this.props;
    // console.log(getLastMsg());
    return (
      <div
        className="col-12 col-sm-5 col-md-4 d-flex flex-column"
        id="chat-list-area"
        style={{ position: "relative" }}
      >
        {/* <!-- Navbar -->  */}
        <Navbar />
        <SearchBar/>
        {/* <!-- Chat List --> */}
        <ContactsList
        lastMsgHandler={getLastMsg}
        changeCurrentContact={setCurrentContact}
      /> 

        {/* <!-- Profile Settings --> */}
       <div
        className="d-flex flex-column w-100 h-100"
        id="profile-settings"
      >
        <div
          className="row d-flex flex-row align-items-center p-2 m-0"
          style={{ background: "#009688", minHeight: "65px" }} // # ll
        >
          <i
            className="fas fa-arrow-left p-2 mx-3 my-1 text-white"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={this.hideProfileSettings}
          ></i>
          <div className="text-white font-weight-bold">Profile</div>
        </div>
        <div className="d-flex flex-column" style={{ overflow: "auto" }}>
          <img
            alt="Profile"
            className="img-fluid rounded-circle my-5 justify-self-center mx-auto"
            id="profile-pic"
          />
          <input
            type="file"
            id="profile-pic-input"
            className="d-none"
            readOnly
          />
          <div className="bg-white px-3 py-2">
            <div className="text-muted mb-2">
              <label htmlFor="input-name">Your Name</label>
            </div>
            <input
              type="text"
              name="name"
              id="input-name"
              readOnly
              className="w-100 border-0 py-2 profile-input"
            />
          </div>
          <div className="text-muted p-3 small">
            This is not your username or pin. This name will be visible to
            your WhatsApp contacts.
          </div>
          <div className="bg-white px-3 py-2">
            <div className="text-muted mb-2">
              <label htmlFor="input-about">About</label>
            </div>
            <input
              type="text"
              name="name"
              id="input-about"
              value=""
              readOnly
              className="w-100 border-0 py-2 profile-input"
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
}
