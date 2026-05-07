import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { TextReveal, ImageReveal, FadeReveal } from './MotionReveal';

const masterpieces = [
  { id: 'veldt-co', title: 'Veldt & Co.', sector: 'Luxe Sustainability', tagline: 'Conscious Craftsmanship, Redefined.' },
  { id: 'aura-labs', title: 'Aura Labs', sector: 'AI Healthcare', tagline: 'Intelligence with a Human Pulse.' },
  { id: 'lumina-watch', title: 'Lumina', sector: 'High Horology', tagline: 'The Architecture of Time.' }
];

const ParallaxImage = ({ src, alt }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  return (
    <motion.img 
      ref={ref}
      src={src} 
      alt={alt} 
      className="duck-cs-img" 
      style={{ y, scale: 1.15 }} 
    />
  );
};

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
    <section className="duck-cs-section" id="case-studies" style={{ background: '#fff', padding: '10rem 0' }}>
      <div className="container">
        <div className="cs-intro" style={{ marginBottom: '6rem', textAlign: 'center' }}>
          <FadeReveal>
            <div className="eyebrow" style={{ color: 'var(--red)' }}>
              {lang === 'bn' ? 'নির্বাচিত কেস স্টাডিজ' : 'Selected Case Studies'}
            </div>
          </FadeReveal>
          <TextReveal className="duck-h" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#000' }}>
            {lang === 'bn' ? 'কৌশলগত সমাধান' : 'Strategic Narratives.'}
          </TextReveal>
        </div>

        <div className="duck-cs-list">
          {masterpieces.map((project, index) => {
            const csImages = images[project.id] || {};
            const heroImg = csImages.heroUrl || csImages.resultUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop';
            const isReversed = index % 2 !== 0;
            
            return (
              <div 
                key={project.id} 
                className="duck-cs-item" 
                style={{ 
                  display: 'flex', 
                  flexDirection: isReversed ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  gap: '10%',
                  marginBottom: '10rem'
                }}
              >
                <div className="duck-cs-info" style={{ flex: 1 }}>
                  <FadeReveal delay={0.2}>
                    <div className="duck-cs-num" style={{ color: 'var(--red)', fontWeight: 800, letterSpacing: '0.3em', marginBottom: '1.5rem' }}>0{index + 1}</div>
                  </FadeReveal>
                  <TextReveal className="duck-cs-title" delay={0.3} style={{ color: '#000', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, lineHeight: 0.95 }}>
                    {project.title}
                  </TextReveal>
                  <FadeReveal delay={0.5}>
                    <div className="duck-cs-tags" style={{ marginTop: '1.2rem' }}>
                      <span className="duck-tag" style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '0.35rem 0.9rem', borderRadius: '100px', fontSiz: '0.7rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>{project.sector}</span>
                    </div>
                    <p className="duck-cs-desc" style={{ color: 'rgba(0,0,0,0.6)', margin: '1.2rem 0 2rem', fontSize: '1rem', fontWeight: 300, lineHeight: 1.6 }}>
                      {project.tagline}
                    </p>
                    <Link to="/case-studies" className="duck-cs-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
                      {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Masterpiece'} <ArrowRight size={18} />
                    </Link>
                  </FadeReveal>
                </div>
                <div className="duck-cs-visual" style={{ flex: 1 }}>
                  <ImageReveal delay={1.5}>
                    <div className="duck-cs-img-wrap" style={{ borderRadius: '32px', overflow: 'hidden', height: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                      <ParallaxImage src={heroImg} alt={project.title} />
                    </div>
                  </ImageReveal>
                </div>
              </div>
            );
          })}
        </div>

        <FadeReveal delay={0.6}>
          <div className="duck-cs-footer" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/case-studies" className="btn-huge-red">
              {lang === 'bn' ? 'সব কেস স্টাডি দেখুন' : 'View All 10 Case Studies →'}
            </Link>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
};

export default CaseStudies;
