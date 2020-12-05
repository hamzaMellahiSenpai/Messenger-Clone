import React, { Component } from "react";
// import { Emojis } from "./emojis/emojis";
import { setMsgText } from "../redux/messages/messages.actions";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectMsgText } from "../redux/messages/messages.selectors";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { selectCurrentContact } from "../redux/contacts/contacts.selectors";
import moment from "moment";
import { db, storage } from "../services/firebase";
import Emojis from "./emojis/emojis";

class SendMsgBox extends Component {
  state = {
    isLoading : false,
    showEmojis:false
  }
  async storeMessage(newMsg) {
    let { msgText, setMsgText } = this.props;
    this.setState({ writeError: null });
    try {
      await db.ref("messages").push(newMsg);
      setMsgText("");
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }
  uploadImgToStorage(image) {
    return storage.ref(`/images/${image.name}`).put(image);
  }
  getMessageUrl(uploadTask, fileName, callback) {
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        // console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(fileName)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            this.setState({ isLoading: false });
            console.log("url", fireBaseUrl)
            callback(fireBaseUrl);
          });
      }
    );
  }
  uploadImg = (e) => {
    let image = e.target.files[0];
    if (image == null)
      return;
    let input = e.target;
    var reader = new FileReader();
    // let srcInDevice;
    // reader.onload = function(e) {
    //   srcInDevice = e.target.result;
    //   document.querySelector("#test").setAttribute("src",  src);
    // }
    
    // reader.readAsDataURL(input.files[0]);
    // this.sendMessage(srcInDevice, isTemp);R
    let fileName = image.name;
    this.setState({ isLoading: true });
    let uploadTask = this.uploadImgToStorage(image);
    this.getMessageUrl(uploadTask, fileName, this.sendMessage);
  };
  sendMessage = (fileUrl = null) => {
    let { msgText, currentUser, currentContact } = this.props;
    if (msgText === "" && fileUrl == null) return;
    let isFile = fileUrl != null;
    let newMsg = {
      id: Math.floor(Math.random() * 10000000),
      sender: currentUser.uid,
      body: !isFile? msgText : fileUrl,
      time: moment().format("llll"),
      status: 2,
      recvId: currentContact.uid,
      recvIsGroup: false,
      isFile
    };
    console.log("msg", newMsg);
    this.storeMessage(newMsg);
  };
  handleMessageChanged = (e) => {
    let { setMsgText } = this.props;
    e.preventDefault();
    let msgText = e.currentTarget.value;
    setMsgText(msgText);
  };
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };
  toggleShowEmojis = (e) => {
    e.preventDefault();
    let {showEmojis} = this.state;
    this.setState({showEmojis : !showEmojis})
  }
  render() {
    let {isLoading, showEmojis} = this.state;
    let { msgText } = this.props;
    return (
      <div
        
      >
        <div className="d-flex justify-self-end align-items-center flex-row"
        id="input-area">
        {isLoading ? "loaading" : null}
        <span
          className="myClass"
          style={{ float: "left", paddingRight: "5px" }}
        >
          {" "}
        </span>

        <a href="/#" onClick={this.toggleShowEmojis}>
          <i
            className="far fa-smile text-muted px-3"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </a>
        <input
          type="text"
          name="message"
          id="input"
          placeholder="Type a message"
          className="flex-grow-1 border-0 px-3 py-2 my-3 rounded shadow-sm"
          onChange={this.handleMessageChanged}
          onKeyUp={this.handleKeyPress}
          value={msgText}
          autoComplete="off"
        />
        <input type="file" id="upload-btn" hidden onChange={this.uploadImg}/>
        <label
          htmlFor="upload-btn"
          style={{ marginBottom: "0.5rem!important" }}

        >
          <i
            className="fa-2x fas fa-image text-muted px-3"
            style={{ cursor: "pointer" }}
            htmlFor="upload-btn"
          ></i>
        </label>
        {/* <img id="test"/> */}
        <i
          className="fa-2x fas fa-paper-plane text-muted px-3"
          style={{ cursor: "pointer" }}
          onClick={this.sendMessage}
        ></i>
        </div>
        <Emojis showEmojis={showEmojis}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setMsgText: (msg) => dispatch(setMsgText(msg))
});

const mapStateToProps = createStructuredSelector({
  msgText: selectMsgText,
  currentUser: selectCurrentUser,
  currentContact: selectCurrentContact
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMsgBox);
