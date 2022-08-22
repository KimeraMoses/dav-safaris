import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { Button } from "../UI/Button/Button";

import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>Book Gorilla trekking tours and wildlife Safaris in Africa</h1>
      <p>
        Travel to the any corner of the world, without going around in circles
      </p>

      <div className="hero-btns">
        <Link to="/tours">
          <Button
            className="btns"
            buttonStyle="Btn--primary"
            buttonSize="Btn--large"
          >
            VIEW TOURS
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
