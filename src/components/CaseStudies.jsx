import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where, limit } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const CaseStudies = ({ highlight = false }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    // We only want projects that have 'isFeatured' or just top 3 for Duck Design style
    const q = query(collection(db, 'portfolio'), where('hidden', '==', false), limit(3));
    const unsub = onSnapshot(q, (snap) => {
      setCases(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading && cases.length === 0) return null;

  return (
    <section className="duck-cs-section" id="case-studies">
      <div className="container">
        <div className="cs-intro">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            {lang === 'bn' ? 'নির্বাচিত কেস স্টাডিজ' : 'Selected Case Studies'}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="duck-h"
          >
            {lang === 'bn' ? <>আমাদের সেরা <span className="red">কাজসমূহ</span></> : <>Strategic <span className="red">Solutions</span></>}
          </motion.h2>
        </div>

        <div className="duck-cs-list">
          {cases.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`duck-cs-item ${index % 2 !== 0 ? 'reverse' : ''}`}
            >
              <div className="duck-cs-info">
                <div className="duck-cs-num">0{index + 1}</div>
                <h3 className="duck-cs-title">{(lang === 'bn' && project.title_bn) ? project.title_bn : project.title}</h3>
                <div className="duck-cs-tags">
                  <span className="duck-tag">{project.category}</span>
                </div>
                <p className="duck-cs-desc">
                  {(lang === 'bn' && project.desc_bn) ? project.desc_bn : project.desc || 'Premium design solutions delivered with strategic thinking and creative excellence.'}
                </p>
                <Link to={`/work`} className="duck-cs-link" data-cursor="View">
                  {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Case Study'} <ArrowRight size={20} />
                </Link>
              </div>
              <div className="duck-cs-visual">
                <div className="duck-cs-img-wrap">
                  <img src={project.imageUrl} alt={project.title} className="duck-cs-img" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {highlight && (
          <div className="duck-cs-footer">
            <Link to="/work" className="btn-huge-red">
              {lang === 'bn' ? 'সবগুলো প্রজেক্ট দেখুন' : 'View All Projects'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;
