import React from 'react';
import Navbar from '../../components/Navbar';
import Pricing from '../../components/Pricing';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';

const PricingPage = () => {
  return (
    <div className="pricing-page">
      <SEO 
        title="Transparent Pricing | CreatifyBD"
        description="Affordable and transparent pricing for digital marketing, web development, branding, and video production services in Bangladesh."
      />
      <Navbar theme="light" />
      <div style={{ paddingTop: '80px' }}>
        <Pricing fullPage={false} />
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
