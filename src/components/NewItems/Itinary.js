import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import classes from "./Itinary.module.css";

const Itinary = ({ id,day, title, description, meal_plan, accomodation,onEditClick }) => {
  return (
    <ListItem className={classes.dav__itinary_card}>
      <ListItemAvatar>
        <Avatar
          className={classes.dav__itinary_day}
        >
          {day? day: id+1}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={description}  className={classes.dav__tour_texts} />
      <ListItemSecondaryAction>
        <Tooltip title="Edit" placement="left">
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => onEditClick(id)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="left">
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onEditClick(id)}
          >
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Itinary;
