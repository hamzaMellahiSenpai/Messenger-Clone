import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { storage, db } from "../../services/firebase";
import { setCurrentUser, setActiveTab } from "../../redux/user/user.actions";
// import { styles } from "./profile.styles";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import { InlineInputEdit } from "react-inline-input-edit";
import firebase from "firebase";

const UploadLabel = styled.label`
  position: absolute;
  color: white;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 94%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  margin-left: 3%;
  :hover {
    opacity: 1;
  }
`;

const CustomImg = styled.img`
  width: 100%;

  /* width: 100%;
    height: 100%;
    position:relative; */
`;

class Profile extends Component {
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
    let { picUrl } = this.props.currentUser;
    this.setState({ url: picUrl });
  };
  _handleFocus = (text: any) => {
    console.log("Focused with text: " + text);
  };

  _handleFocusOut = (value: any, name) => {
    console.log("Left editor with text: " + value);
    if (value == "") return;
    this.updateUserData(name, value);
  };
  updateUserData = (field, value) => {
    let { currentUser } = this.props;
    currentUser[field] = value;
    db.ref("users/" + currentUser.key).set(currentUser);
    if (field === "picUrl") this.setState({ url: value });
    setCurrentUser(currentUser);
    console.log(field, value);
    if (field == "email") {
      let user = firebase.auth().currentUser;
      if (user) {
        user
          .updateProfile({
            email: value
          })
          .then(function () {
            console.log("yoo");
          });
      }
    }
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
            this.updateUserData("picUrl", fireBaseUrl);
          });
      }
    );
  };
  doStmg = (e) => {
    console.log(e);
  };
  render() {
    // let { currentUser } = this.props;
    // let { username, picUrl, bio } = this.props.currentUser;
    let { currentUser, setActiveTab } = this.props;
    if (currentUser === null) return null;
    let { username, email, picUrl, phoneNumber, bio } = currentUser;
    let { isLoading, url } = this.state;
    // this.setState({ url: picUrl });
    // u = picUrl;
    // this.state
    return (
      <div className="" id="chat-list-area" style={{ position: "relative" }}>
        <div className="" style={{ background: "#F1F4F8" }}>
          <div className="col-md-11 my-4 mx-auto">
            <CustomImg
              alt="Profile"
              className="img-fluid rounded-circle"
              src={url}
            />
            <input
              type="file"
              id="profile-pic-input"
              onChange={this.handleImageAsFile}
              readOnly
              hidden
            />
            <Overlay className="overlay">
              <UploadLabel htmlFor="profile-pic-input">
                Upload
                <i className="fas text-white fa-camera mx-3 d-none d-md-block text-greey fa-2x"></i>
              </UploadLabel>
            </Overlay>
          </div>
          {isLoading ? <h2>is loading...</h2> : null}
          <div className="px-3 py-1 text-muted">
            <div className="text-muted">
              <label htmlFor="input-about">Email</label>
            </div>
            <InlineInputEdit
              text={username}
              name="username"
              className="border-0 py-2 profile-input inherit-bc"
              inputMaxLength={50}
              inputPlaceHolder="username"
              onFocus={this._handleFocus}
              onFocusOut={(text: string) => {
                this._handleFocusOut(text, "username");
              }}
              labelPlaceHolder="name"
              emptyEdit={username}
              inputClassName="form-control"
              labelClassName="text-dark"
            />
          </div>
          <div className="px-3 py-1 text-muted">
            <div className="text-muted">
              <label htmlFor="input-about">Number</label>
            </div>
            <InlineInputEdit
              text={phoneNumber}
              name="phoneNumber"
              className="border-0 py-2 profile-input inherit-bc"
              inputMaxLength={50}
              inputPlaceHolder="phone Number"
              onFocus={this._handleFocus}
              onFocusOut={(text: string) => {
                this._handleFocusOut(text, "phoneNumber");
              }}
              labelPlaceHolder="name"
              emptyEdit="phoneNumber"
              inputClassName="text-dark"
              labelClassName="text-dark"
            />
          </div>
          <div className=" px-3 py-2">
            <div className="text-muted mb-1">
              <label htmlFor="input-about">Email</label>
            </div>
            <InlineInputEdit
              text={email}
              name="email"
              className="border-0 py-2 profile-input inherit-bc"
              inputMaxLength={50}
              inputPlaceHolder="email"
              onFocus={this._handleFocus}
              onFocusOut={(text: string) => {
                this._handleFocusOut(text, "email");
              }}
              labelPlaceHolder="name"
              emptyEdit="email"
              inputClassName="text-dark"
              labelClassName="text-dark"
            />
          </div>
          <div className=" px-3 py-2">
            <div className="text-muted mb-1">
              <label htmlFor="input-about">Bio</label>
            </div>
            <InlineInputEdit
              text={bio}
              name="email"
              className="border-0 py-2 profile-input inherit-bc"
              inputMaxLength={50}
              inputPlaceHolder="email"
              onFocus={this._handleFocus}
              onFocusOut={(text: string) => {
                this._handleFocusOut(text, "bio");
              }}
              labelPlaceHolder="name"
              emptyEdit="biooo"
              inputClassName="text-dark"
              labelClassName="text-dark"
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
  setActiveTab: (tab) => dispatch(setActiveTab(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
