import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { observeElements } from '../utils/reveal';
import { useLanguage } from '../context/LanguageContext';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), where('hidden', '==', false));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
      setTimeout(observeElements, 100);
    });
    return () => unsub();
  }, []);

  if (loading && items.length === 0) return <section className="section portfolio-section" id="portfolio" style={{ minHeight: '400px' }}></section>;

  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container">
        <div className="portfolio-header sr">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>{lang === 'bn' ? 'আমাদের কাজ' : 'Our Work'}</div>
          <h2 className="section-h">{lang === 'bn' ? <>সৃজনশীল কাজ যা <span className="red">সফলতা আনে</span></> : <>Creative Work That <span className="red">Converts</span></>}</h2>
          <p className="section-sub">{lang === 'bn' ? 'বাংলাদেশের বিভিন্ন ব্যবসার জন্য আমাদের তৈরি করা কিছু প্রজেক্টের ঝলক।' : "A glimpse of what we've created for local businesses across Bangladesh."}</p>
        </div>
        <div className="portfolio-masonry sr sr-delay-1">
          {items.map((item) => (
            <div key={item.id} className="portfolio-item">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }} />
              ) : (
                <div className={`pf-block pf-1`}>{(lang === 'bn' && item.title_bn) ? item.title_bn : item.title}</div>
              )}
              <div className="portfolio-overlay"><span>{(lang === 'bn' && item.category_bn) ? item.category_bn : item.category}</span></div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }} className="sr">
          <a href="#contact" className="btn-red" style={{ fontSize: '0.95rem', padding: '0.8rem 2rem' }}>{lang === 'bn' ? 'সবগুলো প্রজেক্ট দেখুন →' : 'See All Projects →'}</a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
