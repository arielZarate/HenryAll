import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//redux
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
ReactDOM.render(
  /*   </React.StrictMode>, */
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
