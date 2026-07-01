import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { FadeReveal } from './MotionReveal';

const Clients = () => {
  const { content } = useSettings();
  const clientsContent = content?.clients || {
    label: 'Trusted by small businesses in global markets',
    list: 'Maple & Co, Northstar Dental, Harbor Cafe, Green Eats, Nova Clothing, EduBridge, HealthPlus, CraftNest, ShopLocal, ByteWave, Riverside Resto, Summit Fitness'
  };
  const safeLabel = /(bangladesh|dhaka|\bbd\b)/i.test(clientsContent.label || '')
    ? 'Trusted by small businesses in global markets'
    : clientsContent.label;

  const logos = clientsContent.list
    .split(',')
    .map(s => s.trim())
    .filter(s => s && !/(bangladesh|dhaka|\bbd\b)/i.test(s));
  const marqueeItems = [...logos, ...logos, ...logos];

  return (
    <FadeReveal>
      <section className="clients-section" aria-label="Client trust">
        <FadeReveal delay={0.05}>
          <div className="clients-label">
            {safeLabel}
          </div>
        </FadeReveal>
        <div className="marquee-wrap">
          <div className="marquee-row">
            {marqueeItems.map((logo, index) => (
              <div key={`${logo}-${index}`} className="client-logo">{logo}</div>
            ))}
          </div>
        </div>
      </section>
    </FadeReveal>
  );
};

export default Clients;
