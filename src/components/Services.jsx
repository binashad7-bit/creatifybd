import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { observeElements } from '../utils/reveal';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Services = ({ highlight = false, fullPage = false }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const q = query(collection(db, 'services'), where('hidden', '==', false));
    const unsub = onSnapshot(q, (snap) => {
      setServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
      setTimeout(observeElements, 100);
    });
    return () => unsub();
  }, []);

  const displayServices = highlight ? services.slice(0, 4) : services;

  if (loading && services.length === 0) return (
    <section className="section services-section" id="services" style={{ minHeight: '400px' }}></section>
  );

  return (
    <section className={`section services-section ${fullPage ? 'full-page-section' : ''}`} id="services">
      {!fullPage && (
        <div className="container">
          <div className="services-header sr">
            <div>
              <div className="eyebrow">{lang === 'bn' ? 'আমরা যা করি' : 'What We Do'}</div>
              <h2 className="section-h">{lang === 'bn' ? <>আমাদের <span className="red">সার্ভিসসমূহ</span></> : <>Our <span className="red">Services</span></>}</h2>
            </div>
            <Link to="/services" className="btn-red">{lang === 'bn' ? 'সব সার্ভিস দেখুন →' : 'View All Services →'}</Link>
          </div>
        </div>
      )}
      <div className="services-scroll-wrap sr sr-delay-1">
        <div className="services-row">
          {displayServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-img">
                <div className={`service-img-bg ${service.bg || 's1'}`}>{service.icon}</div>
              </div>
              <div className="service-body">
                <h3>{(lang === 'bn' && service.title_bn) ? service.title_bn : service.title}</h3>
                <p>{(lang === 'bn' && service.desc_bn) ? service.desc_bn : service.desc}</p>
                <span className="service-tag">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {highlight && (
        <div className="container" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/services" className="btn-outline-red">{lang === 'bn' ? 'সবগুলো দেখুন' : 'Explore All Services'}</Link>
        </div>
      )}
    </section>
  );
};

export default Services;
