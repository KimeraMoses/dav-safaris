import React, { useEffect } from "react";
import SafariTag from "@material-ui/icons/LocalOfferOutlined";
import DateIcon from "@material-ui/icons/DateRangeOutlined";
import { SingleHero } from "../../Tours/SingleTour/SingleTour";
import classes from "./Update.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPosts,
  fetchPostDetails,
} from "../../../store/Actions/PostActions";
import SEO from "../../../containers/SEO/SEO";
import UpdateCard from "../UpdateCard";

const Update = ({ type }) => {
  const Posts = useSelector((state) => state.post.posts);
  const languagePosts = useSelector((state) => state.post.languagePosts);
  const Post = useSelector((state) => state.post.post);
  const { postTitle } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPostDetails(postTitle, type));
    dispatch(fetchAllPosts(type === "language" ? "language" : ""));
    dispatch(fetchAllPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postTitle, dispatch]);

  const FormatedDate = (date) => {
    const PDate = new Date(date);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return PDate.toLocaleDateString("en-US", options);
  };
  const FIlteredPosts =
    type === "language"
      ? languagePosts?.filter((post) => post.slug !== postTitle)
      : Posts?.filter((post) => post.slug !== postTitle);

  return (
    <>
      {Post?.name && (
        <SEO
          title={`${Post && Post.name} - Dav Safaris`}
          description={Post && Post.post_content?.substr(0, 260)}
          keywords={Post && Post.key_words?.join()}
          image={Post && Post.postImage}
        />
      )}
      <div>
        <SingleHero title={Post && Post.name} image={Post && Post.postImage} />
        <Container fluid className={classes.dav__single_update_wrapper}>
          <Row style={{ alignItems: "flex-start" }}>
            <Col
              lg={9}
              sm={12}
              className={classes.dav__single_update_details_wrapper}
            >
              <div className={classes.dav__post_header}>
                <h1>{Post && Post.name}</h1>
                <div className={classes.dav__post_meta}>
                  <span className={classes.dav__date_posted}>
                    <DateIcon /> {FormatedDate(Post && Post.createdAt)}
                  </span>
                  <span className={classes.dav__safari_updates_tag}>
                    <SafariTag />{" "}
                    <Link to="/safari-updates">Safari Updates</Link>
                  </span>
                </div>
              </div>
              <div className={classes.dav__post_content_wrapper}>
                <div
                  className="dav__single_tour_description"
                  dangerouslySetInnerHTML={{
                    __html: Post && Post.post_content,
                  }}
                ></div>
                {Post &&
                  Post.post_blocks &&
                  Post.post_blocks.map((block, index) => {
                    return (
                      <div key={index}>
                        <h3>
                          <strong>{block.title}</strong>
                        </h3>
                        <div
                          className="dav__single_tour_description"
                          dangerouslySetInnerHTML={{
                            __html: block.description,
                          }}
                        ></div>
                      </div>
                    );
                  })}
              </div>
              {type === "language" && (
                <div style={{ margin: "20px 0" }}>
                  <div className={classes.dav__single_recent_title}>
                    <h1>Related Updates</h1>
                  </div>
                  <div className={classes.related_posts}>
                    {Posts?.slice()
                      ?.sort(() => Math.random() - 0.5)
                      ?.slice(0, 3)
                      ?.map((post) => (
                        <UpdateCard Post={post} />
                      ))}
                  </div>
                </div>
              )}
            </Col>
            <Col
              lg={3}
              sm={12}
              className={classes.dav__single_update_recent_posts_wrapper}
            >
              {FIlteredPosts?.length > 0 && (
                <>
                  <div className={classes.dav__single_recent_title}>
                    <h1>Recent Updates</h1>
                  </div>
                  <div className={classes.dav__single_recent_posts}>
                    <ul>
                      {FIlteredPosts &&
                        FIlteredPosts?.slice()
                          ?.sort((a, b) => {
                            return (
                              new Date(a.createdAt).getTime() -
                              new Date(b.createdAt).getTime()
                            );
                          })
                          .reverse()
                          .slice(0, 20)
                          .map((post) => {
                            return (
                              <li key={post.id}>
                                <Link
                                  to={
                                    type === "language"
                                      ? `/safari-updates/languages/${post.slug}`
                                      : `/safari-updates/${post.slug}`
                                  }
                                >
                                  {post.name}
                                </Link>
                                <div
                                  className={
                                    classes.dav__single_recent_posts_date
                                  }
                                >
                                  {FormatedDate(post.createdAt)}
                                </div>
                              </li>
                            );
                          })}
                    </ul>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Update;
