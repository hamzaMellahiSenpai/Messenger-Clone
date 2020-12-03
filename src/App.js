import React, { Component } from "react";
import AuthPage from "./compenents/AuthPage";
import Chat from "./compenents/Chat";
import NotFound from "./compenents/NotFound";
import { Switch, Redirect } from "react-router-dom";
import { auth } from "./services/firebase";
import { PublicRoute, PrivateRoute } from "./utils/routing";
import { connect } from "react-redux";
import { secCurrentUser } from "./redux/user/user.actions";

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: false
    };
  }
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }
  render() {
    let { isLoading, isAuthenticated } = this.state;
    let appRoutes = [
      { path: "/Chat", component: Chat, is_public_route: false },
      { path: "/register", component: AuthPage, is_public_route: true },
      // { path: "/settings", component: Settings, is_public_route: false },
      { path: "/not-found", component: NotFound, is_public_route: true }
    ];
    return this.state.loading === true ? (
      <h2>Loading...</h2>
    ) : (
      <Switch>
        {/* <Route exact path="/" component={Home}></Route> */}
        <PrivateRoute
          path="/chat"
          authenticated={this.state.authenticated}
          component={Chat}
        ></PrivateRoute>
        <PublicRoute
          path="/Register"
          authenticated={this.state.authenticated}
          component={AuthPage}
        ></PublicRoute>
        
        <PublicRoute
          component={NotFound}
          key="notfound"
          path="/not-found"
          authenticated={isAuthenticated}
        />
        )
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  secCurrentUser: (user) => dispatch(secCurrentUser(user))
});
export default connect(null, mapDispatchToProps)(App);
