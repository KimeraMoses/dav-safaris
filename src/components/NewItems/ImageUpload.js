import React from "react";
import UploadIcon from "@material-ui/icons/BackupOutlined";
import classes from "./ImageUpload.module.css";

const ImageUpload = ({ tourImageHandler, tourImage, Image, isPost }) => {
  const TourImageHandler = () => {
    const fileInput = document.getElementById("tour_image_input_change");
    fileInput.click();
  };

  return (
    <section
      className={classes.dav__cover_image}
      onClick={TourImageHandler}
      style={{
        backgroundImage: `url(${tourImage?.length > 0 ? tourImage : ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        minHeight: isPost ? "240px" : null,
      }}
    >
      <div
        className={
          tourImage?.length > 0 ? classes.dav__cover_image_content : ""
        }
      >
        <UploadIcon />
        <p>
          {tourImage?.length > 0 ? `Change  cover image` : `Upload cover image`}
        </p>
        <input
          type="file"
          hidden="hidden"
          accept="image/*"
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
