import React from 'react';

const portfolioItems = [
  { label: 'Social Media Design', overlay: 'Brand Identity', pf: 'pf-1' },
  { label: 'Website Design', overlay: 'Web Design', pf: 'pf-2' },
  { label: 'Product Photography', overlay: 'Photography', pf: 'pf-3' },
  { label: 'Logo Design', overlay: 'Branding', pf: 'pf-4' },
  { label: 'Ad Campaign Creative', overlay: 'Ad Design', pf: 'pf-5' },
  { label: 'Thumbnail Design', overlay: 'YouTube', pf: 'pf-6' },
  { label: 'Brand Video', overlay: 'Videography', pf: 'pf-7' },
  { label: 'Poster Design', overlay: 'Print Design', pf: 'pf-8' },
  { label: 'E-commerce Site', overlay: 'Web Dev', pf: 'pf-9' }
];

const Portfolio = () => {
  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container">
        <div className="portfolio-header sr">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Work</div>
          <h2 className="section-h">Creative Work That <span className="red">Converts</span></h2>
          <p className="section-sub">A glimpse of what we've created for local businesses across Bangladesh.</p>
        </div>
        <div className="portfolio-masonry sr sr-delay-1">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-item">
              <div className={`pf-block ${item.pf}`}>{item.label}</div>
              <div className="portfolio-overlay"><span>{item.overlay}</span></div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }} className="sr">
          <a href="#contact" className="btn-red" style={{ fontSize: '0.95rem', padding: '0.8rem 2rem' }}>See All Projects →</a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
