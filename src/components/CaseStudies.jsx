import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TextReveal, FadeReveal } from './MotionReveal';

const teaserCases = [
  { id: 'veldt-co', num: '01', title: 'Veldt & Co.', tag: 'Branding', industry: 'Sustainable Furniture' },
  { id: 'aura-labs', num: '02', title: 'Aura Labs', tag: 'UI/UX', industry: 'AI Healthcare' },
  { id: 'lumina-watch', num: '03', title: 'Lumina', tag: 'Product', industry: 'Luxury Timepieces' },
];

const CaseStudies = () => {
  const { lang } = useLanguage();

  return (
    <section className="home-teaser-section" id="case-studies">
      <div className="container">
        <div className="home-teaser-header">
          <FadeReveal>
            <div className="eyebrow" style={{ color: 'var(--red)' }}>
              {lang === 'bn' ? 'নির্বাচিত কেস স্টাডিজ' : 'Selected Case Studies'}
            </div>
          </FadeReveal>
          <TextReveal className="home-teaser-h2">
            {lang === 'bn' ? 'সাফল্যের আখ্যান' : 'Strategic Results.'}
          </TextReveal>
        </div>

        <div className="cs-teaser-grid">
          {teaserCases.map((cs, idx) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to="/case-studies" className="cs-teaser-card" style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="cs-teaser-num" style={{ color: 'var(--red)' }}>{cs.num}</div>
                <div className="cs-teaser-tag">{cs.tag}</div>
                <h3 className="cs-teaser-name">{cs.title}</h3>
                <p className="cs-teaser-industry">{cs.industry}</p>
                <div className="cs-teaser-cta">
                  Explore Case <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link to="/case-studies" className="btn-red">
            {lang === 'bn' ? 'সব কেস স্টাডি দেখুন' : 'View All 10 Masterpieces →'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
