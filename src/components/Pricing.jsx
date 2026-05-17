import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { TextReveal, FadeReveal, StaggerReveal } from './MotionReveal';

const Pricing = ({ highlight = false, fullPage = false, theme = 'light' }) => {
  const [pricingData, setPricingData] = useState({ social: [], branding: [], web: [], video: [] });
  const [activeTab, setActiveTab] = useState('social');
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'pricing'), (snap) => {
      const data = { social: [], branding: [], web: [], video: [] };
      const allItems = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter and sort in JS to avoid index requirements
      const filtered = allItems.filter(item => item.hidden !== true);
      const sorted = filtered.sort((a, b) => (a.order || 0) - (b.order || 0));

      sorted.forEach(item => {
        if (data[item.category]) data[item.category].push(item);
      });
      setPricingData(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading && pricingData.social.length === 0) return <section className="section pricing-section" id="pricing" style={{ minHeight: '400px' }}></section>;

  const fallbackPricing = {
    social: [
      { id: 's1', tier: 'Basic', tier_bn: 'বেসিক', price: '15,000', desc: 'Perfect for small businesses', desc_bn: 'ছোট ব্যবসার জন্য', features: ['15 Social Posts/mo', 'Basic Page Moderation', 'Monthly Report'], features_bn: ['১৫টি সোশ্যাল পোস্ট', 'বেসিক পেজ মডারেশন', 'মাসিক রিপোর্ট'] },
      { id: 's2', tier: 'Standard', tier_bn: 'স্ট্যান্ডার্ড', price: '25,000', desc: 'For growing brands', desc_bn: 'বর্ধিষ্ণু ব্র্যান্ডের জন্য', features: ['20 Social Posts/mo', 'Ad Campaign Setup', 'Monthly Report'], features_bn: ['২০টি সোশ্যাল পোস্ট', 'অ্যাড ক্যাম্পেইন সেটআপ', 'মাসিক রিপোর্ট'], featured: true }
    ],
    branding: [
      { id: 'b1', tier: 'Startup', tier_bn: 'স্টার্টআপ', price: '20,000', desc: 'Essential branding', desc_bn: 'প্রাথমিক ব্র্যান্ডিং', features: ['Logo Design (2 Concepts)', 'Color Palette', 'Brand Guidelines'], features_bn: ['লোগো ডিজাইন', 'কালার প্যালেট', 'ব্র্যান্ড গাইডলাইন'] }
    ],
    web: [
      { id: 'w1', tier: 'Landing Page', tier_bn: 'ল্যান্ডিং পেজ', price: '30,000', desc: 'Single page website', desc_bn: 'সিঙ্গেল পেজ ওয়েবসাইট', features: ['Custom Design', 'Mobile Responsive', 'Contact Form'], features_bn: ['কাস্টম ডিজাইন', 'মোবাইল রেসপন্সিভ', 'কন্টাক্ট ফর্ম'] }
    ],
    video: [
      { id: 'v1', tier: 'Short Promo', tier_bn: 'শর্ট প্রোমো', price: '15,000', desc: 'Up to 30 seconds', desc_bn: '৩০ সেকেন্ড পর্যন্ত', features: ['Script Writing', 'Motion Graphics', 'Background Music'], features_bn: ['স্ক্রিপ্ট রাইটিং', 'মোশন গ্রাফিক্স', 'ব্যাকগ্রাউন্ড মিউজিক'] }
    ]
  };

  const currentPlans = pricingData[activeTab]?.length > 0 ? pricingData[activeTab] : fallbackPricing[activeTab];
  const activePlans = currentPlans || [];
  const displayPlans = highlight ? activePlans.slice(0, 3) : activePlans;

  const tabLabels = {
    social: { en: 'Social Media', bn: 'সোশ্যাল মিডিয়া' },
    branding: { en: 'Branding', bn: 'ব্র্যান্ডিং' },
    web: { en: 'Web Dev', bn: 'ওয়েব ডেভেলপমেন্ট' },
    video: { en: 'Video Production', bn: 'ভিডিও প্রোডাকশন' }
  };

  // Force light theme - dark theme disabled for better UX
  const forcedTheme = 'light';

  return (
    <section className={`section pricing-section ${fullPage ? 'full-page-section' : ''}`} id="pricing">
      <div className="container">
        {!fullPage && (
          <div className="pricing-header text-center">
            <FadeReveal>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>{lang === 'bn' ? 'সাশ্রয়ী প্যাকেজ' : 'Pricing'}</div>
            </FadeReveal>
            <TextReveal className="section-h">
              {lang === 'bn' ? 'স্বচ্ছ প্যাকেজসমূহ' : 'Transparent Pricing'}
            </TextReveal>
            <FadeReveal delay={0.4}>
              <p className="section-sub" style={{ color: 'var(--section-subtext)' }}>
                {lang === 'bn' ? 'কোনো লুকানো খরচ নেই। আপনার ব্যবসার প্রয়োজন অনুযায়ী সঠিক প্যাকেজটি বেছে নিন।' : "No hidden costs. No contracts. Just great work at the right price."}
              </p>
            </FadeReveal>
          </div>
        )}

        <FadeReveal delay={0.5}>
          <div className="pricing-tabs">
            {['social', 'branding', 'web', 'video'].map(tab => (
              <button
                key={tab}
                className={`ptab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tabLabels[tab][lang]}
              </button>
            ))}
          </div>
        </FadeReveal>

        <div className="pricebox active">
          <StaggerReveal delay={0.6}>
            {displayPlans.map((plan, index) => (
              <FadeReveal key={plan.id || index}>
                <div className={`price-card ${plan.featured ? 'featured' : ''}`}>
                  {plan.featured && <div className="popular-badge">{lang === 'bn' ? 'জনপ্রিয়' : 'Most Popular'}</div>}
                  <div className="price-tier">{(lang === 'bn' && plan.tier_bn) ? plan.tier_bn : plan.tier}</div>
                  <div className="price-amount"><span className="currency">৳</span>{plan.price}</div>
                  <div className="price-desc">{(lang === 'bn' && plan.desc_bn) ? plan.desc_bn : plan.desc}</div>
                  <div className="price-divider"></div>
                  <ul className="price-features">
                    {(lang === 'bn' && plan.features_bn) 
                      ? plan.features_bn.map((feat, i) => <li key={i}>{feat}</li>)
                      : plan.features?.map((feat, i) => <li key={i}>{feat}</li>)
                    }
                  </ul>
                  <Link to="/contact" className="btn-red price-cta">{lang === 'bn' ? 'শুরু করুন →' : 'Get Started →'}</Link>
                </div>
              </FadeReveal>
            ))}
          </StaggerReveal>
        </div>

        {highlight && (
          <FadeReveal delay={0.8}>
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link to="/pricing" className="btn-outline-red">
                {lang === 'bn' ? 'সব প্যাকেজ দেখুন' : 'View All Pricing Plans'}
              </Link>
            </div>
          </FadeReveal>
        )}
      </div>
    </section>
  );
};

export default Pricing;
