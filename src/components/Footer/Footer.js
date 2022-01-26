import { createSvgIcon } from "@material-ui/core";
import {
  EmailOutlined,
  Instagram,
  PhoneOutlined,
  RoomOutlined,
  Twitter,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/ArrowForward";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
export const Fb = createSvgIcon(
  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />,
  "Fb"
);

const Footer = () => {
  const Tours = useSelector((state) => state.tours.toursList);
  let getCurrentYear = new Date().getFullYear();
  return (
    <Container fluid className={classes.dav__footer}>
      <Row className={classes.dav__footer_top}>
        <Col
          lg={3}
          md={6}
          sm={6}
          className={classes.dav__footer_section_col_wrapper}
        >
          <div className={`${classes.dav__footer_section_title_wrapper}`}>
            <h5>About Us</h5>

            <p>
              Tours and Travel Agency based in Uganda rendering mountain gorilla
              Trekking experience, birding and wildlife safaris
            </p>
          </div>
        </Col>
        <Col
          lg={3}
          md={6}
          sm={6}
          className={classes.dav__footer_section_col_wrapper}
        >
          <div className={`${classes.dav__footer_section_title_wrapper}`}>
            <h5>Short Uganda Safaris</h5>

            <p>
              Dav safaris gives you freedom to schedule your own tours in any
              east african country at the time of your convinience
            </p>
          </div>
        </Col>
        <Col
          lg={3}
          md={6}
          sm={6}
          className={classes.dav__footer_section_col_wrapper}
        >
          <div className={`${classes.dav__footer_section_title_wrapper}`}>
            <h5>Popular Safaris</h5>

            <ul className={classes.dav__footer_safaris}>
              {Tours &&
                Tours.slice(0,3).map((tour) => {
                  return (
                    <li>
                      <Link to={`/tours/${tour.slug}`}>
                        <MenuIcon />{tour.name}
                      </Link>
                    </li>
                  );
                })}
              {/* <li>
                <a href="/">
                  <MenuIcon />3 days fly to Queen Elizabeth National Park
                  Safari.a
                </a>
              </li>
              <li>
                <a href="/">
                  <MenuIcon />3 Days Fly Tour Murchison National Park Safari
                </a>
              </li> */}
            </ul>
          </div>
        </Col>
        <Col
          lg={3}
          md={6}
          sm={6}
          className={classes.dav__footer_section_col_wrapper}
        >
          <div className={`${classes.dav__footer_section_title_wrapper}`}>
            <h5>Contact info</h5>

            <ul className={classes.dav__contact_info}>
              <li>
                <RoomOutlined /> Freedom City Shopping Mall Entebbe Road
              </li>
              <li>
                <PhoneOutlined />
                <a href="tel:+256701412430">+256701412430</a>{" "}
              </li>
              <li>
                <EmailOutlined />
                <a href="mailto:info@davsafaris.com">info@davsafaris.com</a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <div className={classes.dav__copyright_wrapper}>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div>
              <p>© {getCurrentYear} Dav Safaris. All Rights Reserved.</p>
            </div>
          </Col>
          <Col
            lg={6}
            md={6}
            sm={12}
            className={classes.dav__footer__menu_wrapper}
          >
            <div className={classes.dav__footer__menu}>
              <ul>
                <li>
                  <Link to="/login">Login/Register</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy</Link>
                </li>
              </ul>
            </div>
            <div className={classes.dav__footer_socials}>
              <a href="#">
                <Fb />
              </a>
              <a href="#">
                <Twitter />
              </a>
              <a href="#">
                <Instagram />
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Footer;
