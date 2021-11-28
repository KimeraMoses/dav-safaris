import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
//===MUI IMPORTS===
import { Paper } from "@material-ui/core";

//===REDUX STORE IMPORTS===

//===COMPONENT IMPORTS===
import Home from "./HomePage/Home";
import BackToTop from "./BackToTop/BackToTop";
import AppBar from "./AppBar/AppBar";
import Theme from "./UI/Theme/Theme";
import "./App.css";


const App = (props) => {

  return (
    <Theme>
      <Router>
          <Paper
            elevation={0}
            square
          >
            <AppBar />
            <Routes>
              <Route path="/" exact element={<Home />} />

            </Routes>
            <BackToTop />
          </Paper>
      </Router>
     </Theme>
  );
};

export default App;
