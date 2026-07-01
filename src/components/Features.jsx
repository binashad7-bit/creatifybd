import React from 'react';
import { BarChart3, Clock3, Globe2, ShieldCheck } from 'lucide-react';
import { FadeReveal, StaggerReveal, StaggerChild, ScaleReveal, CountUp, SlideReveal } from './MotionReveal';

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
          <SlideReveal from="left">
            <div>
              <FadeReveal>
                <div className="eyebrow">Why CreatifyBD</div>
              </FadeReveal>
              <FadeReveal delay={0.1}>
                <h2 className="section-h">A reliable creative team without agency overhead</h2>
              </FadeReveal>
              <FadeReveal delay={0.2}>
                <p className="section-sub">
                  We combine structured creative operations with international service standards, giving small businesses dependable creative output at practical monthly pricing.
                </p>
              </FadeReveal>

              <StaggerReveal delay={0.3} stagger={0.1} className="feature-list">
                {featureItems.map((item) => (
                  <StaggerChild key={item.title}>
                    <div className="feature-item">
                      <div className="feature-icon-wrap">{item.icon}</div>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </StaggerChild>
                ))}
              </StaggerReveal>
            </div>
          </SlideReveal>

          <SlideReveal from="right" delay={0.15}>
            <div className="features-visual">
              <ScaleReveal delay={0.25}>
                <div className="feat-card-big">
                  <h3>Creative operations built for recurring growth</h3>
                  <div className="feat-stats">
                    <div className="feat-stat">
                      <div className="feat-stat-val">
                        <CountUp to={100} suffix="+" duration={2} />
                      </div>
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
              </ScaleReveal>
            </div>
          </SlideReveal>
        </div>
      </div>
    </section>
  );
};

export default Features;
