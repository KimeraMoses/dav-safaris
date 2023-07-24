import React from "react";

//===MUI IMPORTS===
import {
  Avatar,
  Badge,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@material-ui/core";

//===BOOTSTRAP IMPORTS===
import EditIcon from "@material-ui/icons/Edit";
//===COMPONENT IMPORTS===
import classes from "./DashTourCard.module.css";
import { DeleteOutlined } from "@material-ui/icons";

const DashTourCard = (props) => {
  const { onEditClick, Country, onDeleteClick } = props;

  return (
    <ListItem className={classes.gpa__university_card_wrapper_paper}>
      <ListItemAvatar>
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={Country.name}
          color="error"
        >
          <Avatar
            className={classes.gpa__dashboard_course_manager_course_id}
            variant="square"
            src={Country.countryImage}
          />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={Country.slug}
        // secondary={
        //   course.university && course.university.name.replace(/-/g, ' ')
        // }
      />
      <ListItemSecondaryAction>
        <Tooltip title="Edit" placement="left">
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => onEditClick(Country.id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="left">
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteClick(Country.id)}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default DashTourCard;
