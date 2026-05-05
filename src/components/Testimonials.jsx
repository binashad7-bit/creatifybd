import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { observeElements } from '../utils/reveal';
import { useLanguage } from '../context/LanguageContext';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const q = query(collection(db, 'testimonials'), where('hidden', '==', false));
    const unsub = onSnapshot(q, (snap) => {
      setTestimonials(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
      setTimeout(observeElements, 100);
    });
    return () => unsub();
  }, []);

  if (loading && testimonials.length === 0) return <section className="section testimonials-section" style={{ minHeight: '400px' }}></section>;

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="testi-header sr">
          <div>
            <div className="eyebrow">{lang === 'bn' ? 'রিভিউ' : 'Reviews'}</div>
            <h2 className="section-h">{lang === 'bn' ? <>ক্লায়েন্টরা <span className="red">যা বলছেন</span></> : <>What Our <span className="red">Clients</span> Say</>}</h2>
          </div>
          <div className="rating-summary">
            <div className="rating-val">5.0</div>
            <div>
              <div className="rating-stars">★★★★★</div>
              <div className="rating-count">{lang === 'bn' ? '৫০+ রিভিউ থেকে' : 'From 50+ reviews'}</div>
            </div>
          </div>
        </div>
        <div className="testi-scroll sr sr-delay-1">
          {testimonials.map((t) => (
            <div key={t.id} className="testi-card">
              <div className="testi-stars">
                {[...Array(parseInt(t.stars || 5))].map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="testi-text" dangerouslySetInnerHTML={{ __html: (lang === 'bn' && t.text_bn) ? t.text_bn : t.text }}></p>
              <div className="testi-author">
                <div className={`testi-avatar s1`}>{t.name.charAt(0)}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{(lang === 'bn' && t.role_bn) ? t.role_bn : t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
