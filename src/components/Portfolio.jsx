import React, { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const CATS = [
  { key: 'all', label: 'All Work', label_bn: 'সব কাজ' },
  { key: 'graphic', label: 'Graphic Design', label_bn: 'গ্রাফিক ডিজাইন' },
  { key: 'branding', label: 'Branding', label_bn: 'ব্র্যান্ডিং' },
  { key: 'web', label: 'Web Design', label_bn: 'ওয়েব ডিজাইন' },
  { key: 'video', label: 'Video', label_bn: 'ভিডিও' },
  { key: 'ai', label: 'AI Art', label_bn: 'এআই আর্ট' },
];

const CAT_DISPLAY = {
  graphic: 'Graphic Design',
  branding: 'Branding',
  web: 'Web Design',
  video: 'Video',
  ai: 'AI Art',
};

// ── Lightbox ─────────────────────────────────────────────────────────────────
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
        <img src={item.imageUrl} alt={item.title} className="pf-lb-img" />
        <div className="pf-lb-meta">
          <span className="pf-lb-cat">{CAT_DISPLAY[item.category] || item.category}</span>
          <h3 className="pf-lb-title">{item.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Animated Number Counter ───────────────────────────────────────────────────
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

// ── Work Card ─────────────────────────────────────────────────────────────────
function WorkCard({ item, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="wk-card wk-card--vis"
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(item)}
      data-cursor="View"
    >
      <div className="wk-card-img-wrap">
        <img src={item.imageUrl} alt={item.title} className="wk-card-img" loading="lazy" />
        <div className="wk-card-overlay">
          <div className="wk-card-overlay-inner">
            <span className="wk-cat-tag">{CAT_DISPLAY[item.category] || item.category}</span>
            <h3 className="wk-card-title">{item.title}</h3>
            <div className="wk-view-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Case Study Card ───────────────────────────────────────────────────────────
function CaseCard({ item, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="cs-card cs-card--vis"
      onClick={() => onClick(item, index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(item, index)}
      data-cursor="View"
    >
      <div className="cs-card-img-wrap">
        <img src={item.imageUrl} alt={item.title} className="cs-card-img" loading="lazy" />
        <div className="cs-card-badge">{CAT_DISPLAY[item.category] || item.category}</div>
        <div className="cs-card-num">0{index + 1}</div>
      </div>
      <div className="cs-card-body">
        <h3 className="cs-card-title">{item.title}</h3>
        <div className="cs-card-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), where('hidden', '==', false));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(i => i.category === activeFilter);

  const availableCats = CATS.filter(c => {
    if (c.key === 'all') return true;
    return items.some(i => i.category === c.key);
  });

  const handleFilterChange = (key) => {
    setActiveFilter(key);
  };

  const openLightbox = useCallback((item) => {
    const idx = filteredItems.findIndex(i => i.id === item.id);
    setLightboxItem(item);
    setLightboxIndex(idx);
  }, [filteredItems]);

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    const newIdx = lightboxIndex - 1;
    if (newIdx >= 0) {
      setLightboxItem(filteredItems[newIdx]);
      setLightboxIndex(newIdx);
    }
  }, [lightboxIndex, filteredItems]);

  const goNext = useCallback(() => {
    const newIdx = lightboxIndex + 1;
    if (newIdx < filteredItems.length) {
      setLightboxItem(filteredItems[newIdx]);
      setLightboxIndex(newIdx);
    }
  }, [lightboxIndex, filteredItems]);

  // Case studies: pick top 8 for the horizontal scroll
  const caseStudies = items.slice(0, 8);

  if (loading && items.length === 0) {
    return (
      <section className="wk-section" id="portfolio">
        <div className="wk-loading">
          <div className="wk-loading-dots"><span/><span/><span/></div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── SECTION 1: OUR WORK ─────────────────────────────────────────── */}
      <section className="wk-section" id="portfolio">
        <div className="wk-grain" aria-hidden="true" />

        <div className="wk-inner">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="wk-header"
          >
            <div className="wk-eyebrow">
              <span className="wk-eyebrow-dot" />
              {lang === 'bn' ? 'আমাদের কাজ' : 'Our Work'}
            </div>
            <h2 className="wk-heading">
              {lang === 'bn'
                ? <><span className="wk-heading-line">সৃজনশীলতা যেখানে</span><span className="wk-heading-red"> ফলাফল</span> আনে</>
                : <><span className="wk-heading-line">Creativity that</span><span className="wk-heading-red"> drives</span> results</>
              }
            </h2>
            <div className="wk-stats-row">
              <div className="wk-stat">
                <strong><Counter target={items.length} />+</strong>
                <span>{lang === 'bn' ? 'প্রজেক্ট' : 'Projects'}</span>
              </div>
              <div className="wk-stat-div" />
              <div className="wk-stat">
                <strong><Counter target={50} />+</strong>
                <span>{lang === 'bn' ? 'সন্তুষ্ট ক্লায়েন্ট' : 'Happy Clients'}</span>
              </div>
              <div className="wk-stat-div" />
              <div className="wk-stat">
                <strong><Counter target={5} /></strong>
                <span>{lang === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}</span>
              </div>
            </div>
          </motion.div>

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
                  <motion.span 
                    layoutId="filter-count"
                    className="wk-filter-count"
                  >
                    {cat.key === 'all' ? items.length : items.filter(i => i.category === cat.key).length}
                  </motion.span>
                )}
              </button>
            ))}
          </div>

          <motion.div layout className="wk-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <WorkCard
                  key={item.id}
                  item={item}
                  onClick={openLightbox}
                />
              ))}
            </AnimatePresence>
            {filteredItems.length === 0 && (
              <div className="wk-empty">
                <span>No projects in this category yet.</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: CASE STUDIES ─────────────────────────────────────── */}
      <section className="cs-section" id="case-studies">
        <div className="cs-header-wrap">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cs-eyebrow"
          >
            <span className="cs-eyebrow-line" />
            {lang === 'bn' ? 'ফিচার্ড প্রজেক্ট' : 'Featured Projects'}
          </motion.div>
          <div className="cs-header-row">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cs-heading"
            >
              {lang === 'bn'
                ? <>প্রজেক্ট <span>শোকেস</span></>
                : <>Project <span>Showcase</span></>
              }
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cs-subhead"
            >
              {lang === 'bn'
                ? 'আমাদের সেরা কাজগুলো একনজরে দেখুন।'
                : 'A curated selection of our most impactful creative work.'}
            </motion.p>
          </div>
        </div>

        <div className="cs-scroll-outer">
          <div className="cs-scroll-track">
            {caseStudies.map((item, i) => (
              <CaseCard
                key={item.id}
                item={item}
                index={i}
                onClick={openLightbox}
              />
            ))}
          </div>
          <div className="cs-scroll-hint" aria-hidden="true">
            <span>Scroll</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>

        <div className="cs-footer">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="cs-cta-btn"
          >
            {lang === 'bn' ? 'প্রজেক্ট শুরু করুন' : 'Start a Project'}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.a>
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
            hasNext={lightboxIndex < filteredItems.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
