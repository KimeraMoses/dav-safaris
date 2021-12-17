import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button} from "@material-ui/core"
import Expert from "../../assets/Image3.jpg";
import SectionTitle from "../HomePage/SectionTitle/SectionTitle";
import classes from "./AboutCountry.module.css";
import { useParams } from "react-router";

const AboutCountry = () => {
    const { countryName } = useParams();
  return (
    <Container fluid className={classes.dav__country_tours_overall_wrapper}>
      <Row className={classes.dav__country_tours_wrapper}>
        <Col md={8} sm={12} className={classes.dav__about_country_section}>
          <p>
            Uganda is recorded as the most beautiful country in the whole world
            this is supported by the variety of Natural touristic attractions
            ranging from Vegetations, Mountains, Lakes, rivers, and wildlife
            plus diverse culture and traditional lifestyle.
          </p>
          <p>
            Uganda is home to 53.9% of the rare mountain Gorillas population in
            the world and the source of the River Nile the world’s longest River
            harbors the biggest freshwater lake in the world Lake Victoria. The
            country is also blessed with scenic mountain ranges in African (The
            Rwenzori Mountains). About 11% of the world’s avian life species are
            recorded in Uganda and a variety of wildlife species inclusive of
            the famous African big fives such as the African elephant, Lions,
            Leopards, Cape Buffalos, and Rhinos. Visit 10 Uganda’s National
            parks and each is unique to its self. The parks are Mount Elgon
            National Park, Kidepo Valley National Park, Murchison Falls National
            Park, Kibale Forest National Park, Queen Elizabeth National Park,
            Bwindi Impenetrable forest National, Mgahinga Gorilla National park,
            Semiliki National Park, and Lake Mburo National Park. These parks
            are also supported by a number of game reserves around the country.
            Our team is ready to customize for you a safari in Uganda, book your
            Gorillas and Wildlife Safari, Birding safari, Uganda Cultural
            Safari, or mountaineering with us.
          </p>
        </Col>
        <Col md={4} sm={12} className={classes.dav__contact_country_expert}>
            <div class={`${classes.dav__contact_country_expert_card} bg-light`}>
              <h2 class="h3">
                Speak to an expert 
                <br /> who's is there
              </h2>

              <div className={classes.specialist__text}>
                <img src={Expert}/>

                <p>
                  Start planning your trip by contacting one of our{" "}
                  <span>{countryName}</span> specialists
                </p>
              </div>
              <ul class={classes.dav__contact_country_expert_contact}>
                <li>
                  <strong>
                    <span
                      className={classes.dav__contact_country_expert_contact}
                    >
                      +256759130054
                    </span>
                  </strong>
                </li>
                <li>
                    <Button variant="contained" color="primary" className="w-100">
                    Make an enquiry
                  </Button>
                </li>
              </ul>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutCountry;
