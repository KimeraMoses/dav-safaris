import classes from "./ContactUs.module.css";
import React, { useEffect, useState } from "react";
import Image from "../../assets/contact-us.jpeg";
import Operator from "../../assets/davLogo.png";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import { Button, Paper, TextField } from "@material-ui/core";
import ContactUsForm from "../Tours/SingleTour/Bookings/ContactUsForm";
import { EmailOutlined } from "@material-ui/icons";
import OfficeIcon from "@material-ui/icons/QueryBuilder";
import SocialMedia from "./SocialMedia";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import SEO from "../../containers/SEO/SEO";
import { DAV_APIS } from "../../Adapter";
import { toast } from "react-toastify";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const message = useSelector((state) => state.message.message);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setError("");
  };
  const NewsLetterFormSubmit = async (e) => {
    e.preventDefault();
    if (email.length < 1) {
      return setError("Email required");
    }

    if (email !== "undefined") {
      setError("");
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        setError("Please enter valid email address.");
      }
    }

    try {
      setIsLoading(true);
      setError("");
      await DAV_APIS.newsLetter({ email });

      setEmail("");
      toast.success("You have successfully subscribed to our Newsletter");
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      toast.error("Failed to subscribe to the newsletter");
      return setError("Failed to subscribe to the newsletter");
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Uganda Gorilla Trekking and Safari Holidays"
        description="If you are looking for Uganda Gorilla trekking and safari holidays, then please feel to contact us to know details about our tour facilities and tour options."
      />
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
          <p>Arrange your dream holiday at the comfort of your home</p>
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
                title="Location of Dav Safaris"
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
                <img src={Operator} alt="" />

                <p>
                  Start planning your trip by contacting one of our specialists
                  in your destination country
                </p>
              </div>
              <ul className={classes.dav__contact_country_expert_contact}>
                <li>
                  <a href="https://wa.link/0v0s1w">
                    <strong>
                      <span
                        className={classes.dav__contact_country_expert_contact}
                      >
                        +256757795781
                      </span>
                    </strong>
                  </a>
                </li>
                <li>
                  <a href="https://wa.link/barf5j">
                    <strong>
                      <span
                        className={classes.dav__contact_country_expert_contact}
                      >
                        +256701412430
                      </span>
                    </strong>
                  </a>
                </li>
              </ul>
            </div>
            <Paper className={classes.dav__payment_btn_wrapper}>
              <h5>Payment Portal</h5>
              <a
                href="https://payments.pesapal.com/davsafaris"
                className={classes.dav__payment_btn}
                target="_blank"
                rel="noreferrer"
              >
                Pay for Tours
              </a>
            </Paper>
          </div>
        </div>

        <div className={classes.dav__contact_us_form_wrapper}>
          <Paper className={classes.dav__contact_us_form}>
            <div className={classes.dav__contact_us_form_inner}>
              <ContactUsForm />
            </div>
            <div className={classes.dav__address_details}>
              <div className={classes.dav__phone_contacts}>
                <div className={classes.dav__phone_contacts_title}>
                  <OfficeIcon />
                  <h5>Office Hours</h5>
                </div>
                <div className={classes.dav__phone_contacts_content}>
                  <ul>
                    <li>
                      <span>Monday - Sunday: </span> <span> Open 24hours</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={classes.dav__address}>
                <div className={classes.dav__address_title}>
                  <RoomIcon />
                  <h5>Our Address</h5>
                </div>
                <div className={classes.dav__address_content}>
                  <p>
                    Freedom City Shopping Mall <br />
                    Entebbe Road, Uganda
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
                    <li>
                      Phone: <a href="https://wa.link/0v0s1w">+256757795781</a>
                    </li>
                    <li>
                      WhatsApp:{" "}
                      <a href="https://wa.link/barf5j">+256701412430</a>
                    </li>
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
                      <a href="mailto:info@davsafaris.com">
                        info@davsafaris.com
                      </a>
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
              <h5>Subscribe to our Newsletters</h5>
              <div className={classes.dav__newsletter_form_wrapper}>
                {message && (
                  <Alert
                    style={{ marginBottom: 5 }}
                    severity={message === "success" ? "success" : "error"}
                  >
                    {message === "success"
                      ? "You have successfully subscribed to our Newsletter"
                      : message}
                  </Alert>
                )}

                {error && (
                  <Alert style={{ marginBottom: 5 }} severity="error">
                    {error}
                  </Alert>
                )}
                <Form onSubmit={NewsLetterFormSubmit} style={{ marginTop: 10 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={classes.dav__subscribe_form_field}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </Form>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      <div className={classes.texteditor}>{/* <RichTextEditor /> */}</div>
    </>
  );
};

export default ContactUs;
