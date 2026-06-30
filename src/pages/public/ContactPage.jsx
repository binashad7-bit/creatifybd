import React from 'react';
import Navbar from '../../components/Navbar';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';

const EASE_EXPO = [0.16, 1, 0.3, 1];

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
        <div className="container">
          <motion.div
            className="eyebrow"
            style={{ marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_EXPO, delay: 0 }}
          >
            We'd Love to Hear From You
          </motion.div>

          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: EASE_EXPO, delay: 0.08 }}
          >
            Let's <span className="red">Connect</span>
          </motion.h1>

          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_EXPO, delay: 0.2 }}
          >
            Ready to start your next project? Get in touch with our team today.
          </motion.p>
        </div>
      </div>

      <Contact fullPage={true} />
      <Footer />
    </div>
  );
};

export default ContactPage;
