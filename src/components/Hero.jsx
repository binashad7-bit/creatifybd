import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { TextReveal, FadeReveal, ImageReveal } from './MotionReveal';
import { useSettings } from '../context/SettingsContext';

const Hero = () => {
  const { lang } = useLanguage();
  const { content } = useSettings();
  const t = translations[lang].hero;
  
  const heroContent = content?.hero || {};

  // Sanitize HTML content to prevent XSS attacks
  const sanitizedTitle = useMemo(() => {
    const rawHtml = heroContent.title || t.title;
    return DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: ['span', 'br', 'strong', 'em'],
      ALLOWED_ATTR: ['class']
    });
  }, [heroContent.title, t.title]);

  return (
    <section className="hero">
      {/* Background glow effects */}
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="hero-container">
        {/* Left: Content */}
        <div className="hero-content">
          <FadeReveal delay={0}>
            <div className="hero-eyebrow">
              <span className="pulse-dot"></span>
              {heroContent.eyebrow || t.eyebrow}
            </div>
          </FadeReveal>
          
          <TextReveal className="hero-main-title" delay={0.1}>
            <h1 dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
          </TextReveal>
          
          <FadeReveal delay={0.2}>
            <p className="hero-sub">{heroContent.desc || t.desc}</p>
          </FadeReveal>
          
          <FadeReveal delay={0.3}>
            <div className="hero-actions">
              <a href="#contact" className="btn-red premium-btn">
                {heroContent.cta1 || t.cta1}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#portfolio" className="btn-outline-dark premium-btn-outline">
                {heroContent.cta2 || t.cta2}
              </a>
            </div>
          </FadeReveal>

          {/* Social Proof Mini */}
          <FadeReveal delay={0.4}>
             <div className="hero-trust">
               <div className="hero-avatars">
                 <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" />
                 <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Client" />
                 <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="Client" />
               </div>
               <div className="hero-trust-text">
                 <strong>5.0 ★</strong> from 100+ clients
               </div>
             </div>
          </FadeReveal>
        </div>

        {/* Right: Visual */}
        <div className="hero-visual">
          <ImageReveal delay={0.2}>
            <div className="hero-mockup-wrapper">
              {heroContent.mockup_primary ? (
                <img src={heroContent.mockup_primary} alt="CreatifyBD Dashboard" className="hero-mockup-img" />
              ) : (
                <div className="hero-mockup-inner">
                  {/* Fallback CSS Mockup */}
                  <div className="mock-bar">
                    <div className="mock-dot" style={{ background: '#ff5f57' }}></div>
                    <div className="mock-dot" style={{ background: '#febc2e' }}></div>
                    <div className="mock-dot" style={{ background: '#28c840' }}></div>
                    <div style={{ flex: 1, marginLeft: '1rem', background: 'rgba(255,255,255,0.06)', height: '22px', borderRadius: '6px', maxWidth: '280px' }}></div>
                  </div>
                  <div className="mock-body">
                    <div className="mock-sidebar">
                      <div className="mock-sidebar-item active"></div>
                      <div className="mock-sidebar-item" style={{ width: '70%' }}></div>
                      <div className="mock-sidebar-item" style={{ width: '85%' }}></div>
                    </div>
                    <div className="mock-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)' }}>Digital Growth</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ImageReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
