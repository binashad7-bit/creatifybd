import React from 'react';
import Navbar from '../../components/Navbar';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <SEO
        title="Contact CreatifyBD | Start Your Project"
        description="Contact CreatifyBD to discuss branding, digital marketing, web development, content production and creative campaign needs."
        keywords="contact creatifybd, hire creative agency dhaka, digital marketing consultation bangladesh, web design agency contact"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact CreatifyBD",
          "description": "Contact page for CreatifyBD, a premier digital marketing agency in Dhaka.",
          "url": "https://creatifybd.com/contact"
        }}
      />
      <Navbar />
      <div className="page-header page-header-light">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <h1 className="page-title">Let's <span className="red">Connect</span></h1>
          <p className="page-subtitle">Ready to start your next project? Get in touch with our team today.</p>
        </motion.div>
      </div>
      <Contact fullPage={true} />
      <Footer />
    </div>
  );
};

export default ContactPage;
