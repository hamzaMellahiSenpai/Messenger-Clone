import { Route, Redirect } from "react-router-dom";
import React from "react";

export function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Chat" />
        )
      }
    />
  );
}

export function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/Register", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
