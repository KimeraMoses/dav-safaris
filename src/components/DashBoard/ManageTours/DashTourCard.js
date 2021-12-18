import React from "react";
import { Link } from "react-router-dom";

//===MUI IMPORTS===
import { Avatar, IconButton, Paper } from "@material-ui/core";

//===BOOTSTRAP IMPORTS===
import { Col } from "react-bootstrap";

//===COMPONENT IMPORTS===
import classes from "./DashTourCard.module.css";
import { EditOutlined } from "@material-ui/icons";

const DashTourCard = (props) => {
  const { TourLink, TourLogo, TourName } = props;
  return (
    <Link to={`/tours/uganda/${TourLink}`}>
      <Paper
        className={`${classes.gpa__university_card_wrapper_paper}`}
        elevation={2}
      >
        <Col
          lg={3}
          md={3}
          sm={3}
          xs={3}
          className={classes.gpa__university_card_univ_logo_wrapper}
        >
          <Avatar
            variant="square"
            src={TourLogo}
            alt={TourName}
            style={{ textTransform: "uppercase" }}
          >
            {TourName.charAt(0)}
          </Avatar>
        </Col>
        <Col
          lg={9}
          md={9}
          sm={9}
          xs={9}
          className={classes.gpa__university_card_univ_title_wrapper}
        >
          <h5> {TourName}</h5>
          <IconButton className={classes.dav__edit_icon} color="secondary">
            <EditOutlined />
          </IconButton>
        </Col>
      </Paper>
    </Link>
  );
};
export default DashTourCard;
