import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { TextReveal, FadeReveal, ImageReveal } from './MotionReveal';
import { useSettings } from '../context/SettingsContext';
import { siteConfig } from '../config/siteConfig';

const Hero = () => {
  const { lang } = useLanguage();
  const { content } = useSettings();
  const t = translations[lang].hero;
  const heroContent = content?.hero || {};

  const sanitizedTitle = useMemo(() => {
    const rawHtml = heroContent.title || t.title;
    return DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: ['span', 'br', 'strong', 'em'],
      ALLOWED_ATTR: ['class']
    });
  }, [heroContent.title, t.title]);

  return (
    <section className="hero">
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="hero-container">
        <div className="hero-content">
          <FadeReveal delay={0}>
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              {heroContent.eyebrow || t.eyebrow}
            </div>
          </FadeReveal>

          <TextReveal as="h1" className="hero-main-title" delay={0.1}>
            <span dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
          </TextReveal>

          <FadeReveal delay={0.2}>
            <p className="hero-sub">{heroContent.desc || t.desc}</p>
          </FadeReveal>

          <FadeReveal delay={0.3}>
            <div className="hero-actions">
              <a href="#contact" className="btn-red premium-btn">
                {heroContent.cta1 || siteConfig.cta.getProposal}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#portfolio" className="btn-outline-dark premium-btn-outline">
                {heroContent.cta2 || siteConfig.cta.viewPortfolio}
              </a>
            </div>
          </FadeReveal>

          <FadeReveal delay={0.4}>
            <div className="hero-trust">
              <div className="hero-avatars" aria-hidden="true">
                <span className="avatar-initial">FH</span>
                <span className="avatar-initial">TS</span>
                <span className="avatar-initial">GE</span>
              </div>
              <div className="hero-trust-text">
                <strong>5.0 ★</strong> from 100+ clients
              </div>
            </div>
          </FadeReveal>
        </div>

        <div className="hero-visual">
          <ImageReveal delay={0.2}>
            <div className="hero-mockup-wrapper">
              {heroContent.mockup_primary ? (
                <img
                  src={heroContent.mockup_primary}
                  alt="CreatifyBD creative growth showcase"
                  className="hero-mockup-img"
                  loading="eager"
                  fetchpriority="high"
                />
              ) : (
                <div className="hero-mockup-wrap" style={{ textAlign: 'left' }}>
                  <div className="mock-bar" style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}>
                    <div className="mock-dot" style={{ background: '#ff5f57', width: '12px', height: '12px', borderRadius: '50%', marginRight: '6px' }} />
                    <div className="mock-dot" style={{ background: '#febc2e', width: '12px', height: '12px', borderRadius: '50%', marginRight: '6px' }} />
                    <div className="mock-dot" style={{ background: '#28c840', width: '12px', height: '12px', borderRadius: '50%', marginRight: '12px' }} />
                    <div style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.75rem', padding: '2px 12px', borderRadius: '4px', color: '#666', fontFamily: 'monospace' }}>creatifybd.com/client/orders</div>
                  </div>
                  
                  <div className="dashboard-mockup-grid" style={{ padding: '1rem' }}>
                    {/* Sidebar */}
                    <div className="mock-sidebar">
                      <div className="mock-sb-item active" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
                        📊 Dashboard
                      </div>
                      <div className="mock-sb-item" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', color: '#888', fontSize: '0.8rem' }}>
                        📋 Intake Brief
                      </div>
                      <div className="mock-sb-item" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', color: '#888', fontSize: '0.8rem' }}>
                        🚚 Deliveries
                      </div>
                      <div className="mock-sb-item" style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', color: '#888', fontSize: '0.8rem' }}>
                        💬 Revisions
                      </div>
                    </div>

                    {/* Main Workspace content */}
                    <div className="mock-content-panel">
                      {/* Left Block: Stats / Status */}
                      <div className="mock-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>Active Campaign Performance</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--red)', fontWeight: 700, background: 'rgba(232,25,44,0.1)', padding: '2px 8px', borderRadius: '12px' }}>Live Track</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#666' }}>SMM Reach</span>
                            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginTop: '2px' }}>+142.8%</span>
                          </div>
                          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#666' }}>CTR Avg</span>
                            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginTop: '2px' }}>+18.3%</span>
                          </div>
                          <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '8px' }}>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#666' }}>Completed</span>
                            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#22c55e', marginTop: '2px' }}>24 Gigs</span>
                          </div>
                        </div>

                        {/* Mini Activity calendar */}
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>Delivery Schedule Timeline</span>
                          <div className="calendar-grid">
                            <div className="calendar-day active"><span>M</span><div className="active-bar-content" style={{ width: '90%' }} /></div>
                            <div className="calendar-day active"><span>T</span><div className="active-bar-content" style={{ width: '40%' }} /></div>
                            <div className="calendar-day active"><span>W</span><div className="active-bar-content" style={{ width: '80%', background: '#22c55e' }} /></div>
                            <div className="calendar-day"><span>T</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Right Block: File Downloads */}
                      <div className="mock-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>Recent Deliveries</span>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.4rem 0.6rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>SMM_Post_v2.png</span>
                              <span style={{ fontSize: '0.6rem', color: '#555' }}>Approved · Graphic Design</span>
                            </div>
                            <span style={{ fontSize: '0.65rem', color: 'var(--red)', cursor: 'pointer' }}>⬇ Download</span>
                          </div>

                          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.4rem 0.6rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>Campaign_Teaser.mp4</span>
                              <span style={{ fontSize: '0.6rem', color: '#555' }}>Delivered · Video Edit</span>
                            </div>
                            <span style={{ fontSize: '0.65rem', color: 'var(--red)', cursor: 'pointer' }}>⬇ Download</span>
                          </div>
                        </div>
                      </div>
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
