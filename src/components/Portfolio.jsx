import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { TextReveal, ImageReveal, FadeReveal, StaggerReveal } from './MotionReveal';

const CATS = [
  { key: 'all', label: 'All Work', label_bn: 'সব কাজ' },
  { key: 'case-study', label: 'Case Studies', label_bn: 'কেস স্টাডিজ' },
  { key: 'graphic', label: 'Graphic Design', label_bn: 'গ্রাফিক ডিজাইন' },
  { key: 'branding', label: 'Branding', label_bn: 'ব্র্যান্ডিং' },
  { key: 'web', label: 'Web Design', label_bn: 'ওয়েব ডিজাইন' },
  { key: 'video', label: 'Video', label_bn: 'ভিডিও' },
];

const CAT_DISPLAY = {
  'case-study': 'Case Study',
  graphic: 'Graphic Design',
  branding: 'Branding',
  web: 'Web Design',
  video: 'Video',
};

const masterpieceData = [
  { id: 'veldt-co', title: 'Veldt & Co.', category: 'case-study', isMasterpiece: true },
  { id: 'aura-labs', title: 'Aura Labs', category: 'case-study', isMasterpiece: true },
  { id: 'lumina-watch', title: 'Lumina Watchmaking', category: 'case-study', isMasterpiece: true },
  { id: 'nomad-brews', title: 'Nomad Brews', category: 'case-study', isMasterpiece: true },
  { id: 'vertex-fintech', title: 'Vertex FinTech', category: 'case-study', isMasterpiece: true },
  { id: 'solis-energy', title: 'Solis Energy', category: 'case-study', isMasterpiece: true },
  { id: 'kyber-sec', title: 'Kyber Security', category: 'case-study', isMasterpiece: true },
  { id: 'echo-skincare', title: 'Echo Skincare', category: 'case-study', isMasterpiece: true },
  { id: 'arcane-spirits', title: 'Arcane Spirits', category: 'case-study', isMasterpiece: true },
  { id: 'zenith-aviation', title: 'Zenith Aviation', category: 'case-study', isMasterpiece: true },
];

