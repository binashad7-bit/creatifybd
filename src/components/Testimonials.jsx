import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TextReveal, FadeReveal, ImageReveal } from './MotionReveal';
import OptimizedImage from './OptimizedImage';

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
    <section className="section testimonials-editorial" id="testimonials">
      <div className="container">
        <div className="editorial-header">
          <FadeReveal>
            <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: '1.5rem' }}>{lang === 'bn' ? 'আমাদের ক্লায়েন্টদের কথা' : 'Voices of Success'}</div>
          </FadeReveal>
          <TextReveal className="section-h">
            {lang === 'bn' ? 'বিশ্বাস ও ফলাফল' : 'Trusted by the Visionaries.'}
          </TextReveal>
        </div>

        <div className="editorial-content">
          <AnimatePresence mode="wait">
            <motion.div 
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-slide"
            >
              <div className="editorial-quote-box">
                <Quote size={60} className="editorial-quote-icon" />
                <h2 className="editorial-quote-text">
                  "{items[active].text}"
                </h2>
                
                <div className="editorial-author">
                  <div className="author-line"></div>
                  <div>
                    <div className="author-name">{items[active].name}</div>
                    <div className="author-role">
                      {items[active].role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="editorial-visual">
                <div className="editorial-img-wrap">
                  <OptimizedImage 
                    src={items[active].imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop'} 
                    alt={items[active].name} 
                    className="editorial-img"
                  />
                  <div className="editorial-img-overlay"></div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="editorial-nav">
            {items.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)}
                className={`editorial-nav-dot ${active === i ? 'active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

  );
};

export default Testimonials;
