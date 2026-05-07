import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { TextReveal, FadeReveal, StaggerReveal } from './MotionReveal';

const Process = ({ highlight = false, fullPage = false }) => {
  const { lang } = useLanguage();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const steps = [
    { num: '01', icon: '🔍', title: lang === 'bn' ? 'গবেষণা ও পরিকল্পনা' : 'Strategy & Planning', desc: lang === 'bn' ? 'আপনার ব্র্যান্ড এবং লক্ষ্য নিয়ে গভীর আলোচনা করে একটি মাস্টারপ্ল্যান তৈরি করি।' : 'We deep dive into your brand goals and user needs to create a bulletproof roadmap.' },
    { num: '02', icon: '🎨', title: lang === 'bn' ? 'সৃজনশীল ডিজাইন' : 'Creative Design', desc: lang === 'bn' ? 'আপনার আইডিয়াকে প্রিমিয়াম ভিউয়াল কনসেপ্ট এবং ইউআই ডিজাইনে রূপান্তর করি।' : 'We transform your ideas into high-fidelity premium visual concepts and UI designs.' },
    { num: '03', icon: '⚙️', title: lang === 'bn' ? 'নিখুঁত বাস্তবায়ন' : 'Expert Execution', desc: lang === 'bn' ? 'সঠিক পিক্সেল এবং উন্নত প্রযুক্তির মাধ্যমে প্রজেক্টটি জীবন্ত করে তুলি।' : 'We bring designs to life with pixel-perfect execution and high-performance development.' },
    { num: '04', icon: '🚀', title: lang === 'bn' ? 'লঞ্চ ও অপ্টিমাইজেশন' : 'Growth & Support', desc: lang === 'bn' ? 'প্রজেক্ট লঞ্চ করার পর নিয়মিত পারফরম্যান্স ট্র্যাক এবং ধারাবাহিক উন্নতি নিশ্চিত করি।' : 'We monitor results post-launch and continuously refine strategies for maximum ROI.' }
  ];

  return (
    <section className={`section process-section ${fullPage ? 'full-page-section' : ''}`} id="process" ref={containerRef} style={{ background: '#fff', position: 'relative' }}>
      <div className="container">
        {!fullPage && (
          <div className="process-header" style={{ textAlign: 'center', marginBottom: '8rem' }}>
            <FadeReveal>
              <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: '1.5rem' }}>{lang === 'bn' ? 'আমাদের কাজের পদ্ধতি' : 'Our Workflow'}</div>
            </FadeReveal>
            <TextReveal className="section-h" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#000' }}>
              {lang === 'bn' ? 'নিখুঁত প্রসেস' : 'The Path to Excellence.'}
            </TextReveal>
            <FadeReveal delay={0.4}>
              <p className="section-sub" style={{ color: 'rgba(0,0,0,0.6)', maxWidth: '600px', margin: '2rem auto' }}>{lang === 'bn' ? 'একটি সুশৃঙ্খল পদ্ধতির মাধ্যমে আমরা আপনার স্বপ্নকে বাস্তবে রূপান্তর করি।' : 'A proven 4-step framework designed to deliver consistent, high-end results with precision.'}</p>
            </FadeReveal>
          </div>
        )}

        <div className="timeline-container" style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Animated Progress Line */}
          <div className="timeline-line" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, bottom: 0, width: '2px', background: 'rgba(232, 25, 44, 0.05)' }}></div>
          <motion.div 
            className="timeline-progress" 
            style={{ 
              position: 'absolute', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              top: 0, 
              width: '2px', 
              background: 'var(--red)', 
              scaleY, 
              originY: 0,
              boxShadow: '0 0 15px rgba(232, 25, 44, 0.3)'
            }}
          ></motion.div>
          
          <div className="timeline-steps">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step-v2" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '10rem',
                flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                position: 'relative'
              }}>
                <div className="process-content-v2" style={{ width: '45%', padding: '3rem', background: '#fff', borderRadius: '32px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', position: 'relative' }}>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="step-num" style={{ position: 'absolute', top: '-1rem', right: idx % 2 === 0 ? '-1rem' : 'auto', left: idx % 2 !== 0 ? '-1rem' : 'auto', fontSize: '6rem', fontWeight: 900, color: 'rgba(232, 25, 44, 0.05)', zIndex: 0 }}>{step.num}</div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.2rem', color: '#000', position: 'relative', zIndex: 1 }}>{step.title}</h3>
                    <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, fontSize: '1.05rem', position: 'relative', zIndex: 1 }}>{step.desc}</p>
                  </motion.div>
                </div>

                <motion.div 
                  className="process-icon-wrap" 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  style={{ 
                    position: 'absolute', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    width: '60px', 
                    height: '60px', 
                    background: '#fff', 
                    border: '2px solid var(--red)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '1.5rem', 
                    zIndex: 10,
                    boxShadow: '0 0 0 10px #fff'
                  }}
                >
                  {step.icon}
                </motion.div>

                <div style={{ width: '45%' }}></div>
              </div>
            ))}
          </div>
        </div>

        {highlight && (
          <FadeReveal delay={0.8}>
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <Link to="/process" className="btn-huge-red">
                {lang === 'bn' ? 'বিস্তারিত প্রসেস দেখুন →' : 'Explore Our Full Workflow →'}
              </Link>
            </div>
          </FadeReveal>
        )}
      </div>
    </section>
  );
};

export default Process;
