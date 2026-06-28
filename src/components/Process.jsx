import React, { useMemo, useRef } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TextReveal, FadeReveal } from './MotionReveal';
import { useSettings } from '../context/SettingsContext';

const defaultSteps = [
  {
    num: '01',
    icon: '01',
    title: 'Audit & positioning',
    desc: 'We review your channels, competitors, audience, offer and market before recommending a creative direction.'
  },
  {
    num: '02',
    icon: '02',
    title: 'Content strategy',
    desc: 'We build your monthly content pillars, campaign angles, posting rhythm, visual system and approval workflow.'
  },
  {
    num: '03',
    icon: '03',
    title: 'Design, edit & publish',
    desc: 'Our team produces graphics, reels, ads, captions and supporting web assets with a polished brand standard.'
  },
  {
    num: '04',
    icon: '04',
    title: 'Report & optimize',
    desc: 'We turn analytics into next-month decisions: stronger hooks, better formats, sharper offers and clearer conversion paths.'
  }
];

const Process = ({ highlight = false, fullPage = false }) => {
  const { content } = useSettings();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = content?.process?.steps?.length > 0 ? content.process.steps : defaultSteps;
  const safeTitle = useMemo(() => (
    content?.process?.title
      ? DOMPurify.sanitize(content.process.title, { ALLOWED_TAGS: ['span', 'br', 'strong', 'em'], ALLOWED_ATTR: ['class'] })
      : ''
  ), [content?.process?.title]);

  return (
    <section className={`section process-section ${fullPage ? 'full-page-section' : ''}`} id="process" ref={containerRef}>
      <div className="container">
        {!fullPage && (
          <div className="process-header">
            <FadeReveal>
              <div className="eyebrow">Our Workflow</div>
            </FadeReveal>
            <TextReveal className="section-h">
              {safeTitle ? (
                <span dangerouslySetInnerHTML={{ __html: safeTitle }} />
              ) : (
                'A clear system for consistent growth.'
              )}
            </TextReveal>
            <FadeReveal delay={0.4}>
              <p className="section-sub">
                {content?.process?.subtitle || 'A monthly operating rhythm that keeps strategy, creative production and performance improvement connected.'}
              </p>
            </FadeReveal>
          </div>
        )}

        <div className="timeline-container">
          <div className="timeline-line" />
          <motion.div className="timeline-progress" style={{ scaleY, originY: 0 }} />

          <div className="timeline-steps">
            {steps.map((step, idx) => (
              <div key={`${step.num}-${idx}`} className={`process-step-v2 ${idx % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="process-content-v2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className={`step-num ${idx % 2 !== 0 ? 'left' : 'right'}`}>{step.num}</div>
                    <h3 className="process-step-title">{step.title}</h3>
                    <p className="process-step-desc">{step.desc}</p>
                  </motion.div>
                </div>

                <motion.div
                  className="process-icon-wrap process-icon-number"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  aria-hidden="true"
                >
                  {step.icon}
                </motion.div>

                <div className="process-spacer" />
              </div>
            ))}
          </div>
        </div>

        {content?.process?.process_image && (
          <FadeReveal delay={0.6}>
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <img src={content.process.process_image} alt="CreatifyBD workflow" style={{ width: '100%', maxWidth: '800px', borderRadius: '24px', objectFit: 'cover' }} loading="lazy" />
            </div>
          </FadeReveal>
        )}

        {highlight && (
          <FadeReveal delay={0.8}>
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <Link to="/process" className="btn-huge-red">
                Explore Our Full Workflow
              </Link>
            </div>
          </FadeReveal>
        )}
      </div>
    </section>
  );
};

export default Process;
