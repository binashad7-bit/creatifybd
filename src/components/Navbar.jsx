import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { motion, useSpring, useMotionValue, AnimatePresence, useScroll } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

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
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const t = translations[lang].nav;

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <Link to="/" className="nav-logo" data-cursor="Click">Creatify<span className="dot">BD</span></Link>
        
        <ul className="nav-center">
          <li><MagneticLink to="/services" className={pathname === '/services' ? 'active' : ''}>{t.services}</MagneticLink></li>
          <li><MagneticLink to="/work" className={pathname === '/work' ? 'active' : ''}>{t.portfolio}</MagneticLink></li>
          <li><MagneticLink to="/process" className={pathname === '/process' ? 'active' : ''}>{t.process}</MagneticLink></li>
          <li><MagneticLink to="/pricing" className={pathname === '/pricing' ? 'active' : ''}>{t.pricing}</MagneticLink></li>
          <li><MagneticLink to="/contact" className={pathname === '/contact' ? 'active' : ''}>{t.contact}</MagneticLink></li>
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

        {/* Progress Bar */}
        <motion.div 
          className="nav-progress-bar" 
          style={{ 
            scaleX, 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: '2px', 
            background: 'var(--red)', 
            transformOrigin: '0%',
            opacity: scrolled ? 1 : 0
          }} 
        />
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
              <Link to="/services" onClick={toggleMobile} className={pathname === '/services' ? 'active' : ''}>{t.services}</Link>
              <Link to="/work" onClick={toggleMobile} className={pathname === '/work' ? 'active' : ''}>{t.portfolio}</Link>
              <Link to="/process" onClick={toggleMobile} className={pathname === '/process' ? 'active' : ''}>{t.process}</Link>
              <Link to="/pricing" onClick={toggleMobile} className={pathname === '/pricing' ? 'active' : ''}>{t.pricing}</Link>
              <Link to="/contact" onClick={toggleMobile} className={pathname === '/contact' ? 'active' : ''}>{t.contact}</Link>
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
