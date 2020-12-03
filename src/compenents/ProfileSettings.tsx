import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { storage, db } from "../services/firebase";
import { setCurrentUser } from "../redux/user/user.actions";

class ProfileSettings extends Component {
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  updateUserData = (picUrl) => {
    let { currentUser } = this.props;
    let { username, email, number, uid, key } = currentUser;
    console.log(key);
    // db.ref("users/" + key).set({
    //   username,
    //   email,
    //   number,
    //   uid,
    //   picUrl
    // });
    // currentUser.picUrl = picUrl;
    // setCurrentUser(currentUser);
  };
  handleImageAsFile = (e) => {
    const image = e.target.files[0];
    // setImageAsFile(imageFile => (image))
    console.log(image);
    // const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    // uploadTask.on(
    //   "state_changed",
    //   (snapShot) => {
    //     //takes a snap shot of the process as it is happening
    //     // console.log(snapShot);
    //   },
    //   (err) => {
    //     //catches the errors
    //     console.log(err);
    //   },
    //   () => {
    //     // gets the functions from storage refences the image storage in firebase by the children
    //     // gets the download url then sets the image from firebase as the value for the imgUrl key:
    //     storage
    //       .ref("images")
    //       .child(image.name)
    //       .getDownloadURL()
    //       .then((fireBaseUrl) => {
    //         // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
    //         const url = (prevObject) => ({
    //           ...prevObject,
    //           imgUrl: fireBaseUrl
    //         });
    //         console.log("ss", url);
    //         this.updateUserData(url);
    //       });
      // }
    // );
  };
  render() {
    // let { currentUser } = this.props;
    // let { username, picUrl, bio } = this.props.currentUser;
    let { currentUser } = this.props;
    if (currentUser === null) return null;
    let { username, email, picUrl, number } = currentUser;
    // u = picUrl;
    // this.state
    return (
      <div
        className="col-12 col-sm-5 col-md-4 d-flex flex-column"
        id="chat-list-area"
        style={{ position: "relative" }}
      >
        <div
          className="row d-flex flex-row align-items-center p-2 m-0"
          style={{ background: "#009688", minHeight: "65px" }} // # ll
        >
          <i
            className="fas fa-arrow-left p-2 mx-3 my-1 text-white"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            // onClick={this.hideProfileSettings}
          ></i>
          <div className="text-white font-weight-bold">Profile</div>
        </div>
        <div className="d-flex flex-column" style={{ overflow: "auto" }}>
          <img
            alt="Profile"
            className="img-fluid  my-5 justify-self-center mx-auto"
            id="profile-pic"
            src={picUrl}
            style={{ width: "300px", height: "300px" }}
          />
          <input
            type="file"
            id="profile-pic-input"
            // className="d-none"
            // value="fk"
            onChange={this.handleImageAsFile}
            readOnly
          />
          <div className="bg-white px-3 py-2">
            <div className="text-muted mb-1">
              <label htmlFor="input-name">Your Name</label>
            </div>
            <input
              type="text"
              name="name"
              id="input-name"
              readOnly
              className="w-100 border-0 py-2 profile-input"
              value={username}
            />
          </div>
          <div className="bg-white px-3 ">
            <div className="text-muted mb-1">
              <label htmlFor="input-name">Your Number</label>
            </div>
            <input
              type="text"
              name="number"
              id="input-name"
              readOnly
              className="w-100 border-0 py-2 profile-input"
              value={number}
            />
          </div>
          <div className="bg-white px-3 py-2">
            <div className="text-muted mb-1">
              <label htmlFor="input-about">Email</label>
            </div>
            <input
              type="text"
              name="email"
              id="input-about"
              value={email}
              readOnly
              className="w-100 border-0 py-2 profile-input"
            />
          </div>
        </div>
        <div className="bg-white px-3 py-2">
          <div className="text-muted mb-1">
            <label htmlFor="input-about">Bio</label>
          </div>
          <input
            type="text"
            name="name"
            id="input-about"
            value="bla bla"
            readOnly
            className="w-100 border-0 py-2 profile-input"
          />
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
export default connect(mapStateToProps)(ProfileSettings);
