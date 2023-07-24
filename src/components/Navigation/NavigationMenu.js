import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import classes from "./NavigationMenu.module.css";
import { Col, Row } from "react-bootstrap";

import { useAllCountries } from "../../hooks";
import { ArrowDropDown } from "@material-ui/icons";

const NavigationMenu = (props) => {
  const { countries } = useAllCountries();
  const { menuOpen, setMenuOpen } = props;
  const [dropDownOpen, setDropDownOpen] = useState(true);
  const slideShowRef = useRef();

  useEffect(() => {
    setDropDownOpen(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownOpen]);

  const NavMenuItem = ({ itemTitle, itemLink, id, ...props }) => {
    return (
      <li
        className={props.class}
        onClick={() => {
          setMenuOpen(false);
        }}
      >
        <NavLink
          to={itemLink}
          className={({ isActive }) =>
            classes.nav_link + (isActive ? ` ${classes.active}` : "")
          }
          id={id}
          onMouseEnter={(event) => {
            slideShowRef.current.goTo(parseInt(event.target?.id));
          }}
        >
          {itemTitle}
        </NavLink>
        {props.children}
      </li>
    );
  };

  const closeDropDown = () => {
    setDropDownOpen(false);
  };

  return (
    <div
      className={`${classes.dav__navbar_wrapper} ${
        menuOpen ? classes.menuOpen : ""
      }`}
    >
      <ul className={`${classes.nav_menu} ${menuOpen ? classes.active : ""}`}>
        <NavMenuItem itemTitle="Home" itemLink="/" />
        <NavMenuItem itemTitle="Uganda" itemLink="/uganda-safaris" />
        <NavMenuItem itemTitle="Kenya" itemLink="/kenya-safaris" />
        <NavMenuItem itemTitle="Tanzania" itemLink="/tanzania-safaris" />
        <NavMenuItem itemTitle="Rwanda" itemLink="/rwanda-safaris" />
        <li className={classes.more}>
          <span className={classes.nav_link}>
            Other Destinations <ArrowDropDown />
          </span>
          {dropDownOpen && (
            <div className={classes.dav__dropdown_wrapper}>
              <Row className={classes.dav_dropdown}>
                <Col lg={8} md={6} sm={7} xs={12}>
                  <Row>
                    {countries?.slice(4).map((country, index) => (
                      <Col
                        lg={3}
                        md={4}
                        sm={4}
                        xs={6}
                        key={index}
                        id={index}
                        onClick={closeDropDown}
                      >
                        <NavMenuItem
                          key={index}
                          id={index}
                          itemTitle={country.name}
                          itemLink={`/${country.slug}`}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>

                <Col
                  className={classes.dropdown_slider}
                  lg={4}
                  md={6}
                  sm={5}
                  xs={0}
                >
                  {countries?.length > 0 && (
                    <Slide
                      easing="ease"
                      arrows={false}
                      duration={2000}
                      ref={slideShowRef}
                      autoplay={true}
                    >
                      {countries?.slice(4).map((country, index) => (
                        <Link
                          to={`/${country.slug}`}
                          key={index}
                          onClick={closeDropDown}
                        >
                          <div
                            className={classes.dropdown_slide}
                            style={{
                              backgroundImage: `url(${country.countryImage})`,
                              backgroundPosition: "center center",
                              backgroundSize: "cover",
                            }}
                          >
                            <span>
                              <h2>{country.name}</h2>
                            </span>
                            <div className={classes.dropdown_slide__paragraph}>
                              <p>{`${country.summary.substring(0, 65)}...`}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </Slide>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </li>

        <NavMenuItem itemTitle="About Us" itemLink="/about-us" />
        <NavMenuItem itemTitle="Safari Updates" itemLink="/safari-updates" />
        <NavMenuItem itemTitle="Community" itemLink="/community-support" />
        <NavMenuItem itemTitle="Contact us" itemLink="/contact-us" />
      </ul>
    </div>
  );
};

export default NavigationMenu;
