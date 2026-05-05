import React from 'react';

const servicesData = [
  { icon: '📱', title: 'Social Media Management', desc: 'Facebook & Instagram setup, content creation, community management, and follower growth.', price: 'From ৳1,500', bg: 's1' },
  { icon: '🎨', title: 'Branding & Logo Design', desc: 'Impactful logos and branding materials with unlimited revisions and full brand guidelines.', price: 'From ৳1,000', bg: 's2' },
  { icon: '📸', title: 'Product Photography', desc: 'Studio, lifestyle, and white background shots. Professional lighting and post-editing.', price: 'From ৳1,500', bg: 's3' },
  { icon: '🎬', title: 'Video Production', desc: '15 to 60-second cinematic brand videos with voice-over and licensed soundtracks.', price: 'From ৳500', bg: 's4' },
  { icon: '💻', title: 'Website Design & Dev', desc: 'Responsive, SEO-optimized WordPress websites from single-page to full e-commerce.', price: 'From ৳8,000', bg: 's5' },
  { icon: '📢', title: 'Advertising Campaigns', desc: 'Targeted Facebook, Instagram & Google ads. Full campaign management and optimization.', price: 'Custom Pricing', bg: 's6' },
  { icon: '🖼️', title: 'Thumbnail & Poster Design', desc: 'Eye-catching YouTube thumbnails and creative campaign posters built for maximum CTR.', price: 'From ৳200', bg: 's1' }
];

const Services = () => {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="services-header sr">
          <div>
            <div className="eyebrow">What We Do</div>
            <h2 className="section-h">Our <span className="red">Services</span></h2>
          </div>
          <a href="#contact" className="btn-red">Get a Free Quote →</a>
        </div>
      </div>
      <div className="services-scroll-wrap sr sr-delay-1">
        <div className="services-row">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-img">
                <div className={`service-img-bg ${service.bg}`}>{service.icon}</div>
              </div>
              <div className="service-body">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <span className="service-tag">{service.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
