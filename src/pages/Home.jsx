import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import useReveal from '../utils/useReveal';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import IntroBand from '../components/IntroBand';

import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import CaseStudies from '../components/CaseStudies';
import Process from '../components/Process';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import CTABand from '../components/CTABand';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

import SmmHighlight from '../components/SmmHighlight';
import AboutTrust from '../components/AboutTrust';
import { useSettings } from '../context/SettingsContext';

const Home = () => {
  const { content, loading } = useSettings();
  const [dataLoaded, setDataLoaded] = useState(false);

  // Trigger reveal observer
  useReveal(dataLoaded);

  useEffect(() => {
    if (!loading) setDataLoaded(true);
  }, [loading]);

  const seo = {
    title: "CreatifyBD | Social Media Management, Graphic Design, Video Editing & Websites",
    description: "CreatifyBD helps small businesses in the USA, Canada, Australia, and global markets with social media management, graphic design, video editing, digital marketing, and website design.",
    keywords: "CreatifyBD, Creatify BD, social media management agency, hire social media manager USA, video editing service Canada, graphic design agency Australia, outsource creative design, small business web design React, digital marketing marketplace",
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "CreatifyBD",
      "alternateName": "Creatify BD",
      "image": "https://creatifybd.com/og-image.png",
      "logo": "https://creatifybd.com/logo.png",
      "url": "https://creatifybd.com",
      "telephone": "+8801951676600",
      "email": "hello@creatifybd.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dhaka",
        "addressLocality": "Dhaka",
        "addressCountry": "BD"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "23.8103",
        "longitude": "90.4125"
      },
      "areaServed": [
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "Australia" }
      ],
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "84"
      },
      "sameAs": [
        "https://www.facebook.com/creatifybd",
        "https://www.linkedin.com/company/creatifybd"
      ]
    }
  };

  return (
    <div className="App">
      <SEO 
        title={seo.title} 
        description={seo.description} 
        keywords={seo.keywords}
        schema={seo.schema}
      />

      <Navbar />
      {content?.visibility?.hero !== false && <Hero />}
      <IntroBand />
      
      {content?.visibility?.clients !== false && <Clients />}
      
      <SmmHighlight />
      {content?.visibility?.services !== false && <Services highlight={true} theme={content?.services?.theme} />}
      {content?.visibility?.features !== false && <Features theme={content?.features?.theme} />}
      <AboutTrust />
      {content?.visibility?.portfolio !== false && <Portfolio highlight={true} theme={content?.portfolio?.theme} />}
      <CaseStudies />
      {content?.visibility?.process !== false && <Process highlight={true} theme={content?.process?.theme} />}
      {content?.visibility?.pricing !== false && <Pricing highlight={true} theme={content?.pricing?.theme} />}
      
      {content?.visibility?.testimonials !== false && <Testimonials theme={content?.testimonials?.theme} />}
      {content?.visibility?.cta_band !== false && <CTABand />}
      {content?.visibility?.contact !== false && <Contact highlight={true} theme={content?.contact?.theme} />}
      <Footer />
    </div>
  );
};


export default Home;
