import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { observeElements } from '../utils/reveal';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import IntroBand from '../components/IntroBand';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import CTABand from '../components/CTABand';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  const [seo, setSeo] = useState({
    title: "CreatifyBD — Creative Agency & Digital Marketing in Dhaka, Bangladesh",
    description: "CreatifyBD is a leading creative agency in Dhaka providing social media marketing, professional photography, web development, and branding services for growth-focused businesses.",
    keywords: "creative agency dhaka, digital marketing agency bangladesh, social media management dhaka, product photography bangladesh, web development agency dhaka, marketing agency bangladesh, logo design dhaka, creatifybd"
  });

  useEffect(() => {
    // Initial reveal for static sections
    setTimeout(observeElements, 500);

    // Optional: Fetch real-time SEO settings from Firestore
    const unsub = onSnapshot(collection(db, 'settings'), (snap) => {
      // SEO logic can be added here
    });

    return () => unsub();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://creatify-bd.web.app" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creatify-bd.web.app" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content="https://creatify-bd.web.app/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://creatify-bd.web.app" />
        <meta property="twitter:title" content={seo.title} />
        <meta property="twitter:description" content={seo.description} />
      </Helmet>

      <Navbar />
      <Hero />
      <Clients />
      <IntroBand />
      <Services />
      <Portfolio />
      <Process />
      <Features />
      <Pricing />
      <Testimonials />
      <CTABand />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
