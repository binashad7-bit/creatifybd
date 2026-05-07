import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Process = ({ highlight = false, fullPage = false }) => {
  const { lang } = useLanguage();
  
  const steps = [
    { num: '01', icon: '💬', title: lang === 'bn' ? 'আমাদের জানান' : 'Tell Us Your Needs', desc: lang === 'bn' ? 'ফোন বা ইমেইলের মাধ্যমে আপনার লক্ষ্য জানান।' : "Contact us via phone, email, or social media. We'll learn about your business." },
    { num: '02', icon: '🗂️', title: lang === 'bn' ? 'প্যাকেজ বাছাই' : 'Choose Your Package', desc: lang === 'bn' ? 'সাশ্রয়ী প্যাকেজ থেকে আপনার পছন্দেরটি বেছে নিন।' : "Pick from our clear, affordable packages — or we'll create a custom plan." },
    { num: '03', icon: '⚙️', title: lang === 'bn' ? 'কাজ শুরু' : 'We Get to Work', desc: lang === 'bn' ? 'আমাদের ক্রিয়েটিভ টিম তাৎক্ষণিক কাজ শুরু করবে।' : "Our creative team starts on your project immediately, keeping you updated." },
    { num: '04', icon: '🚀', title: lang === 'bn' ? 'রিভিউ ও লঞ্চ' : 'Review & Launch', desc: lang === 'bn' ? 'সবকিছু ঠিক থাকলে আমরা প্রজেক্টটি লঞ্চ করব।' : "Review the deliverables, request any revisions, and then go live." }
  ];

  return (
    <section className={`section process-section ${fullPage ? 'full-page-section' : ''}`} id="process">
      <div className="container">
        {!fullPage && (
          <div className="process-header sr">
            <div className="eyebrow">{lang === 'bn' ? 'কিভাবে কাজ করি' : 'How It Works'}</div>
            <h2 className="section-h">{lang === 'bn' ? <>আমাদের <span className="red">প্রসেস</span></> : <>Simple 4-Step <span className="red">Process</span></>}</h2>
            <p className="section-sub">{lang === 'bn' ? 'স্বচ্ছ এবং দ্রুত পদ্ধতির মাধ্যমে ফলাফল নিশ্চিত করি।' : 'From first contact to delivered results — fast, smooth, and transparent.'}</p>
          </div>
        )}
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className={`step-card sr ${index > 0 ? `sr-delay-${index}` : ''}`}>
              <div className="step-num">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
        {highlight && (
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link to="/process" className="btn-outline-red">
              {lang === 'bn' ? 'বিস্তারিত প্রসেস দেখুন' : 'Explore Our Workflow'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Process;
