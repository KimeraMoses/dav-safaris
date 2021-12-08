import React from 'react';
import classes from "./SectionTitle.module.css";

const SectionTitle = (props) => {
    const {subTitle, Title} = props
    return (
        <div className={classes.dav__popular_tours_section_title}>
        <div className={classes.dav__popular_title}>{subTitle}</div>
        <h3>{Title}</h3>
        <span className={classes.dav__popular_section_underline}></span>
      </div>
    )
}

export default SectionTitle
