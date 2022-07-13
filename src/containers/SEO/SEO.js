import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, keywords, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
