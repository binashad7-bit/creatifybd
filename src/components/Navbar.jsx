import React, { useEffect, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const whatsappUrl = 'https://wa.me/8801951676600';

const MagneticLink = ({ children, to, className, onClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const y = useSpring(mouseY, { damping: 15, stiffness: 150 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - (rect.left + rect.width / 2)) * 0.4);
    mouseY.set((event.clientY - (rect.top + rect.height / 2)) * 0.4);
  };

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="magnetic-wrap"
    >
      <Link to={to} className={className} onClick={onClick} data-cursor="Click">
        {children}
      </Link>
    </motion.div>
  );
};

const Navbar = ({ theme = 'dark' }) => {
  const { settings } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setIsMobileOpen(false);
  const isActive = (path) => pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <>
      <nav id="navbar" className={`${scrolled ? 'scrolled' : ''} theme-${theme}`}>
        <div className="nav-container-inner">
          <Link to="/" className="nav-logo" data-cursor="Click" aria-label="CreatifyBD home" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={settings?.logo_url || '/favicon.png'} alt="" className="nav-logo-img" style={{ height: '52px', width: 'auto', maxWidth: '64px', objectFit: 'contain' }} />
            <span className="nav-logo-text">
              {settings?.site_name?.split('BD')[0] || 'Creatify'}<span style={{ color: 'var(--red)' }}>BD</span>
            </span>
          </Link>

          <ul className="nav-center">
            <li><MagneticLink to="/services" className={isActive('/services') ? 'active' : ''}>{t.services}{isActive('/services') && <motion.div layoutId="activePill" className="nav-active-pill" />}</MagneticLink></li>
            <li><MagneticLink to="/work" className={isActive('/work') ? 'active' : ''}>Our Work{isActive('/work') && <motion.div layoutId="activePill" className="nav-active-pill" />}</MagneticLink></li>
            <li><MagneticLink to="/case-studies" className={isActive('/case-studies') || isActive('/case-study') ? 'active' : ''}>Case Studies{(isActive('/case-studies') || isActive('/case-study')) && <motion.div layoutId="activePill" className="nav-active-pill" />}</MagneticLink></li>
            <li><MagneticLink to="/process" className={isActive('/process') ? 'active' : ''}>{t.process}{isActive('/process') && <motion.div layoutId="activePill" className="nav-active-pill" />}</MagneticLink></li>
            <li><MagneticLink to="/pricing" className={isActive('/pricing') ? 'active' : ''}>{t.pricing}{isActive('/pricing') && <motion.div layoutId="activePill" className="nav-active-pill" />}</MagneticLink></li>
            <li><MagneticLink to="/contact" className={isActive('/contact') ? 'active' : ''}>{t.contact}{isActive('/contact') && <motion.div layoutId="activePill" className="nav-active-pill" />}</MagneticLink></li>
          </ul>

          <div className="nav-right">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-ghost" data-cursor="Chat">
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp
            </a>
            <Link to="/contact" className="btn-red" data-cursor="Click">
              {t.cta}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <button
              className={`hamburger-btn ${isMobileOpen ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(open => !open)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
              aria-expanded={isMobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu-overlay"
          >
            <div className="mobile-menu-inner">
              <Link to="/services" onClick={closeMobile}>{t.services}</Link>
              <Link to="/work" onClick={closeMobile}>Our Work</Link>
              <Link to="/case-studies" onClick={closeMobile}>Case Studies</Link>
              <Link to="/process" onClick={closeMobile}>{t.process}</Link>
              <Link to="/about" onClick={closeMobile}>About</Link>
              <Link to="/pricing" onClick={closeMobile}>{t.pricing}</Link>
              <Link to="/contact" onClick={closeMobile}>{t.contact}</Link>
              <div className="mobile-menu-footer">
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-red">
                  <MessageCircle size={18} aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
