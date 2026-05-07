import React from 'react';
import Navbar from '../../components/Navbar';
import Portfolio from '../../components/Portfolio';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
  return (
    <div className="portfolio-page">
      <CustomCursor />
      <Navbar />
      <div className="page-header">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <h1 className="page-title">Our <span className="red">Work</span></h1>
          <p className="page-subtitle">A collection of 200+ premium graphic design, branding, and AI-driven projects delivered with excellence.</p>
        </motion.div>
      </div>
      <Portfolio fullPage={true} />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
