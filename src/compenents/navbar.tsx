import React from "react";
import { connect } from "react-redux";
import Peer from "peerjs";
import { useHistory } from "react-router-dom";
import "../../../public/utils/style.scss";
import { styles } from "./profileSettings.styles";

function Navbar({ currentContact }) {
  if (currentContact === null) return null;
  const history = useHistory();
  let { username, picUrl } = currentContact;
  console.log("yoo", currentContact);
  const makeVideoCall = (e) => {
    e.preventDefault();
     history.push("videoCall");
  }
  // async storeMessage(newMsg) {
  //     let { setMsgText } = this.props;
  //     // this.setState({ writeError: null });
  //     try {
  //       await db.ref("messages").push(newMsg);
  //       setMsgText("");
  //     } catch (error) {
  //       // this.setState({ writeError: error.message });
  //     }
  //   }
  // }
  return (
    <div
      className="row d-flex flex-row align-items-center p-3 m-0 w-100 shadow"
      id="navbar"
      style={styles.navbar}
    >
      <a href="/#">
        <img
          src={picUrl}
          alt="Profile "
          className="img-fluid mr-2"
          style={{ height: "50px", width: "50px" }}
          id="pic"
        />
      </a>
      <div className="d-flex flex-column">
        <div className=" font-weight-bold" id="name">
          {username}
        </div>
        {/* <div className="text-white small" id="details">
          {isGroup ? : null}
        </div> */}
      </div>
      <div className="d-flex flex-row align-items-center ml-auto text-grey">
        <a href="/#" onClick={makeVideoCall} className="text-grey">
          {/* <i className="fas fa-search mx-3  d-none d-md-block text-grey"></i> */}
          <i className="fas fa-phone mx-3  d-none d-md-block text-greey fa-2x"></i>
        </a>
        <a href="/#">
          <i className="fas fa-video mx-3 d-none d-md-block text-greey fa-2x"></i>
        </a>
        <a href="/#">
          <i className="fas fa-ellipsis-h mx-3 d-none d-md-block text-greey fa-2x"></i>
        </a>
      </div>
    </div>
  );
}

const mapStateToProps = ({ contacts: { currentContact } }) => ({
  currentContact
});

export default connect(mapStateToProps)(Navbar);
