import React from 'react';
import { useSelector } from 'react-redux';
import PopularTours from '../../../HomePage/PopularTours/PopularTours';
import SectionTitle from '../../../HomePage/SectionTitle/SectionTitle';
import classes from "./RelatedTours.module.css";

const RelatedTours = ({TourCategory}) => {
    const Tours = useSelector(state=>state.tours.toursList);
    const RTours = Tours.filter((tour)=>tour.category ===TourCategory);
    
    return (
        <div className={classes.dav__related_tours_wrapper}>
            <SectionTitle Title="Related Tours" />
            <PopularTours Tours={RTours} />
        </div>
    )
}

export default RelatedTours
