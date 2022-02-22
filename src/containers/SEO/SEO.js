import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
