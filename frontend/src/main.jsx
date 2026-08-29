if (import.meta.env.PROD) {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
}

import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  Provider,
} from "react-redux";

import App from "./app/App.jsx";

import store from "./store/store.js";

import setupInterceptors from "./api/setupInterceptors.js";

import AuthBootstrap from "./features/auth/AuthBootstrap.jsx";

import "./index.css";


setupInterceptors();


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <BrowserRouter>

      <Provider store={store}>

        <AuthBootstrap>

          <App />

        </AuthBootstrap>

      </Provider>

    </BrowserRouter>

  </React.StrictMode>
);