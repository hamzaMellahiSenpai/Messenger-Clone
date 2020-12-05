import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleProfile } from "../../redux/user/user.actions";
import firebase from "firebase";

function Navbar(props) {
  let { currentUser, toggleProfile } = props;
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
  const hideSettings = (e) => {
    e.preventDefault();
    toggleProfile();
  };
  return (
    <div className="row d-flex flex-row align-items-center " id="navbar">
      <img
        alt="Profile"
        className="img-fluid mr-2"
        style={{ height: "60px", width: "60px" }}
        // onClick={hideSettings}
        id="display-pic"
        src={picUrl}
      />
      <div className="text-white font-weight-bold">{username}</div>
      <div className="nav-item dropdown ml-auto">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="/#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-ellipsis-v text-white"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href="/#">
            New Group
          </a>
          <a className="dropdown-item" href="/#">
            Archived
          </a>
          <a className="dropdown-item" href="/#">
            Starred
          </a>
          <a className="dropdown-item" href="/#" onClick={hideSettings}>
            Profile
          </a>
          <a className="dropdown-item" href="/#" onClick={singOut}>
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

const mapDispatchToProps = (dispatch) => ({
  toggleProfile: () => dispatch(toggleProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
