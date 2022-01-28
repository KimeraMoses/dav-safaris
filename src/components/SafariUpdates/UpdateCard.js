import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Image from "../../assets/gollira.jpg";
import styles from "./Updates.module.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function UpdateCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={Image}
          title="A Guide To Gorilla Trekking in Uganda"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={styles.dav__update_card_title}
          >
            A Guide To Gorilla Trekking in Uganda
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={styles.dav__update_card_description}
          >
            Uganda is without a doubt the leading destination for primates
            trekking, and gorilla trekking in Bwindi National park pops up, to
            begin with when one considers going to Uganda. Trekking profound
            into the enchanted impervious wildernesses to discover a family of
            mountain gorillas and investing calm, continuous minutes makes the
            best bucket list adventure in Africa. Thousands of travelers who’ve
            gone to these gentle mammoths will affirm that. Our fascination with
            these one-of-a-kind gentle mammoths may come from the reality that
            they share 98% of our DNA, our humanoid nature, and are imperiled to
            the termination. Truly, mountain gorillas extended much of East and
            Central African rain forests, unreservedly meandering the crack
            valley and volcanic inclines. They are gradually disseminated with
            human advancement, repulsing them into higher grounds and
            diminishing their number about to termination.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
