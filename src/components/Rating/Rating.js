import React from "react";
import "./Rating.css"
import { Tooltip } from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import Rating from '@material-ui/lab/Rating';

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

export default function HoverRating(props) {
  const [value, setValue] = React.useState(4.5);
  const [hover, setHover] = React.useState(-1);

  return (
 
          <Tooltip title={labels[hover !== -1 ? hover : value]} placement="top" arrow>
          <Rating
          name="hover-feedback"
          
          value={value}
          precision={.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        </Tooltip>

  );
}
