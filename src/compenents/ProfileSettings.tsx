import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { storage, db } from "../services/firebase";
import { setCurrentUser, toggleProfile } from "../redux/user/user.actions";
import { styles } from "./profileSettings.styles";

class ProfileSettings extends Component {
  state = {
    url: "",
    isLoading: false
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  componentDidMount = () => {
    let { username, email, picUrl, number } = this.props.currentUser;
    this.setState({ url: picUrl });
  };
  updateUserData = (picUrl) => {
    let { currentUser } = this.props;
    let { username, email, phoneNumber, uid, key } = currentUser;
    console.log("users/" + key);
    db.ref("users/" + key).set({
      username,
      email,
      phoneNumber,
      uid,
      picUrl
    });
    currentUser.picUrl = picUrl;
    // console.log(picUrl);
    this.setState({ url: picUrl });
    setCurrentUser(currentUser);
    console.log(picUrl);
  };
  handleImageAsFile = (e) => {
    this.setState({ isLoading: true });
    const image = e.target.files[0];
    // setImageAsFile(imageFile => (image))
    console.log(image);
    let { key } = this.props.currentUser;
    const uploadTask = storage.ref(`/images/${key}`).put(image);
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
          .child(key)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            this.setState({ isLoading: false });
            this.updateUserData(fireBaseUrl);
          });
      }
    );
  };
  render() {
    // let { currentUser } = this.props;
    // let { username, picUrl, bio } = this.props.currentUser;
    let { currentUser, toggleProfile } = this.props;
    if (currentUser === null) return null;
    let { username, email, picUrl, phoneNumber } = currentUser;
    let { isLoading } = this.state;
    // this.setState({ url: picUrl });
    // u = picUrl;
    // this.state
    return (
      <div
        className="col-12 col-sm-5 col-md-4 d-flex flex-column"
        id="chat-list-area"
        style={{ position: "relative" }}
      >
        <div
          className="row d-flex flex-row align-items-center p-2 m-0 text-white"
          style={{ background: "#ec4357" }} // # ll
        >
          <i
            className="fas fa-arrow-left p-2 mx-3 my-1 "
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={toggleProfile}
          ></i>
          <div className=" font-weight-bold">Profile</div>
        </div>
        <div className="" style={{ background: "#F1F4F8"}}>
          <div
            // style={styles.overlay}
            className=" rounded-circle my-5 justify-self-center mx-auto"
          >
            <div
              className="row h-100 justify-content-center align-items-center"
              // style={{ background: "rgba(0,0,0,0.7)" }}
            >
              <img
                alt="Profile"
                className="img-fluid rounded-circle"
                id="profile-pic"
                src={this.state.url}
              />
              <input
                type="file"
                id="profile-pic-input"
                // className="d-none"
                // value="fk"
                onChange={this.handleImageAsFile}
                readOnly
                hidden
              />
              <label htmlFor="profile-pic-input">Upload</label>
            </div>
          </div>
          {isLoading ? <h2>is loading...</h2> : null}
          <div className=" px-3 py-2">
            <div className="text-muted mb-1">
              <label htmlFor="input-name">Your Name</label>
            </div>
            <input
              type="text"
              name="name"
              id="input-name"
              readOnly
              className="w-100 border-0 py-2 profile-input inherit-bc"
              value={username}
            />
          </div>
          <div className=" px-3 ">
            <div className="text-muted mb-1">
              <label htmlFor="input-name">Your Number</label>
            </div>
            <input
              type="text"
              name="number"
              id="input-name"
              readOnly
              className="w-100 border-0 py-2 profile-input inherit-bc"
              value={phoneNumber}
            />
          </div>
          <div className=" px-3 py-2">
            <div className="text-muted mb-1">
              <label htmlFor="input-about">Email</label>
            </div>
            <input
              type="text"
              name="email"
              id="input-about"
              value={email}
              readOnly
              className="w-100 border-0 py-2 profile-input inherit-bc"
            />
          </div>
        <div className=" px-3 py-2">
          <div className="text-muted mb-1">
            <label htmlFor="input-about">Bio</label>
          </div>
          <input
            type="text"
            name="bio"
            id="input-about"
            value="bla bla"
            readOnly
            className="w-100 border-0 py-2 profile-input inherit-bc"
          />
        </div>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = ({ user: { currentUser } }) => ({
//   currentUser
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  toggleProfile: () => dispatch(toggleProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
