import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { TextReveal, FadeReveal, StaggerReveal } from './MotionReveal';

const Process = ({ highlight = false, fullPage = false }) => {
  const { lang } = useLanguage();
  
  const steps = [
    { num: '01', icon: '🔍', title: lang === 'bn' ? 'গবেষণা' : 'Discovery', desc: lang === 'bn' ? 'আপনার ব্র্যান্ড এবং লক্ষ্য নিয়ে গভীর আলোচনা।' : 'Deep dive into your brand goals and user needs.' },
    { num: '02', icon: '🎨', title: lang === 'bn' ? 'ডিজাইন' : 'Strategy', desc: lang === 'bn' ? 'সৃজনশীল কনসেপ্ট এবং আর্কিটেকচার তৈরি।' : 'Crafting high-fidelity concepts and systems.' },
    { num: '03', icon: '⚙️', title: lang === 'bn' ? 'ডেভেলপমেন্ট' : 'Execution', desc: lang === 'bn' ? 'সঠিক পিক্সেল এবং উন্নত কোডিং নিশ্চিত করা।' : 'Bringing designs to life with pixel-perfection.' },
    { num: '04', icon: '🚀', title: lang === 'bn' ? 'লঞ্চ' : 'Optimization', desc: lang === 'bn' ? 'ফলাফল ট্র্যাকিং এবং ধারাবাহিক উন্নতি।' : 'Continuous refinement for maximum impact.' }
  ];

  return (
    <section className={`section process-section ${fullPage ? 'full-page-section' : ''}`} id="process">
      <div className="container">
        {!fullPage && (
          <div className="process-header sr-center">
            <FadeReveal>
              <div className="eyebrow">{lang === 'bn' ? 'আমাদের কাজের পদ্ধতি' : 'Our Workflow'}</div>
            </FadeReveal>
            <TextReveal className="section-h">
              {lang === 'bn' ? 'আমাদের প্রসেস' : 'Our Simple Process'}
            </TextReveal>
            <FadeReveal delay={0.4}>
              <p className="section-sub">{lang === 'bn' ? 'একটি সুশৃঙ্খল পদ্ধতির মাধ্যমে আমরা আপনার স্বপ্নকে বাস্তবে রূপান্তর করি।' : 'A proven 4-step framework designed to deliver consistent, high-quality results.'}</p>
            </FadeReveal>
          </div>
        )}
        <div className="process-steps">
          <StaggerReveal delay={0.5}>
            {steps.map((step, idx) => (
              <FadeReveal key={idx}>
                <div className="step-card">
                  <div className="step-num">{step.num}</div>
                  <div className="step-icon">{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </FadeReveal>
            ))}
          </StaggerReveal>
        </div>
        {highlight && (
          <FadeReveal delay={0.8}>
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link to="/process" className="btn-outline-red">
                {lang === 'bn' ? 'বিস্তারিত প্রসেস দেখুন' : 'Explore Our Workflow'}
              </Link>
            </div>
          </FadeReveal>
        )}
      </div>
    </section>
  );
};

export default Process;
