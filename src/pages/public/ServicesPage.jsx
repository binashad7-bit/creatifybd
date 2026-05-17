import React from 'react';
import Navbar from '../../components/Navbar';
import Services from '../../components/Services';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <SEO 
        title="Our Services | CreatifyBD"
        description="Expert digital marketing, branding, web development, and video production services tailored to elevate your brand presence."
      />
      <Navbar />
      <div className="page-header dark-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <h1 className="page-title">Our <span className="red">Services</span></h1>
          <p className="page-subtitle">Expert digital solutions tailored to elevate your brand presence and drive real results.</p>
        </motion.div>
      </div>
      <Services fullPage={true} />
      <Footer />
    </div>
  );
};

export default ServicesPage;
