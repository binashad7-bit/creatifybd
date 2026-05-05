import React, { useState } from 'react';

const pricingData = {
  social: [
    { tier: 'Basic', price: '1,500', desc: 'Perfect for getting started online', features: ['Facebook page setup & optimization', 'Instagram page setup', 'Profile & cover photo design'] },
    { tier: 'Standard', price: '3,000', desc: 'Best for growing businesses', features: ['Full Facebook & Instagram setup', 'Logo design included', 'Profile & cover photo design', '1-week content scheduling guidance'], featured: true },
    { tier: 'Premium', price: '5,000', desc: 'Full brand launch package', features: ['Advanced FB & Instagram setup', 'Strong account privacy backup', 'Full branding strategy', '2-week content calendar', 'Audience targeting strategy'] }
  ],
  branding: [
    { tier: 'Basic', price: '1,000', desc: 'Clean, simple logo', features: ['1 logo concept', '1 round of revisions', 'PNG & AI file formats'] },
    { tier: 'Standard', price: '2,000', desc: 'More options, more revisions', features: ['2 unique logo concepts', '2 revision rounds', 'PNG, JPG, PDF & AI formats'], featured: true },
    { tier: 'Premium', price: '3,000', desc: 'Complete brand identity', features: ['3 premium logo concepts', 'Unlimited revisions', 'Full brand guidelines doc', 'All file formats'] }
  ],
  web: [
    { tier: 'Basic', price: '8,000', desc: 'Single-page site to get you online', features: ['1-page responsive WordPress', 'Contact form', 'Social media links'] },
    { tier: 'Standard', price: '15,000', desc: 'Full business website', features: ['Up to 5 pages', 'Responsive WordPress design', 'Speed & security optimized', 'Social integration'], featured: true },
    { tier: 'Premium', price: '25,000', desc: 'E-commerce ready site', features: ['Up to 10 pages', 'WooCommerce e-commerce', 'Premium WordPress theme', 'Speed & security optimized'] }
  ],
  video: [
    { tier: 'Basic', price: '500', desc: 'Quick brand video ad', features: ['15-second video ad', 'Premium stock footage', 'Professional voice-over', 'Licensed soundtrack'] },
    { tier: 'Standard', price: '1,000', desc: 'Professional promo video', features: ['30-second video ad', 'Premium stock footage', 'Voice-over + text overlay', 'Licensed soundtrack'], featured: true },
    { tier: 'Premium', price: '20,000', desc: 'Cinematic brand film', features: ['60-second cinematic video', 'Premium grade stock footage', 'Professional voice-over', 'Licensed soundtrack'] }
  ]
};

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('social');

  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <div className="pricing-header sr">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Pricing</div>
          <h2 className="section-h">Clear, Affordable <span className="red">Packages</span></h2>
          <p className="section-sub">No hidden costs. No contracts. Just great work at the right price.</p>
        </div>
        <div className="pricing-tabs sr">
          {['social', 'branding', 'web', 'video'].map(tab => (
            <button
              key={tab}
              className={`ptab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('social', 'Social Media')}
            </button>
          ))}
        </div>

        <div className="pricebox active sr">
          {pricingData[activeTab].map((plan, index) => (
            <div key={index} className={`price-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured && <div className="popular-badge">Most Popular</div>}
              <div className="price-tier">{plan.tier}</div>
              <div className="price-amount"><span className="currency">৳</span>{plan.price}</div>
              <div className="price-desc">{plan.desc}</div>
              <div className="price-divider"></div>
              <ul className="price-features">
                {plan.features.map((feat, i) => <li key={i}>{feat}</li>)}
              </ul>
              <a href="#contact" className="btn-red price-cta">Get Started →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
