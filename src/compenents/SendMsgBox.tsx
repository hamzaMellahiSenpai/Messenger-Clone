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


const styles = {
  input : {
    background:"#F1F4F8",
    borderRaduis:"20px"
  },
  sendIcon:{
    // background:"  linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
    cursor: "pointer",
    padding:"12px 12px",
    color:"white!important",
    border:0,
    // background:"white"
  },
  sendButton : {
    border:0,
    background:"white",    
  }
}

class SendMsgBox extends Component {
  state = {
    isLoading: false,
    showEmojis: false
  };
  async storeMessage(newMsg) {
    let { setMsgText } = this.props;
    // this.setState({ writeError: null });
    try {
      await db.ref("messages").push(newMsg);
      setMsgText("");
    } catch (error) {
      // this.setState({ writeError: error.message });
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
            console.log("url", fireBaseUrl);
            callback(fireBaseUrl);
          });
      }
    );
  }
  uploadImg = (e) => {
    let image = e.target.files[0];
    if (image == null) return;
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
      body: !isFile ? msgText : fileUrl,
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
    let { showEmojis } = this.state;
    this.setState({ showEmojis: !showEmojis });
  };
  render() {
    let { isLoading, showEmojis } = this.state;
    let { msgText } = this.props;
    return (
      <div>
        <div
          className="d-flex justify-self-end align-items-center flex-row p-3"
          id="input-area"
        >
          {isLoading ? "loaading" : null}
          <span
            className="myClass"
            style={{ float: "left", paddingRight: "5px" }}
          >
            {" "}
          </span>

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
            style={styles.input}
          />
          <a href="/#" onClick={this.toggleShowEmojis}>
            <i
              className="fa fa-4x fa-smile text-muted px-3"
              style={{ fontSize: "2.2rem" }}
            ></i>
          </a>
          <input type="file" id="upload-btn" hidden onChange={this.uploadImg} />

            <i
              className="fa-3x fas fa-image  px-3 text-greey "
              style={{ cursor: "pointer" }}
              htmlFor="upload-btn"
            ></i>
          {/* <img id="test"/> */}
          <button onClick={this.sendMessage} style={styles.sendButton}>
          <i
            className="fa-2x fas fa-paper-plane rounded-circle bc-fancy text-white"
            style={styles.sendIcon}
          ></i>
          </button>
        </div>
        <Emojis showEmojis={showEmojis} />
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
