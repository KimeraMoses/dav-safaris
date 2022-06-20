import React, { useState } from "react";
import ModalComponent from "../../UI/Modal/ModalComponent";
import classes from "./ServiceCard.module.css";

const ServiceCard = (props) => {
  const { name, desc, num, data } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div
      className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 ${classes.service__card}`}
      key={num}
    >
      <div className={`${classes.single__service} mb-50`}>
        <div className={classes.service__num}>{num + 1}</div>
        <h5>{name}</h5>

        <div className={classes.service__desc}>
          <p>{desc}</p>
        </div>
        <div className={classes.service__card_link} onClick={handleClick}>
          Learn More
        </div>
      </div>
      <ModalComponent open={open} setOpen={setOpen} data={data} />
    </div>
  );
};

export default ServiceCard;
