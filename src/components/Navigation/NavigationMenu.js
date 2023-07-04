import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import classes from "./NavigationMenu.module.css";
import { Col, Row } from "react-bootstrap";
import { ArrowDropDown } from "@material-ui/icons";
// import { fetchAllCountrys } from "../../store/Actions/CountryActions";
// import { useSelector, useDispatch } from "react-redux";
// import { selectAllCountries } from "../../store/Slices/countrySlice";
import { useAllCountries } from "../../hooks";

const NavigationMenu = (props) => {
  const { countries } = useAllCountries();
  const { menuOpen, setMenuOpen } = props;
  // const fetchedCountries = useSelector(selectAllCountries);
  // const dispatch = useDispatch();
  // const [allCountries, setAllCountries] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState({});
  useEffect(() => {
    setDropDownOpen(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownOpen]);

  const NavMenuItem = ({ itemTitle, itemLink, ...props }) => {
    return (
      <li
        className={props.class}
        onClick={() => setMenuOpen(false)}
        // onMouseEnter={props.MouseEnter}
        // onMouseLeave={props.MouseLeave}
      >
        <NavLink
          to={itemLink}
          className={({ isActive }) =>
            classes.nav_link + (isActive ? ` ${classes.active}` : "")
          }
        >
          {itemTitle} {itemTitle === "Other Destinations" && <ArrowDropDown />}
        </NavLink>
        {props.children}
      </li>
    );
  };

  const closeDropDown = () => setDropDownOpen(false);

  const hoverHandler = (e) => {
    setIsHovered(true);
    setHoveredCountry(
      countries?.filter((country) => country.name === e.target.innerText)[0]
    );
  };
  const mouseLeaveHandler = () => setIsHovered(false);
  // console.log(hoveredCountry);

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
        <NavMenuItem
          class={classes.more}
          itemLink="/more-safaris"
          itemTitle="Other Destinations"
        >
          {dropDownOpen && (
            <div className={classes.dav__dropdown_wrapper}>
              <Row className={classes.dav_dropdown}>
                <Col lg={8} md={6} sm={4} xs={12}>
                  <Row>
                    {countries?.slice(4).map((country) => (
                      <Col
                        lg={3}
                        md={6}
                        sm={6}
                        xs={6}
                        key={country.id}
                        onClick={closeDropDown}
                      >
                        <NavMenuItem
                          key={country.id}
                          itemTitle={country.name}
                          itemLink={country.slug}
                          MouseEnter={hoverHandler}
                          MouseLeave={mouseLeaveHandler}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>

                <Col
                  className={classes.dropdown_slider}
                  lg={4}
                  md={6}
                  sm={3}
                  xs={0}
                >
                  {countries?.length > 0 && isHovered ? (
                    <Link to={hoveredCountry.slug} key={hoveredCountry.id}>
                      <div
                        className={classes.dropdown_slide}
                        style={{
                          backgroundImage: `url(${hoveredCountry.countryImage})`,
                          backgroundPosition: "center center",
                          backgroundSize: "cover",
                        }}
                      >
                        <span>
                          <h2>{hoveredCountry.name}</h2>
                        </span>
                        <div className={classes.dropdown_slide__paragraph}>
                          <p>{`${hoveredCountry.description.substring(
                            4,
                            65
                          )}...`}</p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Slide easing="ease" arrows={false} duration={2000}>
                      {countries?.slice(4).map((country) => (
                        <Link to={country.slug} key={country.id}>
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
                              <p>{`${country.description.substring(
                                4,
                                65
                              )}...`}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </Slide>
                  )}
                  {/* <Slide easing="ease" arrows={false} duration={2000}>
                  {allCountries?.map((country) => (
                    <Link to={country.slug} key={country.id}>
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
                          <p>{`${country.description.substring(4, 65)}...`}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Slide> */}
                </Col>
              </Row>
            </div>
          )}
        </NavMenuItem>

        <NavMenuItem itemTitle="About Us" itemLink="/about-us" />
        <NavMenuItem itemTitle="Safari Updates" itemLink="/safari-updates" />
        <NavMenuItem itemTitle="Community" itemLink="/community-support" />
        <NavMenuItem itemTitle="Contact us" itemLink="/contact-us" />
      </ul>
    </div>
  );
};

export default NavigationMenu;
