import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

//===REDUX STORE IMPORTS===
import store from './store/index';

//===COMPONENT IMPORTS===
import App from "./components/App";
import "./components/UI/Theme/ThemeColors.css"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
