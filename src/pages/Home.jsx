import React, { useEffect, useState } from 'react';
import useReveal from '../utils/useReveal';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import IntroBand from '../components/IntroBand';

import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Features from '../components/Features';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import CTABand from '../components/CTABand';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

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
    title: "CreatifyBD | Social Media Management & Creative Agency for Global Brands",
    description: "CreatifyBD helps businesses in the USA, Canada, Australia and beyond with social media management, graphic design, video editing, digital marketing and website design.",
    keywords: "CreatifyBD, social media management agency, creative agency Bangladesh, international digital marketing agency, graphic design agency, video editing agency, website design agency",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "CreatifyBD | Social Media Management & Creative Agency for Global Brands",
      "description": "CreatifyBD is a social-first creative agency serving international clients.",
      "url": "https://creatify-bd.web.app/"
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
      
      {content?.visibility?.services !== false && <Services highlight={true} theme={content?.services?.theme} />}
      {content?.visibility?.features !== false && <Features theme={content?.features?.theme} />}
      <CaseStudies />
      {content?.visibility?.portfolio !== false && <Portfolio highlight={true} theme={content?.portfolio?.theme} />}
      {content?.visibility?.process !== false && <Process highlight={true} theme={content?.process?.theme} />}
      
      {content?.visibility?.testimonials !== false && <Testimonials theme={content?.testimonials?.theme} />}
      {content?.visibility?.cta_band !== false && <CTABand />}
      {content?.visibility?.contact !== false && <Contact highlight={true} theme={content?.contact?.theme} />}
      <Footer />
    </div>
  );
};


export default Home;
