import React from "react";
import { connect } from "react-redux";
import { setCurrentContact } from "../../redux/contacts/contacts.actions";

function Contact(props) {
  let { contact, lastMsgHandler, setCurrentContact } = props;
  const getLastSeenTime = (time) => {
    var dateObj = new Date(time);
    var momentObj = moment(dateObj);
    var month = momentObj.format("M");
    var day = momentObj.format("D");
    return `${day}/${month}`;
  };
  return (
    <div
      className="chat-list-item d-flex flex-row w-100 p-2 border-bottom"
      key={contact.uid}
      onClick={() => setCurrentContact(contact)}
    >
      <img
        src={contact.picUrl}
        alt="Profile"
        className="img-fluid mr-2"
        style={{ height: "60px", width: "60px" }}
      />
      <div className="w-50">
        <div className="name">{contact.username}</div>
        <div className="small last-message">
          {/* {lastMsgHandler(contact.uid)} */}
          {/* say Hi */}
        </div>
      </div>
      <div className="flex-grow-1 text-right">
        <div className="small time">{/* {getLastSeenTime(contact.)} */}</div>
        <div className="badge badge-success badge-pill small" id="unread-count">
          4
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentContact: (contacts) => dispatch(setCurrentContact(contacts))
});

export default connect(null, mapDispatchToProps)(Contact);
