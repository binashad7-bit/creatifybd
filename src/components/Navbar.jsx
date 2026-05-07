import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const MagneticLink = ({ children, href, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.4);
    mouseY.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="Click"
    >
      {children}
    </motion.a>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo">Creatify<span className="dot">BD</span></a>
        <ul className="nav-center">
          <li><MagneticLink href="#services">{t.services}</MagneticLink></li>
          <li><MagneticLink href="#portfolio">{t.portfolio}</MagneticLink></li>
          <li><MagneticLink href="#process">{t.process}</MagneticLink></li>
          <li><MagneticLink href="#pricing">{t.pricing}</MagneticLink></li>
          <li><MagneticLink href="#contact">{t.contact}</MagneticLink></li>
        </ul>
        <div className="nav-right">
          <MagneticLink href="tel:+8801951676600" className="btn-ghost">{t.callUs}</MagneticLink>
          <MagneticLink href="#contact" className="btn-red">{t.cta} →</MagneticLink>
          <button className="hamburger-btn" onClick={toggleMobile} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className="mobile-menu" id="mobileMenu" style={{ display: isMobileOpen ? 'flex' : 'none' }}>
        <a href="#services" onClick={toggleMobile}>Services</a>
        <a href="#portfolio" onClick={toggleMobile}>Our Work</a>
        <a href="#process" onClick={toggleMobile}>Process</a>
        <a href="#pricing" onClick={toggleMobile}>Pricing</a>
        <a href="#contact" onClick={toggleMobile}>Contact</a>
      </div>
    </>
  );
};

export default Navbar;
