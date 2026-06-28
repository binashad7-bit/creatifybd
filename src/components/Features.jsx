import React from 'react';
import DOMPurify from 'dompurify';
import { BarChart2, CheckCircle2, Globe2, Layers3 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const defaultItems = [
  {
    icon: <Globe2 size={22} />,
    title: 'International brand standard',
    desc: 'English-first messaging, premium visuals and platform-specific content for global audiences.'
  },
  {
    icon: <Layers3 size={22} />,
    title: 'One integrated creative team',
    desc: 'Social, design, video, ads and web work together instead of feeling like separate vendors.'
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Data-informed creative',
    desc: 'We review reach, saves, clicks and leads so each month becomes sharper than the last.'
  },
  {
    icon: <CheckCircle2 size={22} />,
    title: 'Clear communication',
    desc: 'Weekly updates, structured approvals and predictable delivery for busy founders and marketing teams.'
  }
];

const Features = () => {
  const { content } = useSettings();

  const fContent = content?.features || {
    eyebrow: 'Why CreatifyBD',
    title: 'A lean creative team for <span class="red">global growth.</span>',
    subtitle: 'We combine the cost advantage of Bangladesh with the quality, clarity and delivery standards international clients expect.',
    items: defaultItems,
    stats: [
      { val: '6+', label: 'Core services' },
      { val: '5', label: 'Target regions' },
      { val: '30d', label: 'Content cycles' },
      { val: '1', label: 'Creative partner' }
    ]
  };

  const titleHtml = DOMPurify.sanitize(fContent.title, { ALLOWED_TAGS: ['span', 'br'], ALLOWED_ATTR: ['class'] });
  const items = fContent.items?.length ? fContent.items : defaultItems;

  return (
    <section className="section features-section international-features" id="why">
      <div className="container">
        <div className="features-grid">
          <div>
            <div className="eyebrow sr">{fContent.eyebrow}</div>
            <h2 className="section-h sr sr-delay-1" dangerouslySetInnerHTML={{ __html: titleHtml }} />
            <p className="section-sub sr sr-delay-1">{fContent.subtitle}</p>

            <div className="feature-list">
              {items.map((item, idx) => (
                <div key={item.title || idx} className={`feature-item sr ${idx > 0 ? `sr-delay-${idx}` : ''}`}>
                  <div className="feature-icon-wrap">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="features-visual sr sr-delay-2">
            {fContent.features_visual ? (
              <img src={fContent.features_visual} alt="CreatifyBD global creative delivery" />
            ) : (
              <div className="feat-card-big international-scorecard">
                <h3>Global-ready creative delivery without agency bloat.</h3>
                <div className="feat-stats">
                  {fContent.stats?.map((stat, i) => (
                    <div key={i} className="feat-stat">
                      <div className="feat-stat-val">
                        {stat.val.replace(/[^0-9.]/g, '')}
                        <em>{stat.val.replace(/[0-9.]/g, '')}</em>
                      </div>
                      <div className="feat-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="badge-row">
                  <span className="badge hot">Social Media</span>
                  <span className="badge">Content Strategy</span>
                  <span className="badge">Graphic Design</span>
                  <span className="badge hot">Video Editing</span>
                  <span className="badge">Web Design</span>
                  <span className="badge">Paid Campaigns</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
