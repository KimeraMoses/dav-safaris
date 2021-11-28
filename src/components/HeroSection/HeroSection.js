import React from 'react';
import '../App.css';
import { Button } from '../UI/Button/Button';

import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>Discover Your Favorite Place with Us</h1>
      <p>Travel to the any corner of the world, without going around in circles</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'

        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          VIEW TOURS
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;