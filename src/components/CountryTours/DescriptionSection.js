import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@material-ui/core";
import Expert from "../../assets/davLogo.png";
import classes from "./AboutCountry.module.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const AboutCountry = (props) => {
  const { countryName } = useParams();
  const { description } = props;
  return (
    <Container fluid className={classes.dav__country_tours_overall_wrapper}>
      <Row className={classes.dav__country_tours_wrapper}>
        <Col md={8} sm={12} className={classes.dav__about_country_section}>
          <p>{description}</p>
        </Col>
        <Col md={4} sm={12} className={classes.dav__contact_country_expert}>
          <div
            className={`${classes.dav__contact_country_expert_card} bg-light`}
          >
            <h2 className="h3">
              Speak to an expert
              <br /> who's is there
            </h2>

            <div className={classes.specialist__text}>
              <img src={Expert} alt="" />

              <p>
                Start planning your trip by contacting one of our{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {countryName.replace(/-/g, " ")}
                </span>{" "}
                specialists
              </p>
            </div>
            <ul className={classes.dav__contact_country_expert_contact_wrapper}>
              <li>
                <strong>
                  <span className={classes.dav__contact_country_expert_contact}>
                    <a href="tel:+256701412430">+256701412430</a>
                    <a href="tel:+256757795781">+256757795781</a>
                  </span>
                </strong>
              </li>
              <li>
                <Button
                  variant="contained"
                  color="primary"
                  className="w-100"
                  component={Link}
                  to="/contact-us"
                >
                  Make an enquiry
                </Button>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutCountry;
