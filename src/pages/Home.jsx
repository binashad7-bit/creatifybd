import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import useReveal from '../utils/useReveal';

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
import SEO from '../components/SEO';

const Home = () => {
  const [seo, setSeo] = useState({
    title: "Best Creative Agency in Dhaka & Digital Marketing Bangladesh",
    description: "CreatifyBD is the premier digital marketing and creative agency in Dhaka. We specialize in world-class branding, high-performance web development, and strategic social media marketing.",
    keywords: "digital marketing agency dhaka, best creative agency bangladesh, social media management dhaka, web design bangladesh, branding agency dhaka, creatifybd"
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  // Trigger reveal observer after Firestore data has loaded
  useReveal(dataLoaded);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'settings'), (snap) => {
      const siteDoc = snap.docs.find(d => d.id === 'site');
      if (siteDoc) {
        const d = siteDoc.data();
        if (d.seo_title) setSeo(prev => ({ ...prev, title: d.seo_title }));
        if (d.seo_description) setSeo(prev => ({ ...prev, description: d.seo_description }));
      }
      setDataLoaded(true);
    });
    return () => unsub();
  }, []);

  return (
    <div className="App">
      <CustomCursor />
      <SEO 
        title={seo.title} 
        description={seo.description} 
        keywords={seo.keywords}
      />

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
