import React from "react";
import imageCover from "../../assets/Image14.jpg";
import classes from "./Terms.module.css";

const Terms = () => {
  return (
    <div className={classes.dav__policies_wrapper}>
      <div
        className={classes.dav__policies_hero}
        style={{
          backgroundImage: `url(${imageCover})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>Terms of Services</h1>
      </div>
      <div className={classes.dav__policies}>
        <h4>All bookings made with Dav Safaris are subject to these terms.</h4>
        <p>
          <b>Price of trip includes:</b> Private Ground transport (car and fuel
          in 4*4), Safari guide, entry cost to all parks mentioned in the
          itinerary, all activities mentioned (boat, and so on), all meals and
          accommodation. This is if nothing else has been agreed.
        </p>
        <p>
          Price does not include International flights (unless special
          agreement), insurance, visa fees, beverages, items of personal use,
          and tips.
        </p>
        <p>
          <b>Adjustments after booking:</b> If you want to make changes in your
          itinerary after booking we will arrange for this if it is possible.
          Note that the dates for gorilla and chimpanzee trekking cannot be
          adjusted after booking.
        </p>
        <p>
          <b>Changes in itinerary:</b> In the case of unforeseen circumstances
          (such as road closures, bad weather, security conditions, or problems
          with hotels) Dav Safaris reserves the right to make adjustments in the
          itinerary. You will off-course be informed about this as soon as
          possible.
        </p>
        <p>
          <b>Payment:</b> We will ask you for a down payment in connection with
          making the booking (this payment always includes the Gorilla
          permits/Chimpanzee permits since these have to be secured right away).
          At the latest one month prior to the start of the safari full payment
          should be made (unless other terms have been agreed). Bookings made
          within one month of departure must be paid in full in connection to
          booking. After receipt of the first down payment, Dav Safaris will
          take the necessary steps to secure bookings of items specified in the
          itinerary.
        </p>
        <p>
          <b>Means of payment:</b> Payment from abroad should be done through
          bank transfer to our account in Uganda. Fees for transfer are paid by
          the client. We accept payment in cash in at least USD, EURO or GB
          pound sterling.
        </p>
        <p>
          <b>During the safari:</b> The animals in the parks are wild so no
          guarantees can be given of good sightings during game drives or
          trekking, but rangers and our guides will do their very best to make
          sure you get a great experience.
        </p>
        <p>
          <b>Vehicles:</b> We put a lot of energy into getting cars that are in
          roadworthy condition. Despite this punctures, breakdowns, damage or
          any other delay can occur due to poor road conditions that are out of
          our control, for this no liability can be accepted.
        </p>

        <h4>Cancellations:</h4>
        <p>
          <ol>
            <li>60> days to start of safari 10% charge</li>
            <li>59-32 days to start of safari 25% charge</li>
            <li>
              {" "}
              31-8 days to start of safari 50% charge 7-3 days to start of
              safari 75% charge{" "}
            </li>
            <li>2-0 days to start of safari 100% charge Gorilla</li>
            <li>
              Permits and flight tickets are excluded from the percentages above
              and are 100% nonrefundable.
            </li>
          </ol>
        </p>
        <p>
          <b>Complaints:</b> Any issues that occur during the safari should be
          reported immediately to the guide and we’ll do our best to resolve it.
          If an issue has not been solved to the client’s satisfaction a written
          complaint should be e-mailed to us no later than 30 days after
          finishing the safari.
        </p>
        <p>
          <b>Liability:</b> Dav Safaris cannot accept liability or pay
          compensation for unforeseen circumstances that are out of our control.
          This includes flight delays/cancellations, war/threat of war, riots,
          civil unrest, terrorist attacks, border closure, acts of the
          government, strikes, thefts, epidemics, road closure, natural
          disasters, extreme weather conditions, fire, technical/mechanical
          problems to transport due to bad roads and similar events beyond the
          company’s control.
        </p>
        <p>
          <b>Insurance:</b> It is the client’s responsibility to make sure that
          they have sufficient coverage with travel insurance.
        </p>
        <p>
          <b>Health:</b> It is the responsibility of the client to ensure that proper
          medical precautions (immunizations and so on) have been taken.
        </p>
      </div>
    </div>
  );
};

export default Terms;
