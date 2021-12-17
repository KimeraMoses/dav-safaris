import React from 'react';
import PopularTours from '../../../HomePage/PopularTours/PopularTours';
import SectionTitle from '../../../HomePage/SectionTitle/SectionTitle';
import classes from "./RelatedTours.module.css";

const RelatedTours = () => {
    return (
        <div className={classes.dav__related_tours_wrapper}>
            <SectionTitle Title="Related Tours" />
            <PopularTours/>
        </div>
    )
}

export default RelatedTours
