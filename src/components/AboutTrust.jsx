import React from 'react';
  import { Building2, MonitorCheck, Quote, UsersRound, Video } from 'lucide-react';
  import { Link } from 'react-router-dom';

  const teamRoles = [
    'Social strategist',
    'Graphic designer',
    'Video editor',
    'Web designer',
    'Client success'
  ];

  const AboutTrust = () => {
    return (
      <section className="about-trust-section" id="about">
        <div className="container">
          <div className="about-trust-grid">
            <div>
              <span className="eyebrow">About CreatifyBD</span>
              <h2 className="section-h">A specialist creative team serving global brands</h2>
              <p className="section-sub">
                CreatifyBD is built for founders and lean marketing teams who need dependable creative execution without the cost or complexity of a full in-house department.
              </p>
              <div className="ceo-quote ceo-quote-with-image">
                <div className="ceo-portrait-card">
                  <div className="ceo-portrait-mark">BS</div>
                  <span>Founder &amp; CEO</span>
                </div>
                <blockquote>
                  <Quote size={18} />
                  <p>
                    "Our responsibility is simple: make every brand look credible, consistent, and ready for international customers."
                  </p>
                  <cite>— B. I. N. Shad</cite>
                </blockquote>
              </div>
              <Link to="/about" className="btn-outline-red">Read Our Story</Link>
            </div>

            <div className="trust-proof-panel">
              <div className="office-card office-card-main">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
                  alt="CreatifyBD collaborative production office"
                  loading="lazy"
                />
                <div className="office-card-caption">
                  <Building2 size={18} />
                  <span>Remote-ready creative operations for international clients</span>
                </div>
              </div>
              <div className="agency-moment-grid">
                <figure>
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop" alt="CreatifyBD team planning creative deliverables" loading="lazy" />
                  <figcaption><UsersRound size={16} /> Team production sprint</figcaption>
                </figure>
                <figure>
                  <img src="https://images.unsplash.com/photo-1616587894289-86480e533129?q=80&w=900&auto=format&fit=crop" alt="Online client review meeting" loading="lazy" />
                  <figcaption><Video size={16} /> Online client review</figcaption>
                </figure>
              </div>
              <div className="team-role-card">
                <div className="team-role-heading">
                  <MonitorCheck size={20} />
                  <strong>Specialist delivery model</strong>
                </div>
                <div className="team-role-list">
                  {teamRoles.map((role, i) => (
                    <React.Fragment key={role}>
                      <span className="team-role-item">{role}</span>
                      {i < teamRoles.length - 1 && <span className="role-sep" aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="trust-mini-stats">
                <div className="trust-stat">
                  <strong>No</strong>
                  <span>Long-term lock-in</span>
                </div>
                <div className="trust-stat">
                  <strong>24h</strong>
                  <span>Typical response</span>
                </div>
                <div className="trust-stat">
                  <strong>100%</strong>
                  <span>Scope clarity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default AboutTrust;
