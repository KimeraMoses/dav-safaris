import React, { useEffect } from "react";
import SafariTag from "@material-ui/icons/LocalOfferOutlined";
import DateIcon from "@material-ui/icons/DateRangeOutlined";
import { SingleHero } from "../../Tours/SingleTour/SingleTour";
import classes from "./Update.module.css";
import Image from "../../../assets/background.webp";
import { Col, Container, Row } from "react-bootstrap";
import { Link,useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Update = () => {
  const Posts = useSelector((state) => state.post.posts);
  const { postTitle } = useParams()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postTitle]);
  return (
    <div>
      <SingleHero title="Murchison Falls National Park Safari in Uganda" image={Image} />
      <Container fluid className={classes.dav__single_update_wrapper}>
        <Row style={{ alignItems: "flex-start" }}>
          <Col
            lg={9}
            sm={12}
            className={classes.dav__single_update_details_wrapper}
          >
            <div className={classes.dav__post_header}>
              <h1>Murchison Falls National Park Safari in Uganda</h1>
              <div className={classes.dav__post_meta}>
                <span className={classes.dav__date_posted}>
                  <DateIcon /> December 15, 2021
                </span>
                <span className={classes.dav__safari_updates_tag}>
                  <SafariTag /> <Link to="/safari-updates">Safari Updates</Link>
                </span>
              </div>
            </div>
            <div className={classes.dav__post_content_wrapper}>
              <p>
                Murchison Falls National Park Safari in Uganda. The Murchison
                Falls National Park lies at the northern conclusion of the
                Albertine Rift Valley, where the bulky Bunyoro ledge blends into
                the tremendous fields of the Acholi area. One of Uganda’s most
                seasoned reservation regions, it was at first gazette as a
                reserve in 1926 to ensure a savanna that Winston Churchill
                depicted in 1907 as ‘Kew Gardens and the zoo combined on the
                boundless scale’. The park is divided by the Victoria Nile which
                begins with races down 80km of white-water rapids sometime
                recently diving 40m over the rift valley wall at Murchison
                Falls, the middle piece of the park. The Falls channels the
                final of the river’s vitality, changing it into a wide, tranquil
                stream that streams discreetly over the valley floor for 55km to
                Lake Albert. This extension of stream gives one of Uganda’s most
                important natural life exhibitions on a Uganda safari. Customary
                guests incorporate elephants, giraffes, and buffalo whereas
                hippopotamus and Nile crocodiles are lasting inhabitants.
              </p>
              <h3>
                <strong>What to See in Murchison Falls National Park</strong>
              </h3>
              <p>
                Murchison Falls National Park Safari in Uganda. According to the
                history of Murchison Falls National park, when the park was set
                up in 1952, the reserve section enthused, that the most traveler
                attractions of this park were unquestionably the interesting
                Murchison Falls after which the pack was named. the waterfall
                found on the stream Nile which presents a showy fight between
                the water and the pressed rocks shows an expansive volume of
                water capably pressing through a narrow 7m cleft within the
                rocks that dives over 40 meters underneath into a 50m sweep
                water pool. The effective constrain of the water comes about
                into an uproarious thunder and a water shower around the drop.
                Interests an expansive number of sightseers incline toward
                booking settlement found near to the waterfall so that they can
                listen to its thundering water, particularly within the very
                evenings.
              </p>
            </div>
          </Col>
          <Col
            lg={3}
            sm={12}
            className={classes.dav__single_update_recent_posts_wrapper}
          >
            <div className={classes.dav__single_recent_title}>
              <h1>Recent Updates</h1>
            </div>
            <div className={classes.dav__single_recent_posts}>
              <ul>
                {Posts &&
                  Posts.slice()
                    .sort((a, b) => {
                      return (
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                      );
                    })
                    .reverse()
                    .slice(0, 10)
                    .map((post) => {
                      const PDate = new Date(post.createdAt);
                      const options = {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      };
                      const PostDate = PDate.toLocaleDateString(
                        "en-US",
                        options
                      );
                      return (
                        <li key={post.id}>
                          <Link
                            to={`/safari-updates/${post.name
                              .toLowerCase()
                              .replace(/ /g, "-")}`}
                          >
                            {post.name}
                          </Link>
                          <div
                            className={classes.dav__single_recent_posts_date}
                          >
                            {PostDate}
                          </div>
                        </li>
                      );
                    })}
                {/* <li>
                  <Link to="/">
                    Murchison Falls National Park Safari in Uganda
                  </Link>
                  <div className={classes.dav__single_recent_posts_date}>
                    December 15, 2021
                  </div>
                </li> */}
                {/* <li>
                  <Link to="/">
                    Murchison Falls National Park Safari in Uganda National Park
                    Safari in
                  </Link>
                  <div className={classes.dav__single_recent_posts_date}>
                    December 15, 2021
                  </div>
                </li> */}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Update;
