import React from 'react';
import DOMPurify from 'dompurify';
import { ArrowUpRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const CTABand = () => {
  const { content } = useSettings();
  const ctaContent = content?.cta_band || {
    title: 'Ready to make your <span class="red">social presence</span> look international?',
    subtitle: 'Start with a focused strategy call. We will review your brand, channels and goals, then recommend the right monthly creative plan.',
    primary_btn: 'Book a Strategy Call',
    secondary_btn: 'WhatsApp +880 1951 676600',
    secondary_link: 'https://wa.me/8801951676600'
  };

  const titleHtml = DOMPurify.sanitize(ctaContent.title, { ALLOWED_TAGS: ['span'], ALLOWED_ATTR: ['class'] });

  return (
    <section
      className="cta-section international-cta"
      style={{
        position: 'relative',
        backgroundImage: ctaContent.cta_bg ? `url(${ctaContent.cta_bg})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {ctaContent.cta_bg && <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1 }} />}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2 dangerouslySetInnerHTML={{ __html: titleHtml }} />
        <p>{ctaContent.subtitle}</p>
        <div className="cta-actions">
          <a href="#contact" className="btn-white">
            {ctaContent.primary_btn}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href={ctaContent.secondary_link} className="btn-red-outline">{ctaContent.secondary_btn}</a>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
