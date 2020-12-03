import React from "react";
import { connect } from "react-redux";

function Navbar({ currentContact }) {
  if (currentContact === null) return null;
  let { username, picUrl } = currentContact;
  console.log("yoo", currentContact);
  return (
    <div
      className="row d-flex flex-row align-items-center p-2 m-0 w-100"
      id="navbar"
    >
      <div className="d-block d-sm-none">
        <i
          className="fas fa-arrow-left p-2 mr-2 text-white"
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
        ></i>
      </div>
      <a href="/#">
        <img
          src={picUrl}
          alt="Profile "
          className="img-fluid mr-2"
          style={{ height: "60px", width: "60px" }}
          id="pic"
        />
      </a>
      <div className="d-flex flex-column">
        <div className="text-white font-weight-bold" id="name">
          {username}
        </div>
        {/* <div className="text-white small" id="details">
          {isGroup ? : null}
        </div> */}
      </div>
      <div className="d-flex flex-row align-items-center ml-auto">
        <a href="/#">
          <i className="fas fa-search mx-3 text-white d-none d-md-block"></i>
        </a>
        <a href="/#">
          <i className="fas fa-paperclip mx-3 text-white d-none d-md-block"></i>
        </a>
        <a href="/#">
          <i className="fas fa-ellipsis-v mr-2 mx-sm-3 text-white"></i>
        </a>
      </div>
    </div>
  );
}

const mapStateToProps = ({ contacts: { currentContact } }) => ({
  currentContact
});

export default connect(mapStateToProps)(Navbar);
