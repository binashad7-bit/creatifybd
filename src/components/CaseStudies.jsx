import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TextReveal, FadeReveal, ImageReveal, ParallaxImage } from './MotionReveal';

const masterpieces = [
  { 
    id: 'veldt-co', 
    title: 'Veldt & Co.', 
    sector: 'Luxe Sustainability', 
    tagline: 'Crafting a legacy of conscious living.',
    color: '#E8572A'
  },
  { 
    id: 'aura-labs', 
    title: 'Aura Labs', 
    sector: 'AI Healthcare', 
    tagline: 'Intelligence with a human pulse.',
    color: '#6366F1'
  },
  { 
    id: 'lumina-watch', 
    title: 'Lumina', 
    sector: 'High Horology', 
    tagline: 'The architecture of every second.',
    color: '#B45309'
  }
];

const CaseStudies = () => {
  const [images, setImages] = useState({});
  const { lang } = useLanguage();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'case_study_images'), (snap) => {
      const imgMap = {};
      snap.docs.forEach(doc => { imgMap[doc.id] = doc.data(); });
      setImages(imgMap);
    });
    return () => unsub();
  }, []);

  return (
    <section className="home-cs-section" id="case-studies">
      <div className="container">
        <div className="home-cs-header">
          <FadeReveal>
            <div className="eyebrow" style={{ color: 'var(--red)' }}>Selected Masterpieces</div>
          </FadeReveal>
          <TextReveal className="home-cs-h2">
            {lang === 'bn' ? 'কৌশলগত সমাধান' : 'Strategic Narratives.'}
          </TextReveal>
        </div>

        <div className="home-cs-grid">
          {masterpieces.map((project, index) => {
            const csImages = images[project.id] || {};
            const heroImg = csImages.heroUrl || csImages.resultUrl;

            return (
              <motion.div
                key={project.id}
                className="home-cs-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to="/case-studies" className="home-cs-link-wrap">
                  <div className="home-cs-visual">
                    <ImageReveal>
                      {heroImg ? (
                        <ParallaxImage src={heroImg} alt={project.title} />
                      ) : (
                        <div className="home-cs-placeholder">
                          <span>{project.title.charAt(0)}</span>
                        </div>
                      )}
                    </ImageReveal>
                    <div className="home-cs-overlay" style={{ background: `linear-gradient(to top, ${project.color}cc, transparent)` }}>
                      <div className="home-cs-meta">
                        <span className="home-cs-sector">{project.sector}</span>
                        <h3 className="home-cs-title">{project.title}</h3>
                        <p className="home-cs-tagline">{project.tagline}</p>
                      </div>
                      <div className="home-cs-arrow">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <FadeReveal delay={0.4}>
          <div className="home-cs-footer">
            <Link to="/case-studies" className="btn-huge-red">
              {lang === 'bn' ? 'সব কেস স্টাডি দেখুন' : 'Explore All Stories →'}
            </Link>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
};

export default CaseStudies;
