import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import classes from "./UpdateCard.module.css";
import { Link } from "react-router-dom";

export default function UpdateCard(props) {
  const { Post, isAdmin } = props;
  return (
    <Card className={classes.dav__update_card_wrapper}>
      <CardActionArea>
        <CardMedia
          className={classes.dav__update_image_wrapper}
          image={Post && Post.postImage}
          title={Post && Post.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.dav__update_card_title}
          >
            {Post && Post.name}
          </Typography>
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
          <Button
            size="small"
            color="primary"
            variant="outlined"
            component={Link}
            to={`/dashboard/manage-safari-updates/edit?post=${Post && Post.id}`}
          >
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
