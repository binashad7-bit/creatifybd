import React, { useEffect, useMemo, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, Clapperboard, Code2, Megaphone, Palette } from 'lucide-react';
import { TextReveal, FadeReveal, StaggerReveal } from './MotionReveal';

const defaultServices = [
  {
    id: 'signature-social-media-manager',
    icon: <BarChart3 size={28} />,
    title: 'Managed Social Media Growth',
    desc: 'Monthly content calendars, post design, captions, scheduling, community support, and analytics for busy small businesses.',
    price: 'From $299/mo',
    badge: 'Most requested'
  },
  {
    id: 'graphic-design',
    icon: <Palette size={28} />,
    title: 'Graphic Design',
    desc: 'Brand kits, logo systems, ad creatives, flyers, carousels, and social templates built for clear conversion.',
    price: 'From $45'
  },
  {
    id: 'video-editing',
    icon: <Clapperboard size={28} />,
    title: 'Video Editing',
    desc: 'Short-form reels, promotional videos, YouTube edits, captions, hooks, pacing, and platform-ready exports.',
    price: 'From $60'
  },
  {
    id: 'digital-marketing',
    icon: <Megaphone size={28} />,
    title: 'Digital Marketing',
    desc: 'Campaign planning, ad creative direction, landing-page funnels, lead magnets, and monthly performance insight.',
    price: 'Custom quote'
  },
  {
    id: 'website-design',
    icon: <Code2 size={28} />,
    title: 'Website Design',
    desc: 'Fast, responsive business websites, landing pages, redesigns, SEO foundations, and inquiry-focused UX.',
    price: 'From $249'
  }
];

const Services = ({ highlight = false, fullPage = false }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'services'),
      (snap) => {
        const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const sorted = all.sort((a, b) => (a.order || 0) - (b.order || 0) || (a.title || '').localeCompare(b.title || ''));
        setServices(sorted.filter(s => !s.hidden));
      },
      () => setServices([])
    );
    return () => unsub();
  }, []);

  const displayServices = useMemo(() => {
    const source = services.length > 0 ? services : defaultServices;
    const signature = source.find(item => /social media manager|social media management/i.test(item.title || ''));
    const ordered = signature ? [signature, ...source.filter(item => item.id !== signature.id)] : source;
    return highlight ? ordered.slice(0, 5) : ordered;
  }, [highlight, services]);

  return (
    <section className={`section services-section ${fullPage ? 'full-page-section' : ''}`} id="services">
      <div className="container">
        {!fullPage && (
          <div className="services-header text-center">
            <FadeReveal>
              <div className="eyebrow">Our Expertise</div>
            </FadeReveal>
            <TextReveal className="section-h">
              Practical creative services for modern small businesses
            </TextReveal>
            <FadeReveal delay={0.2}>
              <p className="section-sub">
                We package the most requested creative and growth services for small businesses in the USA, Canada, Australia, and other international markets.
              </p>
            </FadeReveal>
          </div>
        )}

        <StaggerReveal delay={0.2}>
          <div className="services-grid">
            {displayServices.map((service, idx) => (
              <FadeReveal key={service.id || idx}>
                <motion.article className={`service-card-premium ${idx === 0 ? 'is-signature' : ''}`} whileHover={{ y: -8 }}>
                  <div className="service-icon">{service.icon}</div>
                  {service.badge && <span className="service-badge">{service.badge}</span>}
                  <h3>{service.title}</h3>
                  <p>{service.desc || service.description}</p>

                  <div className="service-card-footer">
                    <span className="service-price">{service.price || 'Custom quote'}</span>
                    <Link
                      to="/contact"
                      className="service-cta"
                    >
                      <span className="service-arrow">
                        Get a Proposal
                        <ArrowUpRight size={16} />
                      </span>
                    </Link>
                  </div>
                </motion.article>
              </FadeReveal>
            ))}
          </div>
        </StaggerReveal>

        {highlight && (
          <FadeReveal delay={0.4}>
            <div className="section-action">
              <Link to="/services" className="btn-huge-red">Explore All Services</Link>
            </div>
          </FadeReveal>
        )}
      </div>
    </section>
  );
};

export default Services;
