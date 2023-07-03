import React, { useEffect } from "react";
import SafariTag from "@material-ui/icons/LocalOfferOutlined";
import DateIcon from "@material-ui/icons/DateRangeOutlined";
import { isEmptyObject, SingleHero } from "../../Tours/SingleTour/SingleTour";
import classes from "./Update.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import SEO from "../../../containers/SEO/SEO";
import UpdateCard from "../UpdateCard";
import usePost from "../../../hooks/usePost";
import usePosts from "../../../hooks/usePosts";
import { Skeleton } from "@material-ui/lab";

const defaultMeta = {
  title:
    "Best african Gorilla Safaris, Birding, Cultural Safaris and Mountain Climbing",
  description:
    "Africa Safari | Wildlife Safaris | Gorilla Trekking | Chimpanzee Trekking| Gorilla Trekking Uganda | Tanzania Safari | Kenya Safaris | Gorilla trekking Rwanda |African Wildlife Safari park | African Safari tours | trip advisor",
};

export const formattedDate = (date) => {
  const PDate = new Date(date);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return PDate.toLocaleDateString("en-US", options);
};

const Update = () => {
  const location = useLocation();

  const isLanguage = location.pathname.includes("languages");
  const { postTitle } = useParams();

  const { post, loading } = usePost(postTitle, isLanguage ? "language" : "");
  const { posts, loading: isLoadingPosts } = usePosts(
    isLanguage ? "language" : ""
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postTitle]);

  const FilteredPosts = posts?.filter((post) => post.slug !== postTitle);

  let title = isEmptyObject(post)
    ? defaultMeta.title
    : `${post?.name} - Dav Safaris`;

  let description = isEmptyObject(post)
    ? defaultMeta.description
    : post?.post_content?.substr(0, 268);

  if (postTitle === "best-places-to-visit-in-rwanda") {
    description =
      "If you are wandering the most visited places in Rwanda, Visit here and explore the best places to visit in Rwanda.";
  }

  return (
    <>
      {post?.name && (
        <SEO
          title={title}
          description={description}
          keywords={post && post.key_words?.join()}
          image={post && post.postImage}
        />
      )}
      <div>
        <SingleHero title={post && post.name} image={post && post.postImage} />
        <Container fluid className={classes.dav__single_update_wrapper}>
          <Row style={{ alignItems: "flex-start" }}>
            <Col
              lg={9}
              sm={12}
              className={classes.dav__single_update_details_wrapper}
            >
              {loading ? (
                <div
                  style={{
                    margin: "20px 0",
                  }}
                >
                  <h1>
                    <Skeleton width="100%" height={30}></Skeleton>
                  </h1>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      margin: "10px 0",
                    }}
                  >
                    <Skeleton width="20%" height={20}></Skeleton>
                    <Skeleton width="20%" height={20}></Skeleton>
                  </div>
                  <br />
                  <Skeleton width="100%" height={50}></Skeleton>
                  <br />
                  <Skeleton width="100%" height={50}></Skeleton>
                </div>
              ) : (
                <>
                  <div className={classes.dav__post_header}>
                    <h1>{post && post.name}</h1>

                    <div className={classes.dav__post_meta}>
                      <span className={classes.dav__date_posted}>
                        <DateIcon /> {formattedDate(post && post.createdAt)}
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
                        __html: post && post.post_content,
                      }}
                    ></div>
                    {post &&
                      post.post_blocks &&
                      post.post_blocks.map((block, index) => {
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
                </>
              )}
              {!isLoadingPosts && (
                <div style={{ margin: "20px 0" }}>
                  <div className={classes.dav__single_recent_title}>
                    <h1>Related Updates</h1>
                  </div>
                  <div className={classes.related_posts}>
                    {posts
                      ?.slice()
                      ?.sort(() => Math.random() - 0.5)
                      ?.slice(0, 3)
                      ?.map((post) => (
                        <UpdateCard Post={post} isLanguage={isLanguage} />
                      ))}
                  </div>
                </div>
              )}
            </Col>
            <Col lg={3} sm={12}>
              {FilteredPosts?.length > 0 && (
                <div
                  className={classes.dav__single_update_recent_posts_wrapper}
                >
                  <div className={classes.dav__single_recent_title}>
                    <h1>Recent Updates</h1>
                  </div>
                  <div className={classes.dav__single_recent_posts}>
                    <ul>
                      {FilteredPosts &&
                        FilteredPosts?.slice()
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
                                    isLanguage
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
                                  {formattedDate(post.createdAt)}
                                </div>
                              </li>
                            );
                          })}
                    </ul>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Update;
