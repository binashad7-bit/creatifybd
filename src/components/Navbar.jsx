import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';


const MagneticLink = ({ children, to, className, onClick }) => {
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
    <motion.div
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrap"
    >
      <Link
        to={to}
        className={className}
        onClick={onClick}
        data-cursor="Click"
      >
        {children}
      </Link>
    </motion.div>
  );
};

const Navbar = ({ theme = 'dark' }) => {
  const { settings } = useSettings();
  const [scrolled, setScrolled] = useState(false);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [workDropdown, setWorkDropdown] = useState(false);
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const t = translations[lang].nav;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setWorkDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const isActive = (path) => pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <>
      <nav id="navbar" className={`${scrolled ? 'scrolled' : ''} theme-${theme}`}>
        <div className="nav-container-inner">
          <Link to="/" className="nav-logo" data-cursor="Click" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={settings?.logo_url || '/favicon.png'} alt={settings?.site_name || 'CreatifyBD'} className="nav-logo-img" style={{ height: '52px', width: 'auto' }} />
            <span className="nav-logo-text">
              {settings?.site_name?.split('BD')[0] || 'Creatify'}<span style={{ color: 'var(--red)' }}>BD</span>
            </span>
          </Link>
          
          <ul className="nav-center">
            <li>
              <MagneticLink to="/services" className={isActive('/services') ? 'active' : ''}>
                {t.services}
                {isActive('/services') && (
                  <motion.div layoutId="activePill" className="nav-active-pill" />
                )}
              </MagneticLink>
            </li>

            <li>
              <MagneticLink to="/work" className={isActive('/work') ? 'active' : ''}>
                {lang === 'bn' ? 'আমাদের কাজ' : 'Our Work'}
                {isActive('/work') && (
                  <motion.div layoutId="activePill" className="nav-active-pill" />
                )}
              </MagneticLink>
            </li>

            <li>
              <MagneticLink to="/process" className={isActive('/process') ? 'active' : ''}>
                {t.process}
                {isActive('/process') && (
                  <motion.div layoutId="activePill" className="nav-active-pill" />
                )}
              </MagneticLink>
            </li>

            <li>
              <MagneticLink to="/pricing" className={isActive('/pricing') ? 'active' : ''}>
                {t.pricing}
                {isActive('/pricing') && (
                  <motion.div layoutId="activePill" className="nav-active-pill" />
                )}
              </MagneticLink>
            </li>

            <li>
              <MagneticLink to="/contact" className={isActive('/contact') ? 'active' : ''}>
                {t.contact}
                {isActive('/contact') && (
                  <motion.div layoutId="activePill" className="nav-active-pill" />
                )}
              </MagneticLink>
            </li>
          </ul>

          <div className="nav-right">
            <a href="tel:+8801951676600" className="btn-ghost" data-cursor="Call">{t.callUs}</a>
            <Link to="/contact" className="btn-red" data-cursor="Click">{t.cta} →</Link>
            <button 
              className={`hamburger-btn ${isMobileOpen ? 'active' : ''}`} 
              onClick={toggleMobile} 
              aria-label="Menu"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ pointerEvents: isMobileOpen ? 'auto' : 'none' }}
            className="mobile-menu-overlay"
          >
            <div className="mobile-menu-inner">
              <Link to="/services" onClick={toggleMobile}>{t.services}</Link>
              <Link to="/work" onClick={toggleMobile}>{lang === 'bn' ? 'আমাদের কাজ' : 'Our Work'}</Link>
              <Link to="/process" onClick={toggleMobile}>{t.process}</Link>
              <Link to="/about" onClick={toggleMobile}>{lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About'}</Link>
              <Link to="/pricing" onClick={toggleMobile}>{t.pricing}</Link>
              <Link to="/contact" onClick={toggleMobile}>{t.contact}</Link>
              <div className="mobile-menu-footer">
                <a href="tel:+8801951676600" className="btn-red" style={{ width: '100%', justifyContent: 'center' }}>{t.callUs}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
        <filter id="black-to-white">
          <feColorMatrix type="matrix" values="
            0 0 0 0 1
            -1 0 0 1 0
            -1 0 0 1 0
            0 0 0 1 0
          " />
        </filter>
      </svg>
    </>
  );
};

export default Navbar;
