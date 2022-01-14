import React from "react";
import { Link } from "react-router-dom";

//===MUI IMPORTS===
import {
  Avatar,
  Badge,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tooltip,
} from "@material-ui/core";

//===BOOTSTRAP IMPORTS===
import { Col } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
//===COMPONENT IMPORTS===
import classes from "./DashTourCard.module.css";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";

const DashTourCard = (props) => {
  const { TourLink, TourLogo, TourName } = props;
  return (
    // <Link to={`/tours/uganda/${TourLink}`}>
    //   <Paper
    //     className={`${classes.gpa__university_card_wrapper_paper}`}
    //     elevation={2}
    //   >
    //     <Col
    //       lg={2}
    //       md={2}
    //       sm={2}
    //       xs={2}
    //       className={classes.gpa__university_card_univ_logo_wrapper}
    //     >
    //       <Avatar
    //         variant="square"
    //         src={TourLogo}
    //         alt={TourName}
    //         style={{ textTransform: "uppercase" }}
    //       >
    //         {TourName.charAt(0)}
    //       </Avatar>
    //     </Col>
    //     <Col
    //       lg={10}
    //       md={10}
    //       sm={10}
    //       xs={10}
    //       className={classes.gpa__university_card_univ_title_wrapper}
    //     >
    //       <h5> {TourName}</h5>
    //       <IconButton className={classes.dav__edit_icon} color="secondary" size="small">
    //         <EditOutlined />
    //       </IconButton>
    //     </Col>
    //   </Paper>
    // </Link>

    <ListItem className={classes.gpa__university_card_wrapper_paper}>
      <ListItemAvatar>
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={"Uganda"}
          color="error"
        >
          <Avatar
            className={classes.gpa__dashboard_course_manager_course_id}
            variant="square"
            src={TourLogo}
          >
            {TourLogo}
          </Avatar>
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={TourName}
        // secondary={
        //   course.university && course.university.name.replace(/-/g, ' ')
        // }
      />
      <ListItemSecondaryAction>
        <Tooltip title="Edit" placement="left">
          <IconButton
            edge="end"
            aria-label="edit"
            // onClick={() => onEditClick(tour.id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="left">
          <IconButton
            edge="end"
            aria-label="delete"
            // onClick={() => onEditClick(tour.id)}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default DashTourCard;
