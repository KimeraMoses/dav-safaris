import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SectionTitle from "../HomePage/SectionTitle/SectionTitle";
import TourCardSkeleton from "../Tours/TourCardSkeleton";
import UpdateCard from "./UpdateCard";
import SEO from "../../containers/SEO/SEO";
import classes from "./Updates.module.css";

const Updates = (props) => {
  const isLoading = useSelector((state) => state.tours.isLoading);
  const Posts = useSelector((state) => state.post.posts);
  const { isPostPage } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO title="Uganda Safari Tour Packages, African Safaris, Wildlife Safari Tour" />
      <Container fluid className={classes.dav__updates_wrapper}>
        <SectionTitle subTitle="stay updated with" Title="Safari Updates" />
        <Row className={classes.dav__updates_row_wrapper}>
          {isLoading
            ? [...Array(15).keys()].map((index) => {
                return (
                  <Col
                    key={index}
                    lg={3}
                    sm={12}
                    className={classes.dav__updates_card_wrapper}
                  >
                    <TourCardSkeleton />
                  </Col>
                );
              })
            : Posts &&
              Posts.slice(...(isPostPage ? [0] : [0, 12])).map((post) => {
                return (
                  <Col
                    key={post.id}
                    lg={3}
                    sm={12}
                    className={classes.dav__updates_card_wrapper}
                  >
                    <UpdateCard Post={post} />
                  </Col>
                );
              })}
        </Row>
        {!isPostPage && (
          <div className={classes.dav__more_updates_btn_wrapper}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/safari-updates"
            >
              Load More...
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Updates;
