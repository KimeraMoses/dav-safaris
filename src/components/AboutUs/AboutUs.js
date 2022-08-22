import React from "react";
import image from "../../assets/dav-tourist-vehicle.jpeg";
import Vid4 from "../../assets/Vid4.mp4";
import Vid5 from "../../assets/Vid5.mp4";
import classes from "./AboutUs.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import SEO from "../../containers/SEO/SEO";

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us"
        description="Dav Safari was established in 2018 by a group of native youth in
              Uganda, this came after gathering competent skills and experience
              to run safaris and holidays, our idea is to offer Tours and travel
              services to our esteemed customers throughout the region of East
              Africa. Dav safaris is a fully legally licensed company with
              operational offices in Kampala Uganda. We offer a variety of
              services ranging from Tours and travel, hotel booking, chimpanzee
              and Gorilla Trekking safaris, Beach holidays, flight tickets
              booking, Transport services majorly in Uganda, Kenya, Tanzania,
              Zanzibar, and Rwanda."
        keywords="African Safaris, Gorilla Safaris"
      />
      <div className={classes.about_us_wrapper}>
        <div
          className={classes.dav__about_us_hero}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className={classes.dav__about_us_title}>
            <h2>About Us</h2>
          </div>
        </div>
        <div className={classes.about_us_content_wrapper}>
          <div className={classes.dav__section_top_wrapper}>
            <div className={classes.dav__section_top_wrapper__visuals}>
              <video className="videoTag" autoPlay loop muted>
                <source src={Vid4} type="video/mp4" />
              </video>
            </div>
            <div className={classes.dav__section_top_wrapper__content}>
              <h4>Who We are</h4>
              <p>
                Dav Safari was established in 2018 by a group of native youth in
                Uganda, this came after gathering competent skills and
                experience to run safaris and holidays, our idea is to offer
                Tours and travel services to our esteemed customers throughout
                the region of East Africa. Dav safaris is a fully legally
                licensed company with operational offices in Kampala Uganda. We
                offer a variety of services ranging from Tours and travel, hotel
                booking, chimpanzee and Gorilla Trekking safaris, Beach
                holidays, flight tickets booking, Transport services majorly in
                Uganda, Kenya, Tanzania, Zanzibar, and Rwanda.
              </p>
            </div>
          </div>

          <div className={classes.dav__section_bottom_wrapper}>
            <div className={classes.dav__section_bottom_wrapper__content}>
              <h4>What We do</h4>
              <p>
                Tours and Travel Agency based in Uganda rendering mountain
                gorilla Trekking experience, birding, and wildlife safaris
                doubled with a range of services including mountaineering, white
                water rafting, and culture and community tours among others in
                Uganda and the entire East African Countries offering
                tailor-made services suiting all travel budgets. We pride
                ourselves in ensuring convenient safaris based on our guest
                requests in terms of budget, time, and travel needs to enjoy
                your African safari. Mountain Gorilla trekking in Uganda and
                Rwanda, wild beast Migration in Tanzania and Kenya, Rwenzori and
                Kilimanjaro Mountain Hiking experiences, and white water rafting
                adventure along the Nile River. Our excellent team of Safari
                guides is capable to make your safari a lifetime experience
                accompanied by the great and mechanically sounding fleet. All
                our services are available throughout the year with the best
                time being December to January and June to August. Our
                knowledgeable and experienced team of the native
                Africans(Ugandan) will leave no stone unturned with regards to
                your joyful stay in East Africa, all our services are topnotch
                because of our esteemed teamwork, reliability, paying attention
                to details, and all our partners have achieved their Excellency
                for years in the business
              </p>
              <p>
                <strong>Outbound travels</strong>: Our experienced team also
                offers outbound travel services to our esteemed guests ranging
                from flight ticket booking, overseas hotel booking, outbound
                safaris in Europe, Asia, the Middle East, and North America. We
                also give travel advisory services to our clients. Give back to
                the community Be part of our help the needy campaign by booking
                your safari with us or donate directly to our campaign We
                partner with St Joseph’s Aid’s Society Kigando, this effort is
                to ensure that orphans, children from impoverished families, and
                street children have better and safe education. Community
                outreach, we work with old people and organize Hiv/Aids Women to
                help them with basic needs such as clothes, food, and shelter.
              </p>
              <p>
                Dav Safaris team partners with a variety of accommodation
                facilities countrywide at all levels depending on our clients’
                budget, our wide range of hotel partners include; bed space,
                tented camps, homestays, lodges, cottages, hotels, and motels
                these covers all our Budget, midrange, and luxury guests.
              </p>
              <div className={classes.dav__contact_us_btn_wrapper}>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/contact-us"
                >
                  Let's Talk
                </Button>
              </div>
            </div>
            <div className={classes.dav__section_bottom_wrapper__visuals}>
              <video className="videoTag" autoPlay loop muted controls={false}>
                <source src={Vid5} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
