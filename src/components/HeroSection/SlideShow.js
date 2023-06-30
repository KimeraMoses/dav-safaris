import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./SlideShow.css";
import Image1 from "../../assets/Uganda-scenary.jpg";
import Image2 from "../../assets/KeWildlife.jpg";
import Image3 from "../../assets/Image21.jpg";
import Image4 from "../../assets/Rwanda-Culture-Safaris.jpg";
import { Link } from "react-router-dom";

const CountrySlides = [
  {
    title: "Best tour destinations in uganda",
    image: Image1,
    paragraph:
      "The unleveled and unique destination blessed with undeniable culture and natural beauty",
    link: "/uganda-safaris",
    btnText: "Popular Tour in Uganda",
  },
  {
    title: "The world's most epic natural wonders",
    image: Image2,
    paragraph:
      "Enjoy unmatched series of big fives at the world's most epic natural wonders alongside the breathtaking views of birds, and sand beaches",
    link: "/kenya-safaris",
    btnText: "Popular Tour in Kenya",
  },
  {
    title: "Experience the best sceneries in Rwanda",
    image: Image4,
    paragraph:
      "Best known for its friendly people and stunning views of the great rift valley which makes it the most remarkable country in the world",
    link: "/rwanda-safaris",
    btnText: "Popular Tour in Rwanda",
  },
  {
    title: "Best Places to visit in Tanzania",
    image: Image3,
    paragraph:
      "Visit Tanzania for an exceptional beach experience in Zanzibar, Hike kilimanjaro mountain, visit the serengeti commonly known safari mecca for its variety of wildlife species",
    link: "/tanzania-safaris",
    btnText: "Popular Tour in Tanzania",
  },
];

const Slideshow = () => {
  return (
    <div className="test-wrapper">
      <Slide easing="ease" cssClass="homeslider" arrows={false} duration={2000}>
        {CountrySlides.map((country, index) => {
          return (
            <div className="each-slide" key={index}>
              <div
                style={{
                  backgroundImage: `url(${country.image})`,
                  backgroundPosition: "center center",
                }}
              >
                <span className="dav__slider_content">
                  <h2>{country.title}</h2>
                  <p>{country.paragraph}</p>
                  <Link to={country.link} className="slider_btn">
                    {country.btnText}
                  </Link>
                </span>
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default Slideshow;
