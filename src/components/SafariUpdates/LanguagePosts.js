import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NoPosts } from "../DashBoard/ManageUpdates/ManageUpdates";
import SectionTitle from "../HomePage/SectionTitle/SectionTitle";
import TourCardSkeleton from "../Tours/TourCardSkeleton";
import UpdateCard from "./UpdateCard";
import classes from "./Updates.module.css";
import usePosts from "../../hooks/usePosts";

const LanguagePosts = () => {
  const { posts, loading } = usePosts("language");
  useEffect(() => {
    window.scrollTo(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container fluid className={classes.dav__updates_wrapper}>
        <SectionTitle subTitle="stay upto date with" Title="Safari Updates" />
        <Row className={classes.dav__updates_row_wrapper}>
          {loading ? (
            [...Array(15).keys()].map((index) => {
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
          ) : posts?.length < 1 ? (
            <NoPosts type="langauge" />
          ) : (
            posts &&
            posts?.map((post) => {
              return (
                <Col
                  key={post.id}
                  lg={3}
                  sm={12}
                  className={classes.dav__updates_card_wrapper}
                >
                  <UpdateCard Post={post} isLanguage />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </>
  );
};

export default LanguagePosts;
