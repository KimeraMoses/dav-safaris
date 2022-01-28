import {
  CalendarToday,
  CalendarTodayOutlined,
  CalendarViewDay,
  HomeWorkOutlined,
  SecurityOutlined,
  WorkOutline,
} from "@material-ui/icons";
import { Button } from "@material-ui/core";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image4 from "../../assets/image-1.jpg";
import Image2 from "../../assets/Image21.jpg";

import "./Benefits.css";
import { Link } from "react-router-dom";

const Benefits = () => {
  return (
    <section>
      <Container fluid className="about__benefits_wrapper">
        <div className="row">
          <div className="col-lg-6">
            <div className="benefit__content">
              <div className="section-title">
                <h2>Our Benefit</h2>
              </div>
              <p>
                Our knowledgeable and experienced team of the native
                Africans(Ugandan) will leave no stone unturned with regards to
                your joyful stay in East Africa.
              </p>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="benefit__item">
                    <h4>
                      <CalendarTodayOutlined fontSize="large" />
                      Personal Schedule
                    </h4>
                    <p>
                      Tell us where you want to go, we will take you there
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="benefit__item">
                    <h4>
                      <HomeWorkOutlined fontSize="large" />
                      Luxury Interiors
                    </h4>
                    <p>
                      Dav safaris gives you freedom to schedule your own tours
                      in any east african country at the time of your
                      convinience
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="benefit__item">
                    <h4>
                      <SecurityOutlined fontSize="large" />
                      Safe &amp; Confidential
                    </h4>
                    <p>
                      As Dav Safaris Uganda we pledge to offer you safe and
                      confidential tours that will remain in your memories
                      forever
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="benefit__item">
                    <h4>
                      <WorkOutline fontSize="large" />
                      Professional Crew
                    </h4>
                    <p>
                      Our travel experts, Safari Guides and the friendly local
                      people ensures a lifetime experience away from home
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="benefit__pic_wrapper">
              <div className="benefit__pic_top">
                <img className="image__big" src={Image4} alt="" />
                <div className="benefit__pic_bottom">
                  <img src={Image2} alt="" />
                </div>
              </div>
            </div>
          </div>
          <Row className="dav__read_more_wrapper">
            <Col sm={{ span: 2, offset: 5 }} xs={{ span: 10, offset: 1 }}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                className="dav__membership_submit_button"
                component={Link}
                to="/tours"
              >
                Read More
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Benefits;
