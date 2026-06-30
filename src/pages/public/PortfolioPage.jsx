import React from 'react';
import Navbar from '../../components/Navbar';
import Portfolio from '../../components/Portfolio';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';

const EASE_EXPO = [0.16, 1, 0.3, 1];

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
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_EXPO, delay: 0 }}
            className="eyebrow"
            style={{ marginBottom: '1rem' }}
          >
            200+ Projects Delivered
          </motion.div>

          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.08 }}
          >
            Our <span className="red">Work</span>
          </motion.h1>

          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_EXPO, delay: 0.2 }}
          >
            A collection of 200+ premium graphic design, branding, and AI-driven projects delivered with excellence.
          </motion.p>
        </div>
      </div>

      <Portfolio fullPage={true} />
      <Footer />
    </div>
  );
};

export default PortfolioPage;
