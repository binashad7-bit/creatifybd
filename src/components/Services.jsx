import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { TextReveal, FadeReveal, StaggerReveal } from './MotionReveal';

const Services = ({ highlight = false, fullPage = false }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const q = query(collection(db, 'services'));
    const unsub = onSnapshot(q, (snap) => {
      const allItems = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(allItems.filter(item => item.hidden !== true));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const displayServices = services;

  if (loading && services.length === 0) return (
    <section className="section services-section" id="services" style={{ minHeight: '400px' }}></section>
  );

  return (
    <section className={`section services-section ${fullPage ? 'full-page-section' : ''}`} id="services">
      {!fullPage && (
        <div className="container">
          <div className="services-header">
            <div>
              <FadeReveal>
                <div className="eyebrow">{lang === 'bn' ? 'আমরা যা করি' : 'What We Do'}</div>
              </FadeReveal>
              <TextReveal className="section-h">
                {lang === 'bn' ? 'আমাদের সার্ভিসসমূহ' : 'Our Services'}
              </TextReveal>
            </div>
            <FadeReveal delay={0.3}>
              <Link to="/services" className="btn-red">{lang === 'bn' ? 'সব সার্ভিস দেখুন →' : 'View All Services →'}</Link>
            </FadeReveal>
          </div>
        </div>
      )}
      
      <div className="services-scroll-wrap">
        <StaggerReveal delay={0.4}>
          <div className="services-row">
            {displayServices.map((service) => (
              <FadeReveal key={service.id}>
                <div className="service-card">
                  <div className="service-img">
                    {service.imageUrl || service.image ? (
                      <img 
                        src={service.imageUrl || service.image} 
                        alt={service.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`service-img-bg ${service.bg || 's1'}`} style={{ display: (service.imageUrl || service.image) ? 'none' : 'flex' }}>
                      {service.icon}
                    </div>
                  </div>
                  <div className="service-body">
                    <h3>{(lang === 'bn' && service.title_bn) ? service.title_bn : service.title}</h3>
                    <p>{(lang === 'bn' && service.desc_bn) ? service.desc_bn : service.desc}</p>
                    <span className="service-tag">{service.price}</span>
                  </div>
                </div>
              </FadeReveal>
            ))}
          </div>
        </StaggerReveal>
      </div>

      {highlight && (
        <FadeReveal delay={0.6}>
          <div className="container" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link to="/services" className="btn-outline-red">{lang === 'bn' ? 'সবগুলো দেখুন' : 'Explore All Services'}</Link>
          </div>
        </FadeReveal>
      )}
    </section>
  );
};

export default Services;
