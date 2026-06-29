import React from 'react';
import { PhoneCall } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const CTABand = () => {
  return (
    <section className="cta-section">
      <div>
        <span className="eyebrow">Ready when you are</span>
        <h2>Need a reliable creative team for your next month of content?</h2>
        <p>Tell us about your business and we will recommend the right package, timeline, and first deliverables.</p>
        <div className="cta-actions">
          <a href="#contact" className="btn-red">Start a Project</a>
          <a href={`tel:${siteConfig.whatsappNumber}`} className="btn-outline-red"><PhoneCall size={16} /> {siteConfig.phone}</a>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
