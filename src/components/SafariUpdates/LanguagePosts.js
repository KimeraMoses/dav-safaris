import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../store/Actions/PostActions";
import { NoPosts } from "../DashBoard/ManageUpdates/ManageUpdates";
import SectionTitle from "../HomePage/SectionTitle/SectionTitle";
import TourCardSkeleton from "../Tours/TourCardSkeleton";
import UpdateCard from "./UpdateCard";
import classes from "./Updates.module.css";

const LanguagePosts = () => {
  const isLoading = useSelector((state) => state.post.isLoading);
  const Posts = useSelector((state) => state.post.languagePosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPosts("language"));
    window.scrollTo(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container fluid className={classes.dav__updates_wrapper}>
        <SectionTitle subTitle="stay updated with" Title="Safari Updates" />
        <Row className={classes.dav__updates_row_wrapper}>
          {isLoading ? (
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
          ) : Posts?.length < 1 ? (
            <NoPosts type="langauge" />
          ) : (
            Posts &&
            Posts?.map((post) => {
              return (
                <Col
                  key={post.id}
                  lg={3}
                  sm={12}
                  className={classes.dav__updates_card_wrapper}
                >
                  <UpdateCard Post={post} language="language" />
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
