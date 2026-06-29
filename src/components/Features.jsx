import React from 'react';
import { BarChart3, Clock3, Globe2, ShieldCheck } from 'lucide-react';

const featureItems = [
  {
    icon: <Globe2 size={22} />,
    title: 'Built for US, Canada, and Australia buyers',
    desc: 'Copy, visuals, formats, and offers are shaped for international small-business audiences.'
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Agency process, gig-style clarity',
    desc: 'Clear scope, milestones, revisions, and deliverables before work begins.'
  },
  {
    icon: <Clock3 size={22} />,
    title: 'Timezone-friendly production',
    desc: 'Async updates, organized reviews, and steady weekly progress without meetings overload.'
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Creative tied to business outcomes',
    desc: 'Content and design decisions are made around leads, trust, reach, and conversion.'
  }
];

const Features = () => {
  return (
    <section className="section features-section" id="why">
      <div className="container">
        <div className="features-grid">
          <div>
            <div className="eyebrow">Why CreatifyBD</div>
            <h2 className="section-h">A reliable creative team without agency overhead</h2>
            <p className="section-sub">
              We combine a structured production office in Dhaka with international service standards, giving small businesses dependable creative output at practical monthly pricing.
            </p>

            <div className="feature-list">
              {featureItems.map((item) => (
                <div key={item.title} className="feature-item">
                  <div className="feature-icon-wrap">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="features-visual">
            <div className="feat-card-big">
              <h3>Creative operations built for recurring growth</h3>
              <div className="feat-stats">
                <div className="feat-stat">
                  <div className="feat-stat-val">100<em>+</em></div>
                  <div className="feat-stat-label">Projects delivered</div>
                </div>
                <div className="feat-stat">
                  <div className="feat-stat-val">5.0<em>*</em></div>
                  <div className="feat-stat-label">Client rating target</div>
                </div>
                <div className="feat-stat">
                  <div className="feat-stat-val">24<em>h</em></div>
                  <div className="feat-stat-label">Typical response window</div>
                </div>
              </div>
              <div className="badge-row">
                <span className="badge hot">Social Media Management</span>
                <span className="badge">Graphic Design</span>
                <span className="badge">Video Editing</span>
                <span className="badge">Digital Marketing</span>
                <span className="badge">Website Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
