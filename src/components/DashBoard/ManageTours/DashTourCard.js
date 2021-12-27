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
          lg={2}
          md={2}
          sm={2}
          xs={2}
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
          lg={10}
          md={10}
          sm={10}
          xs={10}
          className={classes.gpa__university_card_univ_title_wrapper}
        >
          <h5> {TourName}</h5>
          <IconButton className={classes.dav__edit_icon} color="secondary" size="small">
            <EditOutlined />
          </IconButton>
        </Col>
      </Paper>
    </Link>
  );
};
export default DashTourCard;
