import { Route, Redirect } from "react-router-dom";
import React from "react";
import { auth } from "../services/firebase";

export function PublicRoute({ component: Component, authenticated, path }) {
  console.log(path);
  return (
    <Route
      path={path}
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
  console.log(authenticated)
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
