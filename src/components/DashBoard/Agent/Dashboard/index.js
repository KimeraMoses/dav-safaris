import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./styles.module.css";
import { useEffect } from "react";
import TourCard from "../../../Tours/TourCard";
import TourCardSkeleton from "../../../Tours/TourCardSkeleton";
import { useAllTours } from "../../../../hooks";

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

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.dav__agent_dashboard_wrapper}>
      <div className={classes.dav_agent_details_wrapper}>
        <div className={classes.dav_agent_details_inner}>
          <h2>{getGreeting(user.username)}</h2>
          <p>
            Take a look at our exciting tours with their prices and advise our
            clients accordingly
          </p>
        </div>
      </div>

      <div className={classes.dav_agent_dashboard_content_wrapper}>
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
              : tours.map((tour) => {
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
