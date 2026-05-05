import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo">Creatify<span className="dot">BD</span></a>
        <ul className="nav-center">
          <li><a href="#services">{t.services}</a></li>
          <li><a href="#portfolio">{t.portfolio}</a></li>
          <li><a href="#process">{t.process}</a></li>
          <li><a href="#pricing">{t.pricing}</a></li>
          <li><a href="#contact">{t.contact}</a></li>
        </ul>
        <div className="nav-right">
          <a href="tel:+8801951676600" className="btn-ghost">{t.callUs}</a>
          <a href="#contact" className="btn-red">{t.cta} →</a>
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
