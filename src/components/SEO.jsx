import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "CreatifyBD | Digital Marketing & Creative Agency in Dhaka", 
  description = "CreatifyBD is a top-class creative agency in Dhaka, specializing in digital marketing, branding, web development, and video production.",
  keywords = "digital marketing agency dhaka, creative agency bangladesh, web design dhaka, branding bangladesh",
  image = "https://creatify-bd.web.app/og-image.jpg",
  url = "https://creatify-bd.web.app/",
  type = "website"
}) => {
  const siteName = "CreatifyBD";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
