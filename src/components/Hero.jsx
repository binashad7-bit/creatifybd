import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { FadeReveal, ImageReveal, TextReveal } from './MotionReveal';
import { useSettings } from '../context/SettingsContext';
import { siteConfig } from '../config/siteConfig';

const Hero = () => {
  const { lang } = useLanguage();
  const { content } = useSettings();
  const t = translations[lang].hero;
  const heroContent = content?.hero || {};

  const sanitizedTitle = useMemo(() => {
    const rawHtml = t.title;
    return DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: ['span', 'br', 'strong', 'em'],
      ALLOWED_ATTR: ['class']
    });
  }, [t.title]);

  return (
    <section className="hero">
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="hero-container">
        <div className="hero-content">
          <FadeReveal>
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              {t.eyebrow}
            </div>
          </FadeReveal>

          <TextReveal as="h1" className="hero-main-title" delay={0.1}>
            <span dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
          </TextReveal>

          <FadeReveal delay={0.2}>
            <p className="hero-sub">{t.desc}</p>
          </FadeReveal>

          <FadeReveal delay={0.3}>
            <div className="hero-actions">
              <a href="#contact" className="btn-red premium-btn">
                {siteConfig.cta.getProposal}
                <ArrowRight size={18} />
              </a>
              <a href="#portfolio" className="btn-outline-dark premium-btn-outline">
                {siteConfig.cta.viewPortfolio}
              </a>
            </div>
          </FadeReveal>

          <FadeReveal delay={0.4}>
            <div className="hero-trust">
              <div className="hero-avatars" aria-hidden="true">
                <span className="avatar-initial">US</span>
                <span className="avatar-initial">CA</span>
                <span className="avatar-initial">AU</span>
              </div>
              <div className="hero-trust-text">
                <strong>5.0 client experience</strong> for small-business creative support
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
                <div className="hero-mockup-wrap">
                  <div className="dashboard-mockup-grid">
                    <div className="mock-sidebar">
                      <div className="mock-sb-item mock-sb-item-active">
                        📊 Campaigns
                      </div>
                      <div className="mock-sb-item">
                        🚚 Deliveries
                      </div>
                      <div className="mock-sb-item">
                        📋 Intake Brief
                      </div>
                      <div className="mock-sb-item">
                        💬 Revisions
                      </div>
                    </div>
                    <div className="mock-content-panel">
                      <div className="mock-card">
                        <h3 className="mock-card-title">Campaign Performance</h3>
                        <div className="mock-stats-grid">
                          <div className="mock-stat-item">
                            <small className="mock-stat-label">Content Calendar</small>
                            <strong className="mock-stat-value mock-stat-value-red">Active</strong>
                          </div>
                          <div className="mock-stat-item">
                            <small className="mock-stat-label">Posts Ready</small>
                            <strong className="mock-stat-value">12</strong>
                          </div>
                          <div className="mock-stat-item">
                            <small className="mock-stat-label">Scheduled</small>
                            <strong className="mock-stat-value">8</strong>
                          </div>
                        </div>
                        <div className="mock-schedule-section">
                          <small className="mock-schedule-label">Weekly Schedule</small>
                          <div className="calendar-grid">
                            <div className="calendar-day active"><span>Mon</span><div className="active-bar-content" /></div>
                            <div className="calendar-day active"><span>Tue</span><div className="active-bar-content" /></div>
                            <div className="calendar-day active calendar-day-green"><span>Wed</span><div className="active-bar-content active-bar-content-green" /></div>
                            <div className="calendar-day"><span>Thu</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="mock-card">
                        <h3 className="mock-card-title">Recent Deliveries</h3>
                        <div className="mock-deliveries-list">
                          <div className="mock-delivery-item">
                            <span className="mock-delivery-name">SMM_Post_v2.png</span>
                            <span className="mock-delivery-action">⬇ Download</span>
                          </div>
                          <div className="mock-delivery-item">
                            <span className="mock-delivery-name">Campaign_Teaser.mp4</span>
                            <span className="mock-delivery-action">⬇ Download</span>
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
