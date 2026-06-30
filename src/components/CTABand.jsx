import React from 'react';
  import { Link } from 'react-router-dom';
  import { PhoneCall } from 'lucide-react';
  import { siteConfig } from '../config/siteConfig';
  import { FadeReveal, MagneticWrap } from './MotionReveal';

  const CTABand = () => {
    return (
      <section className="cta-section">
        <div>
          <FadeReveal>
            <span className="eyebrow">Ready when you are</span>
          </FadeReveal>
          <FadeReveal delay={0.12}>
            <h2>Need a reliable creative team for your next month of content?</h2>
          </FadeReveal>
          <FadeReveal delay={0.22}>
            <p>Tell us about your business and we will recommend the right package, timeline, and first deliverables.</p>
          </FadeReveal>
          <FadeReveal delay={0.32}>
            <div className="cta-actions">
              <MagneticWrap strength={0.28}>
                <Link to="/contact" className="btn-red">Start a Project</Link>
              </MagneticWrap>
              <a href={`tel:${siteConfig.whatsappNumber}`} className="btn-outline-red"><PhoneCall size={16} /> {siteConfig.phone}</a>
            </div>
          </FadeReveal>
        </div>
      </section>
    );
  };

  export default CTABand;
  