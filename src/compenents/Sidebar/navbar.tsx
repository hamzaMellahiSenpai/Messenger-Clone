import React, { Component } from "react";
import { connect } from "react-redux";
import { setActiveTab } from "../../redux/user/user.actions";
import firebase from "firebase";

function Navbar(props) {
  let { currentUser, setActiveTab } = props;
  if (currentUser === null) return null;
  let { username, picUrl } = currentUser;
  const singOut = (e) => {
    e.preventDefault();
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
  console.log(picUrl);

  // const showProfile = (e) => {
  //   e.preventDefault();
  //   toggleProfile();
  // };
  // const changeScreen = (tabName) => {
  //   // e.preventDefault();
  //   // toggleSettings()
  //   setActiveTab(tabName);
  // }
  return (
    <div
      className="row d-flex flex-row align-items-center p-3  m-0 w-100 shadow-sm"
      id="navbar"
    >
      <div className="col-sm-3" onClick={() => setActiveTab("messages")}>
        <i className="fas fa-comment-alt mx-3 d-none d-md-block text-greey fa-2x"></i>
      </div>
      <div className="col-sm-3" onClick={() => setActiveTab("calls")}>
        <i className="fas fa-phone mx-3 d-none d-md-block text-greey fa-2x"></i>
      </div>
      <div className="col-sm-3" onClick={() => setActiveTab("profile")}>
        <img
          alt="Profile"
          className=" rounded-circle text-greey"
          style={{ height: "60px", width: "70px" }}
          // id="display-pic"
          src={props.currentUser.picUrl}
        />
      </div>
      <div className="col-sm-3" onClick={() => setActiveTab("settings")}>
        <i className="fas fa-cog mx-3 d-none d-md-block text-greey fa-2x"></i>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setActiveTab: (tab) => dispatch(setActiveTab(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
