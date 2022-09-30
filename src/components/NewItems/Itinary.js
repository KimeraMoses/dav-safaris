import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Tooltip,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import classes from "./Itinary.module.css";

const Itinary = ({
  id,
  day,
  title,
  description,
  // meal_plan,
  // accomodation,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <ListItem className={classes.dav__itinary_card}>
      <ListItemAvatar>
        <Avatar className={classes.dav__itinary_day}>
          {day ? day : id + 1}
        </Avatar>
      </ListItemAvatar>
      <div className={classes.dav__tour_texts}>
        <span>{title}</span>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
      <ListItemSecondaryAction>
        <Tooltip title="Edit" placement="left">
          <IconButton
            className={classes.actionButton}
            edge="end"
            aria-label="edit"
            onClick={() => onEditClick(id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="left">
          <IconButton
            className={classes.actionButton}
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteClick(id)}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Itinary;
