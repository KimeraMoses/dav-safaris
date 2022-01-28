import classes from "./ContactUs.module.css";
import React, { useEffect } from "react";
import Image from "../../assets/background.webp";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import { Button, Paper, TextField } from "@material-ui/core";
import ContactUsForm from "../Tours/SingleTour/Bookings/ContactUsForm";
import { EmailOutlined } from "@material-ui/icons";
import SocialMedia from "./SocialMedia";
import { Form } from "react-bootstrap";
import NewsLetterForm from "./NewsLetterForm";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.dav__contact_us_page_wrapper}>
      <div
        className={classes.dav__contact_us_hero}
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>Start Planning your trip</h1>
        <p>Arrange your dream holiday at the confort of your home</p>
      </div>
      <div className={classes.dav__contact_info_wrapper}>
        <div className={classes.dav__safaries_contact_details}>
          <Paper className={classes.dav__map_wrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63836.2007796065!2d32.52453217189964!3d0.30294807489160197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbd3d665b4cc3%3A0xfef08716607fdea2!2sDav%20Safaris%20%7C%20Uganda%20Safaris%20%7C%20Gorilla%20Safaris%20%7C%20Gorilla%20and%20chimpanzee%20Trekking%20%7C%20Bwindi%20%7C%20Birdwatching%20Uganda%20%7C%20Uganda%20Holiday%20Tours!5e0!3m2!1sen!2sug!4v1639785386466!5m2!1sen!2sug"
              width="100%"
              height="450px"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </Paper>
        </div>
        <div className={classes.dav__office_arrangements_wrapper}>
          <div
            className={`${classes.dav__contact_country_expert_card} bg-light`}
          >
            <h3>
              Speak to an expert
              <br /> who's is there
            </h3>

            <div className={classes.specialist__text}>
              <img src={Image} />

              <p>
                Start planning your trip by contacting one of our specialists in
                your destination country
              </p>
            </div>
            <ul className={classes.dav__contact_country_expert_contact}>
              <li>
                <a href="tel:+256757795781">
                  <strong>
                    <span
                      className={classes.dav__contact_country_expert_contact}
                    >
                      +256757795781
                    </span>
                  </strong>
                </a>
              </li>
            </ul>
          </div>

          <div className={`${classes.dav__office_hours} bg-light`}>
            <h3>Office Hours</h3>
            <ul>
              <li>
                <strong>Monday - Friday:</strong>
                <span>8am to 6pm</span>
              </li>

              <li>
                <strong>Saturday: </strong>
                <span>9:30am to 4:30pm</span>
              </li>
              <li>
                <strong>Sunday: </strong>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={classes.dav__contact_us_form_wrapper}>
        <Paper className={classes.dav__contact_us_form}>
          <div className={classes.dav__contact_us_form_inner}>
            <ContactUsForm />
          </div>
          <div className={classes.dav__address_details}>
            <div className={classes.dav__address}>
              <div className={classes.dav__address_title}>
                <RoomIcon />
                <h5>Our Address</h5>
              </div>
              <div className={classes.dav__address_content}>
                <p>
                  Freedom City Shopping Mall
                  <br /> Entebbe Road, Uganda
                </p>
              </div>
            </div>
            <div className={classes.dav__phone_contacts}>
              <div className={classes.dav__phone_contacts_title}>
                <PhoneIcon />
                <h5>Our Contacts</h5>
              </div>
              <div className={classes.dav__phone_contacts_content}>
                <ul>
                  <li>Phone: +256757795781</li>
                  <li>WhatsApp: +256701412430</li>
                </ul>
              </div>
            </div>
            <div className={classes.dav__phone_contacts}>
              <div className={classes.dav__phone_contacts_title}>
                <EmailOutlined />
                <h5>Our Email Address</h5>
              </div>
              <div className={classes.dav__phone_contacts_content}>
                <ul>
                  <li>
                    <a href="mailto:info@davsafaris.com">info@davsafaris.com</a>
                  </li>
                  <li>
                    <a href="mailto:davsafaris@gmail.com">
                      davsafaris@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Paper>
        <div className={classes.dav__connect_wrapper}>
          <Paper className={classes.dav__contact_details}>
            <h5>Our Social Media Links</h5>
            <div className={classes.dav__social_media_btn_wrapper}>
              <SocialMedia />
            </div>
          </Paper>
          <Paper className={classes.dav__newsletter_wrapper}>
            {/* <NewsLetterForm/> */}
            <h5>Subscribe to our Newsletters</h5>
            <div className={classes.dav__newsletter_form_wrapper}>
              <Form>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="email"
                  required
                  placeholder="Email"
                  className={classes.dav__subscribe_form_field}
                />
                <Button variant="outlined" color="primary" type="submit">
                  Subscribe
                </Button>
              </Form>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
