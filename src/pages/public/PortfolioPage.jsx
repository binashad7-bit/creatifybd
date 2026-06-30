import React from 'react';
import Navbar from '../../components/Navbar';
import Portfolio from '../../components/Portfolio';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
  return (
    <div className="portfolio-page">
      <SEO
        title="Portfolio | CreatifyBD Creative Work"
        description="Explore CreatifyBD portfolio featuring premium graphic design, branding, and digital marketing projects delivered with excellence."
        keywords="creatifybd portfolio, creative agency work dhaka, web design portfolio bangladesh, digital marketing case studies"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "CreatifyBD Portfolio",
          "description": "Collection of premium digital marketing and design projects by CreatifyBD.",
          "url": "https://creatifybd.com/work"
        }}
      />
      <Navbar />
      <div className="page-header page-header-light">
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
