import React, { useRef, useState } from "react";
import UploadIcon from "@material-ui/icons/BackupOutlined";
import classes from "./ImageUpload.module.css";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const ImageUpload = ({
  tourImageHandler,
  tourImage
}) => {
  const TourImageHandler = () => {
    const fileInput = document.getElementById("tour_image_input_change");
    fileInput.click();
  };


  return (
    <section
      className={classes.dav__cover_image}
      onClick={TourImageHandler}
      style={{
        backgroundImage: `url(${tourImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={tourImage.length>0?classes.dav__cover_image_content: ""}>
      <UploadIcon />
      <p>{tourImage.length>0?"Change tour cover image":"Upload tour cover image"}</p>
      <input
        type="file"
        hidden="hidden"
        title=""
        value=""
        id="tour_image_input_change"
        onChange={tourImageHandler}
      />
      </div>

    </section>
  );
};

export default ImageUpload;
