import React from "react";
import classes from "./CommunityPage.module.css";
import image1 from "../../assets/tourist.jpg";
import image2 from "../../assets/student.jpg";
import image from "../../assets/background.webp";
import Services from "./Services/Services";

const CommunityPage = () => {
  return (
    <div className={classes.community_page_wrapper}>
      <div
        className={classes.dav__about_us_hero}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className={classes.dav__about_us_title}>
          <h2>Commmunity Travels</h2>
        </div>
      </div>
      <div className={classes.community_page_content_wrapper}>
        <div className={classes.content_section_wrapper}>
          <div className={classes.dav__section_top_wrapper}>
            <div className={classes.dav__section_top_wrapper__visuals}>
              <img src={image1} alt="Ugandan Travellers" />
            </div>
            <div className={classes.dav__section_top_wrapper__content}>
              <h4>Travel to Change</h4>
              <p>
                All over the world, people are choosing to travel, and
                increasingly to more remote destinations. This means the impacts
                of tourism are constantly growing. We have a significant
                responsibility and opportunity to not only minimize the negative
                consequences of tourism, but make a long-lasting positive impact
                too. From protecting the environment and its animals, to
                educating others and supporting the communities you visit. This
                means being a responsible tourist you can change the world as
                you travel.
              </p>
            </div>
          </div>
          <div className={classes.service_card_wrapper}>
            <h4>Services</h4>
            <Services />

            <div className={classes.section_wrapper}>
              <h4>DavSafariship</h4>
              <p>
                It is probably pretty evident if you have made it this far
                through the website that we like to travel. Well, more than
                like, we’re actually pretty passionate about it. Travelling is
                what we do; it is who we are. One Life Adventures was built off
                of a dream to travel differently, and show others how to do the
                same. So we develop unique trips around mind blowing
                destinations and the travelers started flocking. Whether you
                join us just trying to escape work, trying to gain some
                perspective on our big, worldwide or in search of a life
                altering experience. One of our fundamental core beliefs is that
                everyone should be able to travel. For some people it is just
                not as simple as booking that flight and getting on the plane.
              </p>
              <p>
                We have spent years working on what we believe are
                transformational tour trips, but they simply would not be so
                without our local legends. In each destination we operate we
                have local guides that go above and beyond to show our travelers
                how passionate they are about their home. The desire they have
                to provide the ultimate experience for our travelers while
                teaching their lifestyles, cultures and rich histories shines
                through and we absolutely adore them. With this in mind, we
                founded the DavSafariship. Every year we give one of our local
                legends the opportunity to travel somewhere they’ve never had a
                chance to visit before.
              </p>
            </div>
            <div
              className={`${classes.dav__section_top_wrapper} ${classes.schools}`}
            >
              <div className={classes.dav__section_top_wrapper__visuals}>
                <img src={image2} alt="Supporting Local Schools" />
              </div>
              <div className={classes.dav__section_top_wrapper__content}>
                <h4>Supporting Local Schools</h4>
                <p>
                  We visit schools in rural communities to offer cultural
                  exchange and work together to fund projects through donations.
                  By visiting these underfunded communities on our tours, our
                  travelers can bring along school supplies and we can directly
                  donate to where it’s needed to make a real difference. Our
                  ambition projects are to build a new daycare centers in a
                  rural communities, contributing to huge infrastructure
                  improvements, and sponsoring local Football, Biking,
                  basketball teams to provide uniforms and equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
