import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classes from "./UpdateCard.module.css";
import { Link } from "react-router-dom";

export default function UpdateCard(props) {
  const { Post, isAdmin, onDeleteClick } = props;
  return (
    <Card className={classes.dav__update_card_wrapper}>
      <CardActionArea>
        <CardMedia
          className={classes.dav__update_image_wrapper}
          image={Post && Post.postImage}
          title={Post && Post.name}
        />
        <CardContent>
          <Link to={`/safari-updates/${Post && Post.slug}`}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.dav__update_card_title}
            >
              {Post && Post.name}
            </Typography>
          </Link>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.dav__update_card_description}
          >
            {Post && Post.post_content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.post_card_actions_wrapper}>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/safari-updates/${Post && Post.slug}`}
        >
          Read More
        </Button>
        {isAdmin && (
          <div className={classes.admin_action_btns}>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              component={Link}
              to={`/dashboard/manage-safari-updates/edit?post=${
                Post && Post.id
              }`}
            >
              Edit
            </Button>
            <div
              className={classes.delete_icon_wrapper}
              onClick={() => onDeleteClick(Post.id)}
            >
              <DeleteIcon />
            </div>
          </div>
        )}
      </CardActions>
    </Card>
  );
}
