import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./styles.module.css";
import { useEffect } from "react";
import TourCard from "../../../Tours/TourCard";
import TourCardSkeleton from "../../../Tours/TourCardSkeleton";
import {
  useAllTours,
  useCountryTours,
  useAllCountries,
} from "../../../../hooks";

import { useState } from "react";
import LogOutButton from "../../../Membership/Logout/Logout";
import { Skeleton } from "@material-ui/lab";

function getGreeting(name) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return `${greeting}, ${name}`;
}

const AgentDashboard = () => {
  const { tours, isLoading } = useAllTours();
  const [country, setCountry] = useState("");
  const { countryTours, isLoading: countyTourIsLoading } =
    useCountryTours(country);
  const { countries } = useAllCountries();
  console.log(countryTours);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterTours = () => {
    if (!country) return tours;
    const filteredTours = countryTours;
    return filteredTours;
  };

  return (
    <div className={classes.dav__agent_dashboard_wrapper}>
      <div className={classes.dav_agent_details_wrapper}>
        <div className={classes.dav_agent_details_inner}>
          <h2>{getGreeting(user.username)}</h2>
          <p>
            Take a look at our exciting tours with their prices and advise our
            clients accordingly
          </p>
          <div className="mt-2">
            Not {user?.username}? <LogOutButton />
          </div>
        </div>
      </div>
      <div className={classes.dav__agent_country_cards_section}>
        <h4>Filter packages by Country</h4>
        <div className={classes.dav__agent_country_cards_wrapper}>
          {countries.map((c) => {
            return (
              <div
                onClick={() => setCountry(c.name)}
                key={c.name}
                className={classes.dav__country_card}
                style={{
                  borderBottom:
                    c.name.toLowerCase() === country.toLowerCase()
                      ? "3px solid #f15d30"
                      : "none",
                }}
              >
                <img src={c.countryImage} alt={c.name} />
                <h5>{c.name}</h5>
              </div>
            );
          })}
        </div>
      </div>

      <div className={classes.dav_agent_dashboard_content_wrapper}>
        {countyTourIsLoading ? (
          <Skeleton variant="rectangular"></Skeleton>
        ) : (
          <h4>
            {filterTours().length > 1
              ? country
                ? `Filtered results for ${country}`
                : "All tours"
              : "No tours found!"}

            {filterTours().length > 1 && (
              <span className={classes.dav_country_package_count}>
                {filterTours().length}
              </span>
            )}
          </h4>
        )}
        <Container fluid className={classes.dav__tours_wrapper}>
          <Row className={classes.dav__popular_tours_row_wrapper}>
            {isLoading
              ? [...Array(15).keys()].map((index) => {
                  return (
                    <Col
                      key={index}
                      lg={3}
                      sm={12}
                      className={classes.dav__popular_tour_card_wrapper}
                    >
                      <TourCardSkeleton />
                    </Col>
                  );
                })
              : filterTours().length > 1 &&
                filterTours().map((tour) => {
                  return (
                    <Col
                      key={tour.id}
                      lg={3}
                      sm={12}
                      className={classes.dav__popular_tour_card_wrapper}
                    >
                      <TourCard tour={tour} />
                    </Col>
                  );
                })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AgentDashboard;
