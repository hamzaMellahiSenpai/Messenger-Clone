import React from "react";
import { connect } from "react-redux";
import { setCurrentContact } from "../..\redux\contacts/contacts.actions";
import {
  selectCurrentContact
} from "../..\redux\contacts/contacts.selectors";
import { createStructuredSelector } from "reselect";

function Contact({contact, setCurrentContact,currentContact }) {
  const getLastSeenTime = (time) => {
    var dateObj = new Date(time);
    var momentObj = moment(dateObj);
    var month = momentObj.format("M");
    var day = momentObj.format("D");
    return `${day}/${month}`;
  };
  const getClass = (contact, currentContact) =>
  {
    console.log("yoo", contact, currentContact)
    let className = 'chat-list-item text-white d-flex flex-row w-100 p-3'; 
    if (currentContact != null && contact.uid === currentContact.uid)
      className += " active-chat"
    return className;
  };
  let contacClass = getClass(contact, currentContact);
  return (
    <div
      className={contacClass}
      key={contact.uid}
      onClick={() => setCurrentContact(contact)}
      style={{ background: "#131c21!important", borderBottom:"0.1px solid #262d31"}}

    >
      <img
        src={contact.picUrl}
        alt="Profile"
        className="img-fluid mr-2 rounded-circle"
        style={{ height: "60px", width: "60px" }}
      />
      <div className="w-50">
        <div className="name">{contact.username}</div>
        <div className="small last-message">
          {/* {lastMsgHandler(contact.uid)} */}
          {/* say Hi */}
        </div>
      </div>
      {/* <div className="flex-grow-1 text-right">
        <div className="small time">{/* {getLastSeenTime(contact.)} </div>
        <div className="badge badge-success badge-pill small" id="unread-count">
          4
        </div>
      </div> */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentContact: (contacts) => dispatch(setCurrentContact(contacts))
});
const mapStateToProps = createStructuredSelector({
  currentContact: selectCurrentContact,
});
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
