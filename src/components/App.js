import React, { useEffect } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//===MUI IMPORTS===
import { Paper } from "@material-ui/core";

//===REDUX STORE IMPORTS===
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Thanks from "./ContactUs/Thanks";
import DashBoard from "./DashBoard/DashBoard";
import DashBoardItem from "./DashBoard/DashboardMenuItems/DashBoardItem";
import ManageTours from "./DashBoard/ManageTours/ManageTours";
import { AutoAuthenticate } from "../store/Actions/AuthActions";
import { fetchAllTours } from "../store/Actions/TourActions";
import Tours from "./Tours/AllTours/Tours";
import Category from "./CountryTours/Category/Category";
import Terms from "../containers/PrivacyPolicies/Terms";
import Policies from "../containers/PrivacyPolicies/Policies";
import Updates from "./SafariUpdates/Updates";
import ManageUpdates from "./DashBoard/ManageUpdates/ManageUpdates";
import { fetchAllPosts } from "../store/Actions/PostActions";
import Update from "./SafariUpdates/SingleUpdate/Update";
import Feature from "./DashBoard/Feature";
import AboutUs from "./AboutUs/AboutUs";
import PrivacyPrompt from "../containers/PrivacyPolicies/PrivacyPrompt";

import ReactGA from "react-ga";
import { TRACKING_ID } from "../store";
import CommunityPage from "./CommunityPage/CommunityPage";
import { AgentDashboard } from "./DashBoard/Agent";
import EditTours from "./DashBoard/ManageTours/EditTours";
import EditPost from "./DashBoard/ManageUpdates/EditPost";
import LanguagePosts from "./SafariUpdates/LanguagePosts";
import ManageAgents from "./DashBoard/ManageAgents";
import { DAV_ROLES } from "../constants";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    AutoAuthenticate(dispatch);
    dispatch(fetchAllTours());
    dispatch(fetchAllPosts());

    //====SEND DATA TO GOOGLE ANALYTICS===
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [dispatch]);

  return (
    <Theme>
      <Router>
        <Paper elevation={0} square>
          <ToastContainer />
          <AppBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route
              path="/dashboard/*"
              element={
                isAuthenticated && user.role === DAV_ROLES.ADMIN ? (
                  <DashBoard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            >
              <Route path="user" element={<DashBoardItem />} />
              <Route path="manage-tours" element={<ManageTours />} />
              <Route path="manage-agents" element={<ManageAgents />} />
              <Route path="manage-tours/edit" element={<EditTours />} />
              <Route path="manage-safari-updates" element={<ManageUpdates />} />
              <Route path="manage-safari-updates/edit" element={<EditPost />} />
              <Route
                path="manage-bookings"
                element={<Feature Title="Manage Bookings" />}
              />
              <Route
                path="manage-subscribers"
                element={<Feature Title="Manage Mailing List" />}
              />
              <Route
                path="manage-users"
                element={<Feature Title="Manage Users" />}
              />
            </Route>
            <Route
              path="/login"
              exact
              element={
                isAuthenticated ? (
                  <Navigate
                    to={
                      user.role === DAV_ROLES.AGENT
                        ? "/agent-dashboard"
                        : "/dashboard/user"
                    }
                  />
                ) : (
                  <LoginForm />
                )
              }
            />
            <Route path="/register" exact element={<RegisterForm />} />
            <Route path="/password-reset" exact element={<ResetPassword />} />
            <Route path="/change-password" exact element={<ChangePassword />} />
            <Route path="/contact-us" exact element={<ContactUs />} />
            <Route path="/thank-you" exact element={<Thanks />} />
            <Route path="/about-us" exact element={<AboutUs />} />
            <Route
              path="/community-support"
              exact
              element={<CommunityPage />}
            />
            <Route path="/terms-of-services" exact element={<Terms />} />
            <Route path="/privacy-policies" exact element={<Policies />} />
            <Route path="/tours" exact element={<Tours />} />
            <Route
              path="/safari-updates"
              exact
              element={<Updates isPostPage={true} />}
            />
            <Route
              path="/safari-updates/languages"
              exact
              element={<LanguagePosts />}
            />
            <Route
              path="/safari-updates/languages/:postTitle"
              exact
              element={<Update type="language" />}
            />
            <Route
              path="/safari-updates/:postTitle"
              exact
              element={<Update />}
            />
            <Route path="/:countryName" exact element={<CountrySingle />} />
            <Route
              path="/:countryName/:tourCategory"
              exact
              element={<Category />}
            />
            <Route path="/tours/:tourTitle" exact element={<SingleTour />} />
          </Routes>
          <PrivacyPrompt />
          <ChatNow />
          <BackToTop />
          <Footer />
        </Paper>
      </Router>
    </Theme>
  );
};

export default App;
