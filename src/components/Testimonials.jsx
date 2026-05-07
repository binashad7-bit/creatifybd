import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TextReveal, FadeReveal, ImageReveal } from './MotionReveal';

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'testimonials'), (snap) => {
      setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="section testimonials-editorial" style={{ background: '#fff', padding: '12rem 0', overflow: 'hidden' }}>
      <div className="container">
        <div className="editorial-header" style={{ marginBottom: '8rem', textAlign: 'center' }}>
          <FadeReveal>
            <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: '1.5rem' }}>{lang === 'bn' ? 'আমাদের ক্লায়েন্টদের কথা' : 'Voices of Success'}</div>
          </FadeReveal>
          <TextReveal className="section-h" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#000', lineHeight: 0.95 }}>
            {lang === 'bn' ? 'বিশ্বাস ও ফলাফল' : 'Trusted by the Visionaries.'}
          </TextReveal>
        </div>

        <div className="editorial-content" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8%', alignItems: 'center' }}
            >
              <div className="editorial-quote-box">
                <Quote size={60} style={{ color: 'var(--red)', opacity: 0.1, marginBottom: '2rem' }} />
                <h2 style={{ 
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)', 
                  fontWeight: 800, 
                  color: '#000', 
                  lineHeight: 1.1, 
                  marginBottom: '3rem',
                  fontStyle: 'italic',
                  letterSpacing: '-0.02em'
                }}>
                  "{items[active].text}"
                </h2>
                
                <div className="editorial-author" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div className="author-line" style={{ width: '40px', height: '2px', background: 'var(--red)' }}></div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#000' }}>{items[active].name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.2rem' }}>
                      {items[active].role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="editorial-visual">
                <div className="editorial-img-wrap" style={{ borderRadius: '40px', overflow: 'hidden', height: '600px', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
                  <img 
                    src={items[active].imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop'} 
                    alt={items[active].name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="editorial-nav" style={{ display: 'flex', gap: '1rem', marginTop: '4rem' }}>
            {items.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)}
                style={{ 
                  width: active === i ? '60px' : '12px', 
                  height: '12px', 
                  borderRadius: '100px', 
                  background: active === i ? 'var(--red)' : 'rgba(0,0,0,0.1)', 
                  border: 'none', 
                  cursor: 'pointer',
                  transition: 'all 0.4s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
