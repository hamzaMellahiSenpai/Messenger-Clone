import React, { Component } from "react";
import AuthPage from "./compenents/AuthPage";
import Chat from "./compenents/Chat";
import NotFound from "./compenents/NotFound";
import { Switch, Redirect } from "react-router-dom";
import { auth } from "./services/firebase";
import { PublicRoute, PrivateRoute } from "./utils/routing";
import { connect } from "react-redux";
import { secCurrentUser } from "./redux/user/user.actions";
import "emoji-mart/css/emoji-mart.css";

import { Picker } from "emoji-mart";
import VideoCall from "./compenents/VideoCall";
import LoadingScreen from "./compenents/loading-screen/loading-screen";
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
        isAuthenticated:user != null ? true : false,
        isLoading: false
      });
    });
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
    
    return (isLoading === true ? (
      <LoadingScreen/>
    ) : (
      <Switch>
        {/* <Route exact path="/" component={Home}></Route> */}
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
        )
        {/* <Redirect to="/not-found" /> */}
      </Switch>
    ));
    }
  //   return (
  //     <div>
  //       <Picker set="apple" />
  //       <Picker onSelect={this.addEmoji} />
  //       <Picker title="Pick your emoji…" emoji="point_up" />
  //       <Picker
  //         style={{ position: "absolute", bottom: "20px", right: "20px" }}
  //       />
  //       <Picker
  //         i18n={{
  //           search: "Recherche",
  //           categories: { search: "Résultats de recherche", recent: "Récents" }
  //         }}
  //       />
  //     </div>
  //   );
  // }
}

const mapDispatchToProps = (dispatch) => ({
  secCurrentUser: (user) => dispatch(secCurrentUser(user))
});
export default connect(null, mapDispatchToProps)(App);
