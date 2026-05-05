import React from 'react';

const Clients = () => {
  const logos = [
    "Fashion House BD", "TechStart Dhaka", "Green Eats", "Nova Clothing", "EduBridge BD",
    "HealthPlus", "CraftNest", "ShopLocal BD", "ByteWave", "Riverside Resto"
  ];

  return (
    <div className="clients-section">
      <div className="clients-label">Trusted by businesses across Bangladesh</div>
      <div className="marquee-wrap">
        <div className="marquee-row">
          {/* Duplicate logos for seamless scroll */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="client-logo">{logo}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
