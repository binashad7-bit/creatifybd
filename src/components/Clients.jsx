import React from 'react';

const Clients = () => {
  const logos = [
    "Fashion House BD", "TechStart Dhaka", "Green Eats", "Nova Clothing", "EduBridge BD",
    "HealthPlus", "CraftNest", "ShopLocal BD", "ByteWave", "Riverside Resto"
  ];

  return (
    <div className="clients-section" style={{ padding: '2rem 1.5rem', overflow: 'hidden' }}>
      <div className="clients-label" style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Trusted by businesses across Bangladesh</div>
      <div className="marquee-wrap" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        <div className="marquee-row" style={{ display: 'flex', gap: '2rem', width: 'max-content', paddingBottom: '0.5rem' }}>
          {/* Duplicate logos for seamless scroll */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="client-logo" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#000', opacity: 0.6, whiteSpace: 'nowrap' }}>{logo}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
