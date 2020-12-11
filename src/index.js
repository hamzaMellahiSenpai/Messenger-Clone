import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import {store} from "./redux/store.ts";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
