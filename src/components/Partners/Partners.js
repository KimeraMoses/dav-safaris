import React from 'react';
import classes from "./Partners.module.css";
import safariBooking from "../../assets/SafariBooking.png";
import TripAdvisor from "../../assets/TripAdvisor.png";
import touristlink from "../../assets/touristlink.png";
import utb from "../../assets/utb.png";
import uwa from "../../assets/UWA.png";

const Partners = () => {
  return (
      <div className={classes.dav__partners_wrapper}>
        <h4>Our Partners</h4>
        <div className={classes.dav__partners_wrapper_inner}>
          <a href='https://www.safaribookings.com/profile/p4664' target="_blank" ><img src={safariBooking} /></a>
          <a href='https://utb.go.ug/' target="_blank" ><img className={classes.dav__partners_utb} src={utb} /></a>
          <a href='https://www.tripadvisor.com/Attraction_Review-g293841-d20284280-Reviews-Dav_Safaris-Kampala_Central_Region.html' target="_blank" ><img src={TripAdvisor} /></a>
          <a href='https://www.touristlink.com/user/davsafaris.html?sereferer=036B5792' target="_blank" ><img src={touristlink} /></a>
          <a href='https://ugandawildlife.org/' target="_blank" ><img className={classes.dav__partners_uwa} src={uwa} /></a>
          </div>
      </div>
  );
};

export default Partners;
