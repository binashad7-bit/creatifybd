import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

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

const Navbar = () => {
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
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-container-inner">
          <Link to="/" className="nav-logo" data-cursor="Click">Creatify<span className="dot">BD</span></Link>
          
          <ul className="nav-center">
            <li>
              <MagneticLink to="/services" className={isActive('/services') ? 'active' : ''}>
                {t.services}
                {isActive('/services') && (
                  <motion.div layoutId="activePill" className="nav-active-pill" />
                )}
              </MagneticLink>
            </li>

            <li 
              className="nav-dropdown-trigger" 
              ref={dropdownRef}
              onMouseEnter={() => setWorkDropdown(true)}
              onMouseLeave={() => setWorkDropdown(false)}
            >
              <div className={`nav-link-wrap ${isActive('/work') || isActive('/case-studies') ? 'active' : ''}`}>
                <span>{lang === 'bn' ? 'আমাদের কাজ' : 'Our Work'}</span>
                <ChevronDown size={14} className={`dropdown-chevron ${workDropdown ? 'open' : ''}`} />
                {(isActive('/work') || isActive('/case-studies')) && (
                  <motion.div layoutId="activePill" className="nav-active-pill" />
                )}
              </div>
              
              <AnimatePresence>
                {workDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="nav-dropdown-menu"
                  >
                    <Link to="/work" className="dropdown-item" onClick={() => setWorkDropdown(false)}>
                      <span className="dropdown-label">{lang === 'bn' ? 'পোর্টফোলিও' : 'Our Works'}</span>
                      <span className="dropdown-desc">{lang === 'bn' ? 'সব প্রজেক্ট দেখুন' : 'View all projects'}</span>
                    </Link>
                    <Link to="/case-studies" className="dropdown-item" onClick={() => setWorkDropdown(false)}>
                      <span className="dropdown-label">{lang === 'bn' ? 'কেস স্টাডিজ' : 'Case Studies'}</span>
                      <span className="dropdown-desc">{lang === 'bn' ? 'বিস্তারিত গল্প' : 'Deep dive stories'}</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
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
            className="mobile-menu-overlay"
          >
            <div className="mobile-menu-inner">
              <Link to="/services" onClick={toggleMobile}>{t.services}</Link>
              <div className="mobile-sub-group">
                <span className="mobile-sub-title">{lang === 'bn' ? 'কাজ' : 'Our Work'}</span>
                <Link to="/work" onClick={toggleMobile} style={{ paddingLeft: '1.5rem' }}>{lang === 'bn' ? 'সব কাজ' : 'Our Works'}</Link>
                <Link to="/case-studies" onClick={toggleMobile} style={{ paddingLeft: '1.5rem' }}>{lang === 'bn' ? 'কেস স্টাডিজ' : 'Case Studies'}</Link>
              </div>
              <Link to="/process" onClick={toggleMobile}>{t.process}</Link>
              <Link to="/pricing" onClick={toggleMobile}>{t.pricing}</Link>
              <Link to="/contact" onClick={toggleMobile}>{t.contact}</Link>
              <div className="mobile-menu-footer">
                <a href="tel:+8801951676600" className="btn-red" style={{ width: '100%', justifyContent: 'center' }}>{t.callUs}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
