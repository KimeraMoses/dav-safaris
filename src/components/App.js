import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//===MUI IMPORTS===
import { Paper } from "@material-ui/core";

//===REDUX STORE IMPORTS===

//===COMPONENT IMPORTS===
import Home from "./HomePage/Home";
import BackToTop from "./BackToTop/BackToTop";
import AppBar from "./AppBar/AppBar";
import Theme from "./UI/Theme/Theme";
import "./App.css";
import Footer from "./Footer/Footer";
import LoginForm from "./Membership/LoginForm/LoginForm";
import RegisterForm from "./Membership/RegisterForm/RegisterForm";
import ResetPassword from "./Membership/PasswordReset/PasswordReset";
import ChangePassword from "./Membership/PasswordReset/ChangePassword";
import SingleTour from "./Tours/SingleTour/SingleTour";
import CountrySingle from "./CountryTours/CountrySingle";
import ChatNow from "./SendMessage/ChatNow/ChatNow";
import ContactUs from "./ContactUs/ContactUs";

const App = (props) => {
  return (
    <Theme>
      <Router>
        <Paper elevation={0} square>
          <AppBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<LoginForm />} />
            <Route path="/register" exact element={<RegisterForm />} />
            <Route path="/password-reset" exact element={<ResetPassword />} />
            <Route path="/change-password" exact element={<ChangePassword />} />
            <Route path="/contact-us" exact element={<ContactUs />} />
            <Route
              path="/tours/:countryName"
              exact
              element={<CountrySingle />}
            />
            <Route
              path="/tours/:countryName/:tourTitle"
              exact
              element={<SingleTour />}
            />
          </Routes>
          <ChatNow />
          <BackToTop />
          <Footer />
        </Paper>
      </Router>
    </Theme>
  );
};

export default App;
