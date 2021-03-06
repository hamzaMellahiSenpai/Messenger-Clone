import React, { Component } from "react";
import AuthPage from "./compenents/AuthPage.tsx";
import Chat from "./compenents/Chat.tsx";
import NotFound from "./compenents/NotFound.tsx";
import { Switch, Redirect } from "react-router-dom";
import { auth } from "./services/firebase.ts";
import { PublicRoute, PrivateRoute } from "./helpers/routings.tsx";
import { connect } from "react-redux";
import { secCurrentUser } from "./redux/user/user.actions.ts";
import "emoji-mart/css/emoji-mart.css";
import { db } from "./services/firebase";
import { Picker } from "emoji-mart";
import VideoCall from "./compenents/VideoCall.tsx";
import LoadingScreen from "./compenents/loading-screen/loading-screen.tsx";
// import loadingScreen from "./compenents/loading-screen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: true
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      this.setState({
        isAuthenticated: user != null ? true : false,
        isLoading: false
      });
      console.log("user", user);
      // if (!user) return;
      // db.ref("users")
      //   .orderByChild("uid")
      //   .equalTo(user.uid)
      //   .on("child_added", (snap) => {
      //     let user = snap.val();
      //     user.key = snap.key;
      //     let { username, email, phoneNumber, uid, key, picUrl } = user;
      //     //setCurrentUser(user);
      //     // if (1) return;
      //      const reference = db.ref(`/users/${key}`);
      //     reference.set({
      //       username,
      //       email,
      //       phoneNumber,
      //       uid,
      //       picUrl,
      //       isOnline:true
      //     }).then(() => console.log('Online presence set'))
      //   });
    });
    // if (Cu)
    // const reference = database().ref(`/users/user.key`);
    // reference.set(true).then(() => console.log('Online presence set'));
  }
  render() {
    let { isLoading, isAuthenticated } = this.state;
    let appRoutes = [
      { path: "/Chat", component: Chat, is_public_route: false },
      { path: "/register", component: AuthPage, is_public_route: true },
      // { path: "/VideoCall", component: VideoCall, is_public_route: false },
      // { path: "/settings", component: Settings, is_public_route: false },
      { path: "/not-found", component: NotFound, is_public_route: true }
    ];

    return isLoading === true ? (
      <LoadingScreen />
    ) : (
      <Switch>
        <PrivateRoute
          path="/chat"
          authenticated={isAuthenticated}
          component={Chat}
          // isLoading={loading}
        ></PrivateRoute>
        <PrivateRoute
          path="/VideoCall"
          authenticated={isAuthenticated}
          component={VideoCall}
        ></PrivateRoute>
        <PublicRoute
          path="/Register"
          authenticated={isAuthenticated}
          component={AuthPage}
        ></PublicRoute>
        {/* <PublicRoute
          component={NotFound}
          key="notfound"
          path="/not-found"
          authenticated={isAuthenticated}
        /> */}
        ){/* <Redirect to="/not-found" /> */}
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  secCurrentUser: (user) => dispatch(secCurrentUser(user))
});
export default connect(null, mapDispatchToProps)(App);
