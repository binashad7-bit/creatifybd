import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { observeElements } from '../utils/reveal';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import IntroBand from '../components/IntroBand';
import CaseStudies from '../components/CaseStudies';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import CTABand from '../components/CTABand';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

const Home = () => {
  const [seo, setSeo] = useState({
    title: "CreatifyBD — Creative Agency & Digital Marketing in Dhaka, Bangladesh",
    description: "CreatifyBD is a leading creative agency in Dhaka providing social media marketing, professional photography, web development, and branding services for growth-focused businesses.",
    keywords: "creative agency dhaka, digital marketing agency bangladesh, social media management dhaka, product photography bangladesh, web development agency dhaka, marketing agency bangladesh, logo design dhaka, creatifybd"
  });

  useEffect(() => {
    setTimeout(observeElements, 500);
    return () => {};
  }, []);

  return (
    <div className="App">
      <CustomCursor />
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://creatify-bd.web.app" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creatify-bd.web.app" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="twitter:card" content="summary_large_image" />
      </Helmet>

      <Navbar />
      <Hero />
      <IntroBand />
      
      {/* Featured Case Studies - Duck Design Style */}
      <CaseStudies highlight={true} />
      
      <Clients />
      
      {/* Highlights for other sections */}
      <Services highlight={true} />
      <Features />
      <Portfolio highlight={true} />
      <Process highlight={true} />
      <Pricing highlight={true} />
      
      <Testimonials />
      <CTABand />
      <Contact highlight={true} />
      <Footer />
    </div>
  );
};

export default Home;
