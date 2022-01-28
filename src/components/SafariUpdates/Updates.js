import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import UpdateCard from "./UpdateCard";
import classes from "./Updates.module.css";

const Updates = (props) => {
//   const isLoading = useSelector((state) => state.tours.isLoading);
  const isLoading = true;
  return (
    <Container fluid className={classes.dav__popular_tours_wrapper}>
      <Row className={classes.dav__popular_tours_row_wrapper}>
        {isLoading
          && [...Array(15).keys()].map((index) => {
              return (
                <Col
                  key={index}
                  lg={3}
                  sm={12}
                  className={classes.dav__popular_tour_card_wrapper}
                >
                  <UpdateCard />
                </Col>
              );
            })}
        
      </Row>
    </Container>
  );
};

export default Updates;


//   : Tours &&
        //     Tours.map((tour) => {
        //       return (
        //         <Col
        //           key={tour.id}
        //           lg={3}
        //           sm={12}
        //           className={classes.dav__popular_tour_card_wrapper}
        //         >
        //             <UpdateCard/>
        //         </Col>
        //       );
        //     })}