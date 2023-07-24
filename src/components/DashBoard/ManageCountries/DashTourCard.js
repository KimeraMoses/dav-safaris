import React from "react";

//===MUI IMPORTS===
import {
  Avatar,
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
        <Avatar
          className={classes.gpa__dashboard_course_manager_course_id}
          variant="square"
          src={Country.countryImage}
        />
      </ListItemAvatar>
      <ListItemText primary={Country.name} />
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
