import React from "react";
import classes from "./SectionTitle.module.css";
import { Skeleton } from "@material-ui/lab";
import { Typography } from "@material-ui/core";

const SectionTitle = (props) => {
  const { subTitle, Title, isLoading } = props;
  return (
    <>
      {isLoading ? (
        <div>
          <div style={{ margin: "15px" }}>
            <Typography variant="body2">
              <Skeleton></Skeleton>
            </Typography>
          </div>
          <div style={{ margin: "15px" }}>
            <Typography variant="h3">
              <Skeleton></Skeleton>
            </Typography>
          </div>
        </div>
      ) : (
        <div className={classes.dav__popular_tours_section_title}>
          <div className={classes.dav__popular_title}>{subTitle}</div>
          <h3>{Title}</h3>
          <span className={classes.dav__popular_section_underline}></span>
        </div>
      )}
    </>
  );
};

export default SectionTitle;
