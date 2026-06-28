import React from 'react';
import { BarChart3, Clock3, Palette, ShieldCheck } from 'lucide-react';
import { TextReveal, FadeReveal, StaggerReveal } from './MotionReveal';

const pillars = [
  {
    icon: <Clock3 size={24} />,
    title: 'Timezone-aware delivery',
    desc: 'Content planning, approvals and reporting built for USA, Canada, Australia and remote-first teams.'
  },
  {
    icon: <Palette size={24} />,
    title: 'Premium creative system',
    desc: 'A consistent design language for social posts, reels, ads, landing pages and brand campaigns.'
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Performance reporting',
    desc: 'Monthly insights that connect content, engagement, traffic and campaign decisions.'
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Reliable agency process',
    desc: 'Clear scope, weekly communication, documented deliverables and quality checks before launch.'
  }
];

const IntroBand = () => (
  <section className="intro-band-v2 global-proof-band" aria-labelledby="global-proof-title">
    <div className="container">
      <div className="intro-main">
        <TextReveal className="intro-title-v2" id="global-proof-title">
          Built in Bangladesh. Ready for international clients.
        </TextReveal>

        <FadeReveal delay={0.15}>
          <p className="global-proof-sub">
            CreatifyBD is structured like a modern creative growth partner: social media management first, supported by design, video, paid marketing and web experiences.
          </p>
        </FadeReveal>

        <div className="intro-pillars-v2 global-proof-grid">
          <StaggerReveal>
            {pillars.map((pillar) => (
              <div className="pillar-v2 global-proof-card" key={pillar.title}>
                <div className="pillar-icon-v2">{pillar.icon}</div>
                <FadeReveal delay={0.2}>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.desc}</p>
                </FadeReveal>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </div>
  </section>
);

export default IntroBand;
