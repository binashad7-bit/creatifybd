import React from 'react';
import { ArrowRight, CalendarCheck, CheckCircle, LineChart, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: <CalendarCheck size={20} />,
    title: 'Done-for-you monthly calendar',
    desc: 'Post ideas, designs, captions, hashtags, and scheduling prepared before the month starts.'
  },
  {
    icon: <MessageSquareText size={20} />,
    title: 'Brand voice and community support',
    desc: 'Professional captions, customer-facing replies guidance, and consistent visual tone.'
  },
  {
    icon: <LineChart size={20} />,
    title: 'Performance reporting',
    desc: 'Monthly reach, engagement, content winners, and next-step recommendations.'
  }
];

const SmmHighlight = () => {
  return (
    <section className="smm-highlight-section">
      <div className="container">
        <div className="smm-grid">
          <div>
            <span className="eyebrow">Managed Social Media</span>
            <h2>Monthly social media management for international small businesses</h2>
            <p className="smm-lead">
              A dedicated creative workflow for founders who need consistent, polished social media without hiring a full in-house team. We plan, design, write, schedule, and report, so your business stays active and trustworthy every week.
            </p>

            <div className="smm-benefits-list">
              {benefits.map((item) => (
                <div className="smm-benefit-item" key={item.title}>
                  <div className="smm-benefit-icon">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/services" className="btn-red smm-cta">
              Explore SMM Packages <ArrowRight size={16} />
            </Link>
          </div>

          <div className="smm-visuals" aria-label="Social media management deliverables">
            <div className="smm-panel-header">
              <span>Monthly Growth Board</span>
              <strong>Ready for Review</strong>
            </div>
            <div className="smm-metrics-grid">
              <div>
                <small>Content pieces</small>
                <strong>30</strong>
                <span>Posts, stories, reels</span>
              </div>
              <div>
                <small>Platforms</small>
                <strong>3</strong>
                <span>Instagram, Facebook, LinkedIn</span>
              </div>
            </div>
            <div className="smm-calendar-card">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <div className={idx < 4 ? 'is-ready' : ''} key={day}>
                  <span>{day}</span>
                  {idx < 4 && <CheckCircle size={14} />}
                </div>
              ))}
            </div>
            <div className="smm-note">
              <strong>Included:</strong> content calendar, branded templates, short-form video direction, caption writing, scheduling support, and analytics.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmmHighlight;
