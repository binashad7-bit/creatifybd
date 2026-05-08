import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TextReveal, FadeReveal, StaggerReveal } from './MotionReveal';

const Services = ({ highlight = false, fullPage = false }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'services'), (snap) => {
      const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = all.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      setServices(sorted.filter(s => !s.hidden));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const displayServices = highlight ? services.slice(0, 6) : services;

  if (loading && services.length === 0) return null;

  return (
    <section className={`section services-section ${fullPage ? 'full-page-section' : ''}`} id="services" style={{ background: '#fff' }}>
      <div className="container">
        {!fullPage && (
          <div className="services-header" style={{ marginBottom: '6rem', textAlign: 'center' }}>
            <FadeReveal>
              <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: '1.5rem' }}>{lang === 'bn' ? 'আমরা যা অফার করি' : 'Our Expertise'}</div>
            </FadeReveal>
            <TextReveal className="section-h" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#000' }}>
              {lang === 'bn' ? 'সৃজনশীল পরিষেবা' : 'Design. Strategy. Growth.'}
            </TextReveal>
            <FadeReveal delay={0.4}>
              <p className="section-sub" style={{ color: 'rgba(0,0,0,0.6)', maxWidth: '600px', margin: '2rem auto' }}>
                {lang === 'bn' ? 'আপনার ব্র্যান্ডের প্রসারে আমরা দিচ্ছি আধুনিক ও কার্যকর ডিজিটাল সমাধান।' : 'We blend absolute creativity with strategic precision to scale your brand in the digital age.'}
              </p>
            </FadeReveal>
          </div>
        )}

        <StaggerReveal delay={0.5}>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {displayServices.map((s, idx) => (
              <FadeReveal key={s.id || idx}>
                <motion.div 
                  className="service-card-premium" 
                  whileHover={{ y: -12 }}
                  style={{ 
                    padding: '3.5rem 3rem', 
                    background: '#fcfcfc', 
                    borderRadius: '40px', 
                    border: '1px solid rgba(0,0,0,0.05)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.borderColor = 'var(--red)';
                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#fcfcfc';
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="service-icon" style={{ fontSize: '3rem', marginBottom: '2.5rem' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#000', marginBottom: '1.2rem' }}>{s.title}</h3>
                  <p style={{ color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, fontSize: '1.05rem', marginBottom: '2rem', flex: 1 }}>{s.desc}</p>
                  
                  <div className="service-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--red)', fontWeight: 800, fontSize: '0.9rem' }}>{s.price}</span>
                    <motion.div 
                      className="service-arrow"
                      style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <ArrowUpRight size={20} color="#000" />
                    </motion.div>
                  </div>
                </motion.div>
              </FadeReveal>
            ))}
          </div>
        </StaggerReveal>

        {highlight && (
          <FadeReveal delay={0.8}>
            <div style={{ marginTop: '5rem', textAlign: 'center' }}>
              <a href="/services" className="btn-huge-red">
                {lang === 'bn' ? 'সব সার্ভিস দেখুন' : 'Explore All Services →'}
              </a>
            </div>
          </FadeReveal>
        )}
      </div>
    </section>
  );
};

export default Services;
