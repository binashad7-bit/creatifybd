import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { ArrowUpRight, Brush, Clapperboard, Layout, Megaphone, PenTool, SearchCheck } from 'lucide-react';
import { db } from '../firebase/config';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { TextReveal, FadeReveal, StaggerReveal } from './MotionReveal';

const fallbackServices = [
  {
    id: 'social-media-management',
    icon: <Megaphone size={28} />,
    title: 'Social Media Management',
    desc: 'Strategy, content calendar, captions, post design, reels direction, publishing support, community replies and performance reports.',
    price: 'Primary service'
  },
  {
    id: 'graphic-design',
    icon: <Brush size={28} />,
    title: 'Graphic Design',
    desc: 'Scroll-stopping social creatives, ad designs, pitch decks, print assets, brand templates and campaign visuals.',
    price: 'Creative studio'
  },
  {
    id: 'video-editing',
    icon: <Clapperboard size={28} />,
    title: 'Video Editing',
    desc: 'Short-form reels, product promos, talking-head edits, subtitles, motion graphics and platform-ready exports.',
    price: 'Reels and ads'
  },
  {
    id: 'digital-marketing',
    icon: <SearchCheck size={28} />,
    title: 'Digital Marketing',
    desc: 'Paid social, campaign funnels, SEO basics, analytics setup, retargeting assets and conversion optimization.',
    price: 'Growth engine'
  },
  {
    id: 'website-design',
    icon: <Layout size={28} />,
    title: 'Website Design',
    desc: 'Modern landing pages and business websites designed for credibility, speed, lead generation and mobile conversion.',
    price: 'Web presence'
  },
  {
    id: 'brand-content',
    icon: <PenTool size={28} />,
    title: 'Brand Content Systems',
    desc: 'Brand voice, content pillars, visual direction and reusable design systems that make every channel feel aligned.',
    price: 'Brand consistency'
  }
];

const Services = ({ highlight = false, fullPage = false }) => {
  const [services, setServices] = useState(fallbackServices);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'services'), (snap) => {
      const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const visible = all
        .filter(s => !s.hidden)
        .sort((a, b) => (a.title || '').localeCompare(b.title || ''));

      if (visible.length > 0) setServices(visible);
      setLoading(false);
    }, () => {
      setServices(fallbackServices);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const displayServices = highlight ? fallbackServices : services;

  return (
    <section
      className={`section services-section international-services ${fullPage ? 'full-page-section' : ''}`}
      id="services"
      aria-busy={loading}
    >
      <div className="container">
        {!fullPage && (
          <div className="services-header text-center">
            <FadeReveal>
              <div className="eyebrow">What we do best</div>
            </FadeReveal>
            <TextReveal className="section-h">
              Social media first. Full creative support around it.
            </TextReveal>
            <FadeReveal delay={0.4}>
              <p className="section-sub">
                We manage the channels that create demand, then support them with premium design, video, ads and websites so your brand looks credible in any market.
              </p>
            </FadeReveal>
          </div>
        )}

        <StaggerReveal delay={0.5}>
          <div className="services-grid">
            {displayServices.map((s, idx) => (
              <FadeReveal key={s.id || idx}>
                <motion.div className={`service-card-premium ${idx === 0 ? 'featured-service-card' : ''}`} whileHover={{ y: -10 }}>
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>

                  <div className="service-card-footer">
                    <span className="service-price">{s.price}</span>
                    <motion.div className="service-arrow">
                      <ArrowUpRight size={20} />
                    </motion.div>
                  </div>
                </motion.div>
              </FadeReveal>
            ))}
          </div>
        </StaggerReveal>

        {highlight && (
          <FadeReveal delay={0.8}>
            <div className="services-footer-cta">
              <a href="/services" className="btn-huge-red">
                {lang === 'bn' ? 'Explore All Services' : 'Explore All Services'}
              </a>
            </div>
          </FadeReveal>
        )}
      </div>
    </section>
  );
};

export default Services;
