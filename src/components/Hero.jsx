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
                <div className="hero-light-dashboard">
                  <div className="hero-dash-top">
                    <div>
                      <span>CreatifyBD Growth Studio</span>
                      <strong>June Content Plan</strong>
                    </div>
                    <em>On Track</em>
                  </div>

                  <div className="hero-dash-metrics">
                    <div><small>Posts ready</small><strong>24</strong></div>
                    <div><small>Reels planned</small><strong>6</strong></div>
                    <div><small>Avg. response</small><strong>24h</strong></div>
                  </div>

                  <div className="hero-content-list">
                    {['Social calendar approved', 'Ad creative concepts drafted', 'Landing page copy reviewed'].map(item => (
                      <div key={item}>
                        <CheckCircle2 size={17} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="hero-feed-card">
                    <div className="hero-feed-image" />
                    <div>
                      <strong>Next deliverable</strong>
                      <p>Branded carousel set for a local service business targeting US homeowners.</p>
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
