import React from "react";
import { Container, Row } from "react-bootstrap";
import ServiceCard from "./ServiceCard";
import classes from "./Services.module.css";

export const ServicesData = [
  {
    name: "Environmental Protection",
    description:
      "Travelling the world is close to our heart, which means so is protecting it as we do. Join us and be part of the solution, not the problem! From the water habitants clean ups and limiting all plastic usage on our trips to partnering with eco-friendly suppliers and trusts, you can minimize your travel footprint with us.",
  },
  {
    name: "Local Communities",
    description:
      "Where your money goes is important as a traveler, we work hard to ensure our local expenses remain in the communities we are visiting. From our local guides and accommodation to the families we work with in those remote areas.  Each tourist we can bring to a community brings an incredible opportunity to help support their local economy.",
  },
  {
    name: "Education",
    description:
      "We believe that travel changes you; one of the things we want to inspire in our travelers is a change in how you travel. From teaching our guests how to protect the wild habitants we visit, inspiring the communities to organize their own communities clean ups for the future. We practice what we preach, so the rest of the travel community will follow.",
  },
  {
    name: "Animal Welfare",
    description:
      "We work very closely with responsible suppliers to make sure we never support any activity that mistreats animals. We also started working with other collaborators, where we work with an animal welfare organizations to organize free spay and neuter events for local animals.",
  },
];

const Services = ({ isHomePage }) => {
  return (
    <section>
      <Container fluid className={classes.services_wrapper}>
        <Row className={classes.services__row}>
          {ServicesData.map((service, index) => {
            return (
              <ServiceCard
                key={service.name}
                name={service.name}
                desc={service.description}
                num={index}
                data={service}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
