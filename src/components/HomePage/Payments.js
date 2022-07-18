import React from "react";
import classes from "./Payments.module.css";
import Image from "../../assets/pesapal.png";

const Payments = () => {
  return (
    <div className={classes.payments_wrapper}>
      <div className={classes.payment_options}>
        <img src={Image} alt="Payment Options" />
      </div>
      <div className={classes.payment_link_wrapper}>
        <h4>Secure Online Payment</h4>
        <p>
          Pay for all your tours using any of these payment methods by clicking
          the button below
        </p>
        <div className={classes.dav__payment_btn_wrapper}>
          <a
            href="https://payments.pesapal.com/davsafaris"
            className={classes.dav__payment_btn}
            target="_blank"
            rel="noreferrer"
          >
            Pay for Tour
          </a>
        </div>
      </div>
    </div>
  );
};

export default Payments;
