import React from 'react';
import { BarChart3, Palette, Video } from 'lucide-react';
import { FadeReveal, TextReveal } from './MotionReveal';

const pillars = [
  {
    icon: <BarChart3 size={24} />,
    title: 'Monthly social media management',
    desc: 'Consistent calendars, post design, captions, scheduling, and reporting for small businesses.'
  },
  {
    icon: <Palette size={24} />,
    title: 'Brand-ready creative assets',
    desc: 'Graphic design, campaign visuals, ad creatives, and templates that keep your business polished.'
  },
  {
    icon: <Video size={24} />,
    title: 'Video, marketing, and websites',
    desc: 'Short-form video edits, digital marketing support, and conversion-focused website design.'
  }
];

const IntroBand = () => {
  return (
    <section className="intro-band-v2">
      <div className="container">
        <div className="intro-main">
          <TextReveal className="intro-title-v2">
            The creative services small businesses ask for most, packaged for reliable monthly execution
          </TextReveal>

          <div className="intro-pillars-v2">
            {pillars.map((pillar, index) => (
              <FadeReveal key={pillar.title} delay={0.15 * index}>
                <article className="pillar-v2">
                  <div className="pillar-icon-v2">{pillar.icon}</div>
                  <h4>{pillar.title}</h4>
                  <p>{pillar.desc}</p>
                </article>
              </FadeReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroBand;
