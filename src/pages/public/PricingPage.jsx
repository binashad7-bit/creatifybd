import React from 'react';
import Navbar from '../../components/Navbar';
import Pricing from '../../components/Pricing';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

const PricingPage = () => {
  return (
    <div className="pricing-page">
      <Navbar theme="light" />
      <div style={{ paddingTop: '80px' }}>
        <Pricing fullPage={false} />
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
