import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, Lightbulb, PenTool, Rocket } from 'lucide-react';
import { FadeReveal, SlideReveal, StaggerReveal, StaggerChild, HoverTilt } from './MotionReveal';

const steps = [
  {
    num: '01',
    icon: <FileSearch size={26} />,
    title: 'Audit and brief',
    desc: 'We review your current brand, competitors, audience, goals, and existing assets before proposing scope.'
  },
  {
    num: '02',
    icon: <Lightbulb size={26} />,
    title: 'Strategy and calendar',
    desc: 'We map the service plan, creative direction, content calendar, milestones, and approval process.'
  },
  {
    num: '03',
    icon: <PenTool size={26} />,
    title: 'Creative production',
    desc: 'Designers, editors, writers, and web specialists produce drafts with organized review checkpoints.'
  },
  {
    num: '04',
    icon: <Rocket size={26} />,
    title: 'Launch and improve',
    desc: 'Final assets are delivered, scheduled, or launched with performance notes and next-step recommendations.'
  }
];

const Process = ({ highlight = false, fullPage = false }) => {
  return (
    <section className={`section process-section ${fullPage ? 'full-page-section' : ''}`} id="process">
      <div className="container">
        {!fullPage && (
          <div className="process-header">
            <FadeReveal>
              <div className="eyebrow">Our Workflow</div>
            </FadeReveal>
            <SlideReveal delay={0.1}>
              <h2 className="section-h">A clear process from first brief to final delivery</h2>
            </SlideReveal>
            <FadeReveal delay={0.2}>
              <p className="section-sub">Every project follows a visible workflow, so you know what is happening, what needs approval, and when deliverables are due.</p>
            </FadeReveal>
          </div>
        )}

        <StaggerReveal className="process-grid-light" staggerDelay={0.12} delay={0.15}>
          {steps.map((step) => (
            <StaggerChild key={step.num}>
              <HoverTilt>
                <article className="process-step-card">
                  <div className="process-step-top">
                    <span>{step.num}</span>
                    <div>{step.icon}</div>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              </HoverTilt>
            </StaggerChild>
          ))}
        </StaggerReveal>

        {highlight && (
          <FadeReveal delay={0.3}>
            <div className="section-action">
              <Link to="/process" className="btn-huge-red">Explore Our Full Workflow -&gt;</Link>
            </div>
          </FadeReveal>
        )}
      </div>
    </section>
  );
};

export default Process;
