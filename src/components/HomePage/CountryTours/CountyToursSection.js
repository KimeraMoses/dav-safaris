import React from "react";
import { Col, Row } from "react-bootstrap";
import SectionTitle from "../SectionTitle/SectionTitle";
import CountryCard from "./CountryCard";
import UgandaImage from "../../../assets/ugandan-golliras.jpg";
import KenyaImage from "../../../assets/Image19.jpg";
import RwandaImage from "../../../assets/Image20.jpg";
import TanzaniaImage from "../../../assets/Image21.jpg";
import classes from "./CountyToursSection.module.css";

const CountyToursSection = () => {

  return (
    <div className={classes.dav__country_tour_section_wrapper}>
      <SectionTitle subTitle="Find a tour by" Title="Destination" />
      <Row className={classes.dav__country_tour_section_row}>
        <Col lg={3} sm={12} className={classes.dav__country_tour_card_wrapper}>
          <CountryCard
            countryImage={UgandaImage}
            countryTitle="Uganda"
            numTours={10}
            countyDescription="Uganda is home to 53.9% of the rare mountain Gorillas population in
            the world and the source of the River Nile the world’s longest River
            harbors the biggest freshwater lake in the world Lake Victoria"
          />
        </Col>
        <Col lg={3} sm={12} className={classes.dav__country_tour_card_wrapper}>
          <CountryCard
            countryImage={RwandaImage}
            countryTitle="Rwanda"
            numTours={12}
            countyDescription="Rwanda is commonly known as the land of rolling thousand hills, Rwanda’s picturesque scenery and calm, friendly people offer special experiences. Rwanda is a landlocked country in East Africa sharing the west harm of the Great Rift Valley where the African Great Lakes region lies. With its capital being Kigali, and one of the smallest countries on the African mainland."
          />
        </Col>
        <Col lg={3} sm={12} className={classes.dav__country_tour_card_wrapper}>
          <CountryCard 
          countryImage={KenyaImage}
          countryTitle="Kenya"
          numTours={9}
          countyDescription="You will spend your overnight at the shores of Lake Victoria in Tanzania; thereafter you enter the infinite plains of Serengeti National Park before you set off to the largest unbroken Caldera in the world which is Ngorongoro Crater. Spend time at Lake Manyara National Park on the lookout for more flamingos and the exceptional tree-climbing lions."
          />
        </Col>
        <Col lg={3} sm={12} className={classes.dav__country_tour_card_wrapper}>
        <CountryCard 
          countryImage={TanzaniaImage}
          countryTitle="Tanzania"
          numTours={5}
          countyDescription="You will spend your overnight at the shores of Lake Victoria in Tanzania; thereafter you enter the infinite plains of Serengeti National Park before you set off to the largest unbroken Caldera in the world which is Ngorongoro Crater. Spend time at Lake Manyara National Park on the lookout for more flamingos and the exceptional tree-climbing lions."
          />
        </Col>
      </Row>
    </div>
  );
};

export default CountyToursSection;
