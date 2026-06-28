import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { ArrowUpRight, CalendarCheck, Globe2, Megaphone, Play, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { TextReveal, FadeReveal } from './MotionReveal';

const Hero = () => {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

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
          <FadeReveal delay={0}>
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
                {t.cta1}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="#portfolio" className="btn-outline-dark premium-btn-outline">
                {t.cta2}
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
                <strong>Global-ready delivery</strong> across strategy, content, design and reporting
              </div>
            </div>
          </FadeReveal>

        </div>

        <div className="hero-visual">
          <div className="hero-image-static">
            <div className="hero-mockup-wrapper">
              <div className="hero-mockup-inner">
                  <div className="mock-bar">
                    <div className="mock-dot" style={{ background: '#ff5f57' }} />
                    <div className="mock-dot" style={{ background: '#febc2e' }} />
                    <div className="mock-dot" style={{ background: '#28c840' }} />
                    <div className="hero-url-pill">creatifybd.com / social-command-center</div>
                  </div>
                  <div className="mock-body">
                    <div className="mock-sidebar hero-channel-list">
                      <div className="hero-channel active"><Megaphone size={16} />Meta Ads</div>
                      <div className="hero-channel"><Play size={16} />Reels</div>
                      <div className="hero-channel"><Globe2 size={16} />LinkedIn</div>
                    </div>
                    <div className="mock-content hero-dashboard">
                      <div className="hero-dashboard-main">
                        <div className="dashboard-kicker">Monthly social performance</div>
                        <div className="dashboard-number">+168%</div>
                        <div className="dashboard-sub">Qualified engagement growth</div>
                        <div className="dashboard-bars" aria-hidden="true">
                          <span style={{ height: '40%' }} />
                          <span style={{ height: '62%' }} />
                          <span style={{ height: '54%' }} />
                          <span style={{ height: '78%' }} />
                          <span style={{ height: '88%' }} />
                          <span style={{ height: '72%' }} />
                        </div>
                      </div>
                      <div className="hero-dashboard-stack">
                        <div className="dashboard-mini-card">
                          <CalendarCheck size={18} />
                          <strong>30-day content calendar</strong>
                          <span>Posts, stories, reels, captions and approvals.</span>
                        </div>
                        <div className="dashboard-mini-card">
                          <TrendingUp size={18} />
                          <strong>Weekly optimization</strong>
                          <span>Analytics-led creative and campaign iteration.</span>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
