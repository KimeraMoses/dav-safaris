import classes from "./ContactUs.module.css";
import React, { useEffect, useState } from "react";
import Image from "../../assets/background.webp";
import Operator from "../../assets/davLogo.png";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import { Button, Paper, TextField } from "@material-ui/core";
import ContactUsForm from "../Tours/SingleTour/Bookings/ContactUsForm";
import { EmailOutlined } from "@material-ui/icons";
import OfficeIcon from "@material-ui/icons/QueryBuilder";
import SocialMedia from "./SocialMedia";
import { Form } from "react-bootstrap";
import { NewsLetters } from "../../store/Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import SEO from "../../containers/SEO/SEO";

const Thanks = () => {
  return (
    <>
      <SEO
        title="Thank You"
        description="Thank You"
        keywords="African Safaris, Gorilla Safaris"
      />
       
          <div>
            <h2>Thanks For Contacting Us. Our Repersentative Will Contact You Shortly.</h2>
          </div>
    </>
  );
};

export default Thanks;
