import React from "react";
import { connect } from "react-redux";
import { setCurrentContact } from "../../redux/contacts/contacts.actions";
import {
  selectCurrentContact
} from "../../redux/contacts/contacts.selectors";
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
    // mx-4 m-2
    let className = 'chat-list-item text-black bold d-flex flex-row w-100 px-2 py-3 shadow-sm my-2'; 
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
         say Hi 
        </div>
      </div>
      <div className="flex-grow-1 text-right">
        <div className="small time">
        </div>
        <div className="badge bc-main text-white badge-pill small" id="unread-count">
          4
          
        </div>
      </div>
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
