import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TextReveal, FadeReveal, ImageReveal, ParallaxImage } from './MotionReveal';

const masterpieces = [
  { id: 'veldt-co', title: 'Veldt & Co.', title_bn: 'ভেল্ড অ্যান্ড কোং', category: 'Branding + Digital', desc: 'Crafting a legacy of conscious living through minimalist design and sustainable furniture experience.', desc_bn: 'মিনিমালিস্ট ডিজাইন এবং টেকসই আসবাবপত্রের মাধ্যমে সচেতন জীবনযাপনের একটি ঐতিহ্য তৈরি করা।' },
  { id: 'aura-labs', title: 'Aura Labs', title_bn: 'অরা ল্যাবস', category: 'UI/UX + Motion', desc: 'Humanizing artificial intelligence for a healthier tomorrow with intuitive healthcare systems.', desc_bn: 'স্বজ্ঞাত স্বাস্থ্যসেবা ব্যবস্থার মাধ্যমে একটি সুস্থ ভবিষ্যতের জন্য কৃত্রিম বুদ্ধিমত্তাকে মানবিক করা।' },
  { id: 'lumina-watch', title: 'Lumina Watchmaking', title_bn: 'লুমিনা ওয়াচমেকিং', category: 'Product + 3D', desc: 'Precision in every second. High-fidelity 3D rendering for boutique luxury timepieces.', desc_bn: 'প্রতিটি সেকেন্ডে নির্ভুলতা। বুটিক লাক্সারি ঘড়ির জন্য হাই-ফিডেলিটি থ্রিডি রেন্ডারিং।' },
  { id: 'nomad-brews', title: 'Nomad Brews', title_bn: 'নোমাড ব্রুস', category: 'Social Media', desc: 'Fueling the modern wanderer with soul and caffeine through modular brand identity.', desc_bn: 'মডুলার ব্র্যান্ড আইডেন্টিটির মাধ্যমে আধুনিক ভ্রমণকারীদের আত্মা এবং ক্যাফেইন সরবরাহ করা।' },
  { id: 'vertex-fintech', title: 'Vertex FinTech', title_bn: 'ভার্টেক্স ফিনটেক', category: 'FinTech Overhaul', desc: 'The future of finance, simplified for everyone with a lifestyle-oriented digital banking.', desc_bn: 'লাইফস্টাইল-ওরিয়েন্টেড ডিজিটাল ব্যাংকিংয়ের মাধ্যমে সবার জন্য সহজতর অর্থায়নের ভবিষ্যৎ।' },
];

const CaseStudies = ({ highlight = true }) => {
  const [images, setImages] = useState({});
  const { lang } = useLanguage();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'case_study_images'), (snap) => {
      const imgMap = {};
      snap.docs.forEach(doc => { imgMap[doc.id] = doc.data(); });
      setImages(imgMap);
    });
    return () => unsub();
  }, []);

  return (
    <section className="duck-cs-section" id="case-studies">
      <div className="container">
        <div className="cs-intro">
          <FadeReveal>
            <div className="eyebrow">
              {lang === 'bn' ? 'নির্বাচিত কেস স্টাডিজ' : 'Selected Case Studies'}
            </div>
          </FadeReveal>
          <TextReveal className="duck-h">
            {lang === 'bn' ? 'আমাদের সেরা কাজসমূহ' : 'Strategic Solutions'}
          </TextReveal>
        </div>

        <div className="duck-cs-list">
          {masterpieces.slice(0, highlight ? 3 : 10).map((project, index) => {
            const csImages = images[project.id] || {};
            const heroImg = csImages.heroUrl || csImages.resultUrl;

            return (
              <div
                key={project.id}
                className={`duck-cs-item ${index % 2 !== 0 ? 'reverse' : ''}`}
              >
                <div className="duck-cs-info">
                  <FadeReveal delay={0.2}>
                    <div className="duck-cs-num">0{index + 1}</div>
                  </FadeReveal>
                  <TextReveal className="duck-cs-title" delay={0.3}>
                    {lang === 'bn' ? project.title_bn : project.title}
                  </TextReveal>
                  <FadeReveal delay={0.5}>
                    <div className="duck-cs-tags">
                      <span className="duck-tag">{project.category}</span>
                    </div>
                    <p className="duck-cs-desc">
                      {lang === 'bn' ? project.desc_bn : project.desc}
                    </p>
                    <Link to={`/case-studies`} className="duck-cs-link" data-cursor="View">
                      {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Case Study'} <ArrowRight size={20} />
                    </Link>
                  </FadeReveal>
                </div>
                <div className="duck-cs-visual">
                  <ImageReveal delay={0.4}>
                    <div className="duck-cs-img-wrap" style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                      {heroImg ? (
                        <ParallaxImage src={heroImg} alt={project.title} />
                      ) : (
                        <div className="cs-placeholder-home">
                          <span>📸</span>
                          <p>Visual pending</p>
                        </div>
                      )}
                    </div>
                  </ImageReveal>
                </div>
              </div>
            );
          })}
        </div>

        <FadeReveal delay={0.6}>
          <div className="duck-cs-footer">
            <Link to="/case-studies" className="btn-huge-red">
              {lang === 'bn' ? 'সব কেস স্টাডি দেখুন' : 'View All Case Studies'}
            </Link>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
};

export default CaseStudies;
