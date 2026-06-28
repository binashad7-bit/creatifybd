import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquare, Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmmHighlight = () => {
  const { lang } = useLanguage();

  return (
    <section className="smm-highlight-section" style={{ background: 'var(--charcoal)', padding: '6rem 1rem' }}>
      <div className="container">
        <div className="smm-grid">
          
          {/* SMM Copy Details */}
          <div>
            <span className="eyebrow red" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--red)' }}>
              {lang === 'bn' ? 'আমাদের সিগনেচার সার্ভিস' : 'Signature Service'}
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem', marginBottom: '1.5rem', lineHeight: '1.2', color: '#fff' }}>
              {lang === 'bn' ? 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট' : 'Complete Social Media Management'}
            </h2>
            <p style={{ color: '#aaa', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              {lang === 'bn' ? 'আমাদের দক্ষ টিম আপনার ব্র্যান্ডের অনলাইন প্রচার, কনটেন্ট তৈরি এবং কাস্টমার এঙ্গেজমেন্টের দায়িত্ব নিবে।' 
              : 'Our specialized division acts as your full-time digital strategy office. We cover brand aesthetics, custom short-form video reels, high-converting copy, scheduling, and strategic organic outreach.'}
            </p>

            <div className="smm-benefits-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="smm-benefit-item">
                <div className="smm-benefit-icon"><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem' }}>
                    {lang === 'bn' ? 'ভিডিও রিলস ও টিকটক ভিডিও' : 'Elite Video Reels & Shorts'}
                  </h4>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                    {lang === 'bn' ? 'ভাইরাল ফরম্যাটে কনটেন্ট তৈরি' : 'Strategic scripting, editing, and pacing tailored for algorithmic push.'}
                  </p>
                </div>
              </div>

              <div className="smm-benefit-item">
                <div className="smm-benefit-icon"><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem' }}>
                    {lang === 'bn' ? 'ব্র্যান্ডেড কাস্টম ডিজাইন' : 'Cohesive Brand Aesthetics'}
                  </h4>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                    {lang === 'bn' ? 'স্ট্যান্ডার্ড প্রফেশনাল গ্রাফিক্স' : 'Visual guides and high-fidelity social assets matching your identity.'}
                  </p>
                </div>
              </div>

              <div className="smm-benefit-item">
                <div className="smm-benefit-icon"><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem' }}>
                    {lang === 'bn' ? 'এনালিটিক্স ও অডিট রিপোর্ট' : 'Monthly Performance Analytics'}
                  </h4>
                  <p style={{ color: '#777', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                    {lang === 'bn' ? 'মাসিক প্রোগ্রেস ও ট্র্যাকিং' : 'Complete dashboard monitoring reach, CTR, and follower conversion.'}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <Link to="/services" className="btn-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                {lang === 'bn' ? 'ডিটেইলস দেখুন' : 'Explore Packages'} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* SMM Visual Mockup Column */}
          <div className="smm-visuals" style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>Campaign Engagement Hub</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--red)', fontWeight: 700 }}>Organic Boost: ON</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#666', display: 'block' }}>Monthly Followers</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', display: 'block', margin: '0.25rem 0' }}>+12,480</span>
                <span style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 700 }}>▲ 38.4% this month</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#666', display: 'block' }}>Post Reach Avg</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', display: 'block', margin: '0.25rem 0' }}>320.4K</span>
                <span style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 700 }}>▲ 114.5% overall</span>
              </div>
            </div>

            {/* Visual Feed Item Preview */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '0.8rem' }}>C</div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>CreatifyBD SMM Studio</span>
                  <span style={{ fontSize: '0.65rem', color: '#555' }}>Sponsored · Instagram Post</span>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#ccc', lineHeight: 1.5, marginBottom: '1rem' }}>
                Ready to take your local brand to international standards? Stop wasting money on standard designs. Upgrade to high-fidelity creative content strategy today.
              </p>
              <div style={{ background: '#222', borderRadius: '12px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                [SMM Visual Content Frame Preview]
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SmmHighlight;
