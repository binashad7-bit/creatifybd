import React from 'react';
import { Building2, Quote, UsersRound } from 'lucide-react';
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
            <h2 className="section-h">A Dhaka production office serving global small businesses</h2>
            <p className="section-sub">
              CreatifyBD is built for business owners who need dependable creative execution but do not want the cost or complexity of a full in-house marketing department.
            </p>
            <div className="ceo-quote">
              <Quote size={22} />
              <p>
                "Our responsibility is simple: make small businesses look credible, consistent, and ready for international customers."
              </p>
              <strong>B. I. N. Shad, Founder & CEO</strong>
            </div>
            <Link to="/about" className="btn-outline-red">Read Our Story</Link>
          </div>

          <div className="trust-proof-panel">
            <div className="office-card">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
                alt="CreatifyBD collaborative production office"
                loading="lazy"
              />
              <div>
                <Building2 size={18} />
                <span>Centralized creative production office in Dhaka, Bangladesh</span>
              </div>
            </div>
            <div className="team-role-card">
              <div className="team-role-heading">
                <UsersRound size={20} />
                <strong>Specialist team model</strong>
              </div>
              <div className="team-role-list">
                {teamRoles.map(role => <span key={role}>{role}</span>)}
              </div>
            </div>
            <div className="trust-mini-stats">
              <div><strong>0</strong><span>Long-term lock-in</span></div>
              <div><strong>24h</strong><span>Typical response</span></div>
              <div><strong>100%</strong><span>Scope clarity</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTrust;
