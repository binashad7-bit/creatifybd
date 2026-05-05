import React from 'react';

const steps = [
  { num: '01', icon: '💬', title: 'Tell Us Your Needs', desc: "Contact us via phone, email, or social media. We'll learn about your business and goals in a quick chat." },
  { num: '02', icon: '🗂️', title: 'Choose Your Package', desc: "Pick from our clear, affordable packages — or we'll create a custom plan tailored to your budget." },
  { num: '03', icon: '⚙️', title: 'We Get to Work', desc: "Our creative team starts on your project immediately, keeping you updated throughout the process." },
  { num: '04', icon: '🚀', title: 'Review & Launch', desc: "Review the deliverables, request any revisions, and then go live. We don't stop until you're happy." }
];

const Process = () => {
  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div className="process-header sr">
          <div className="eyebrow">How It Works</div>
          <h2 className="section-h">Simple 4-Step <span className="red">Process</span></h2>
          <p className="section-sub">From first contact to delivered results — fast, smooth, and transparent.</p>
        </div>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className={`step-card sr ${index > 0 ? `sr-delay-${index}` : ''}`}>
              <div className="step-num">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
