import React, { Component } from "react";
import { connect } from "react-redux";

function Navbar({ currentUser }) {
  if (currentUser === null) return null;
  let { username, picUrl } = currentUser;
  return (
    <div className="row d-flex flex-row align-items-center p-2" id="navbar">
      <img
        alt="Profile"
        className="img-fluid mr-2"
        style={{ height: "60px", width: "60px" }}
        onClick={this.showProfileSettings}
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
          <a className="dropdown-item" href="/#">
            Settings
          </a>
          <a className="dropdown-item" href="/#" onClick={this.singOut}>
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

export default connect(mapStateToProps)(Navbar);