function Lightbox({ item, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [hasPrev, hasNext]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pf-lightbox" 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button className="pf-lb-close" onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      {hasPrev && (
        <button className="pf-lb-nav pf-lb-prev" onClick={onPrev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      {hasNext && (
        <button className="pf-lb-nav pf-lb-next" onClick={onNext} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="pf-lb-content"
      >
        <img 
          src={item.imageUrl || item.image || item.imgUrl || item.img || item.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'} 
          alt={item.title} 
          className="pf-lb-img" 
        />
        <div className="pf-lb-meta">
          <span className="pf-lb-cat">{CAT_DISPLAY[item.category] || item.category}</span>
          <h3 className="pf-lb-title">{item.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Counter({ target, duration = 1200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function WorkCard({ item, onClick }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (item.isMasterpiece) {
      navigate('/case-studies');
    } else {
      onClick(item);
    }
  };

  return (
    <FadeReveal>
      <motion.div
        layout
        className={`wk-card wk-card--vis ${item.isMasterpiece ? 'masterpiece-card' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        data-cursor={item.isMasterpiece ? "Case Study" : "View"}
      >
        <div className="wk-card-img-wrap">
          <ImageReveal>
            <img 
              src={item.imageUrl || item.image || item.imgUrl || item.img || item.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'} 
              alt={item.title} 
              className="wk-card-img" 
              loading="lazy"
            />
          </ImageReveal>
          <div className="wk-card-overlay">
            <div className="wk-card-overlay-inner">
              <span className="wk-cat-tag">{item.isMasterpiece ? 'Featured Masterpiece' : (CAT_DISPLAY[item.category] || item.category)}</span>
              <h3 className="wk-card-title">{item.title}</h3>
              <div className="wk-view-btn">
                {item.isMasterpiece ? (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg> Read Case Study</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> View Project</>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </FadeReveal>
  );
}

const Portfolio = ({ highlight = false, fullPage = false }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { lang } = useLanguage();

  useEffect(() => {
    // Fetch regular portfolio items
    const q = query(collection(db, 'portfolio'), orderBy('title'));
    const unsubPortfolio = onSnapshot(q, (snap) => {
      const portfolioItems = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(i => i.hidden !== true);
      
      // Fetch masterpiece images
      const unsubMasterpieces = onSnapshot(collection(db, 'case_study_images'), (mSnap) => {
        const mImages = {};
        mSnap.docs.forEach(d => mImages[d.id] = d.data());

        const masterpieces = masterpieceData.map(m => ({
          ...m,
          imageUrl: mImages[m.id]?.heroUrl || mImages[m.id]?.resultUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
        }));

        setItems([...masterpieces, ...portfolioItems]);
        setLoading(false);
      });

      return () => unsubMasterpieces();
    });
    
    return () => unsubPortfolio();
  }, []);

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(i => i.category === activeFilter);

  const displayItems = highlight ? filteredItems.slice(0, 6) : filteredItems;

  const availableCats = CATS.filter(c => {
    if (c.key === 'all') return true;
    return items.some(i => i.category === c.key);
  });

  const handleFilterChange = (key) => setActiveFilter(key);
  const openLightbox = useCallback((item) => {
    const idx = displayItems.findIndex(i => i.id === item.id);
    setLightboxItem(item);
    setLightboxIndex(idx);
  }, [displayItems]);
  const closeLightbox = useCallback(() => { setLightboxItem(null); setLightboxIndex(null); }, []);
  const goPrev = useCallback(() => {
    const newIdx = lightboxIndex - 1;
    if (newIdx >= 0) { setLightboxItem(displayItems[newIdx]); setLightboxIndex(newIdx); }
  }, [lightboxIndex, displayItems]);
  const goNext = useCallback(() => {
    const newIdx = lightboxIndex + 1;
    if (newIdx < displayItems.length) { setLightboxItem(displayItems[newIdx]); setLightboxIndex(newIdx); }
  }, [lightboxIndex, displayItems]);

  if (loading && items.length === 0) {
    return (
      <section className="wk-section" id="portfolio">
        <div className="wk-loading"><div className="wk-loading-dots"><span/><span/><span/></div></div>
      </section>
    );
  }

  return (
    <>
      <section className={`wk-section ${fullPage ? 'full-page-section' : ''}`} id="portfolio">
        {!fullPage && <div className="wk-grain" aria-hidden="true" />}
        <div className="wk-inner">
          {!fullPage && (
            <div className="wk-header">
              <FadeReveal>
                <div className="wk-eyebrow"><span className="wk-eyebrow-dot" />{lang === 'bn' ? 'আমাদের কাজ' : 'Our Work'}</div>
              </FadeReveal>
              <TextReveal className="wk-heading">
                {lang === 'bn' ? 'সৃজনশীলতা যেখানে ফলাফল আনে' : 'Creativity that drives results'}
              </TextReveal>
              <FadeReveal delay={0.4}>
                <div className="wk-stats-row">
                  <div className="wk-stat"><strong><Counter target={items.length} />+</strong><span>{lang === 'bn' ? 'প্রজেক্ট' : 'Projects'}</span></div>
                  <div className="wk-stat-div" />
                  <div className="wk-stat"><strong><Counter target={50} />+</strong><span>{lang === 'bn' ? 'সন্তুষ্ট ক্লায়েন্ট' : 'Happy Clients'}</span></div>
                  <div className="wk-stat-div" />
                  <div className="wk-stat"><strong><Counter target={5} /></strong><span>{lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}</span></div>
                </div>
              </FadeReveal>
            </div>
          )}

          {!highlight && (
            <FadeReveal delay={0.2}>
              <div className="wk-filter-bar" role="tablist">
                {availableCats.map(cat => (
                  <button
                    key={cat.key}
                    role="tab"
                    aria-selected={activeFilter === cat.key}
                    className={`wk-filter-btn${activeFilter === cat.key ? ' wk-filter-btn--active' : ''}`}
                    onClick={() => handleFilterChange(cat.key)}
                  >
                    {lang === 'bn' ? cat.label_bn : cat.label}
                    {activeFilter === cat.key && (
                      <motion.span layoutId="filter-count" className="wk-filter-count">
                        {cat.key === 'all' ? items.length : items.filter(i => i.category === cat.key).length}
                      </motion.span>
                    )}
                  </button>
                ))}
              </div>
            </FadeReveal>
          )}

          <div className="wk-grid-wrap">
            <StaggerReveal>
              <motion.div layout className="wk-grid">
                <AnimatePresence mode="popLayout">
                  {displayItems.map((item) => (
                    <WorkCard key={item.id} item={item} onClick={openLightbox} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </StaggerReveal>
          </div>

          {highlight && (
            <FadeReveal delay={0.4}>
              <div className="wk-footer" style={{ marginTop: '4rem', textAlign: 'center' }}>
                <Link to="/work" className="btn-red">{lang === 'bn' ? 'সব কাজ দেখুন →' : 'View Full Portfolio →'}</Link>
              </div>
            </FadeReveal>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox
            item={lightboxItem}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
            hasPrev={lightboxIndex > 0}
            hasNext={lightboxIndex < displayItems.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
