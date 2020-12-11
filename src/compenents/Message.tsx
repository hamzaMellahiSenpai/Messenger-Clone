import React, { Component, useState } from "react";
import MessageOptions from "./MessageOptions";
import moment from "moment";
import { db } from "../services/firebase";
import Contact from "./ContactsArea/Contact";
import "animate.css";

const styles = {
  dropdown : {
    // color:"white",
    background:"transparent",
    border:0,
    positon:"absolute",
    left: "100%",
    top:0
  },
  // dropdown:hover {

  // }
  message : {
    //position : "absolute",
   // boxShadow: "0 9.31782px 18.6356px rgba(0,0,0,.2)!important",
  //  bottom:"0",
  }
}

class Message extends Component {
  // const [isMenuShown, showMenu] = useState(0);
  constructor(props) {
    super(props);
    this.state = {
      isMenuShown: false,
      isNewMessages:false
    };
  }
  getMsgBoxStyle(msg, userId) {
    let { isNewMessages } = this.state;
    let className = "row p-1 my-1 mx-3 rounded shadow-sm  animate__animated animate__backInUp ";
    // if (isNewMessages === true)
    //   className += " animate__animated animate__backInUp "
    if (msg.sender === userId) className += "self bc-main text-white align-self-end";
    else className += "bg-grey text-grey text-bold align-self-start";
    return className;
  }
  toggleMenu = (e) => {
    e.preventDefault();
    this.setState({ isMenuShown: !this.state.isMenuShown });
  };
  getDate(time) {
    var dateObj = new Date(time);
    var momentObj = moment(dateObj);
    var momentString = momentObj.format("LT");
    return momentString;
  }
  deleteMsg = (e) => {
    e.preventDefault();
    let { message: deletedmsg, messages } = this.props;
    db.ref("messages/"+ deletedmsg.key).remove();
    console.log(deletedmsg);
  };
  render() {
    let { message: msg, userId } = this.props;
    let { isMenuShown } = this.state;
    let msgBoxClass = this.getMsgBoxStyle(msg, userId);
    let date = this.getDate(msg.time);

    return (
      <div className={msgBoxClass} style={styles.message}>
        {/* {
          (msg.sender === userId) ? (
            <span className="dropdown p-0 m-0">
            <i className="fas fa-caret-down" id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={styles.dropdown}></i>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/#" onClick={this.deleteMsg}>
              Delete msg
            </a>
          </div>

        </span>
          ) : null
        } */}
      
        <div className="body m-1 mr-2">
          {msg.isFile !== undefined && msg.isFile === true ? (
            <img src={msg.body} alt="" height="130" width="200" />
          ) : (
            msg.body
          )}
        </div>
        <div
          className="time ml-auto small text-right flex-shrink-0 align-self-end"
          style={{ width: "75px" }}
        >
          {date}
        </div>
      </div>
    );
  }
}

// const styles={
//   message : {
//     background:#131c21
//   }
// }
export default Message;
