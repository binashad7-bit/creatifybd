import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { Award, Building2, Globe, Quote, ShieldCheck, Users } from 'lucide-react';

const teamMembers = [
  {
    name: 'B. I. N. Shad',
    role: 'Founder & CEO',
    bio: 'Leads creative strategy, client success, and the operating system behind CreatifyBD.'
  },
  {
    name: 'Social Media Strategy Team',
    role: 'Content Planning',
    bio: 'Builds monthly calendars, captions, content pillars, and performance reports.'
  },
  {
    name: 'Design Studio',
    role: 'Graphic Design',
    bio: 'Creates brand assets, post designs, ad creatives, logos, and campaign visuals.'
  },
  {
    name: 'Video & Web Team',
    role: 'Production',
    bio: 'Edits short-form videos and builds conversion-focused websites and landing pages.'
  }
];

const AboutPage = () => {
  return (
    <div className="about-page">
      <SEO
        title="About CreatifyBD | Social Media Management & Creative Team"
        description="Meet CreatifyBD, a Dhaka-based creative production office serving small businesses in the USA, Canada, Australia, and global markets."
        keywords="about creatifybd, social media manager, creative agency, graphic design, video editing, website design"
      />
      <Navbar />

      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Our Agency Story</span>
          <h1 className="page-title">A dependable creative partner for international small businesses</h1>
          <p className="page-subtitle">
            CreatifyBD combines agency-level creative production with clear, gig-style packages for founders who need consistent execution without long contracts.
          </p>
        </div>
      </header>

      <main>
        <section className="about-detail-section">
          <div className="container about-detail-grid">
            <div>
              <h2 className="section-h">Why CreatifyBD exists</h2>
              <p className="section-sub">
                Small businesses often get stuck between expensive agencies and inconsistent freelancers. We built CreatifyBD to offer a third option: a structured remote creative team with fixed scope, accountable delivery, and practical pricing.
              </p>
              <div className="ceo-quote">
                <Quote size={22} />
                <p>
                  "Our goal is to make high-quality creative support accessible for small businesses that want to look trustworthy in front of customers in the USA, Canada, Australia, and beyond."
                </p>
                <strong>B. I. N. Shad, Founder & CEO</strong>
              </div>
            </div>

            <div className="about-values-grid">
              <div><Globe size={22} /><strong>International standards</strong><span>Creative built for global buyers.</span></div>
              <div><ShieldCheck size={22} /><strong>Clear scope</strong><span>Packages, milestones, and revisions upfront.</span></div>
              <div><Award size={22} /><strong>Quality review</strong><span>Deliverables checked before handoff.</span></div>
              <div><Users size={22} /><strong>Specialist team</strong><span>Strategy, design, video, web, and support.</span></div>
            </div>
          </div>
        </section>

        <section className="about-office-section">
          <div className="container">
            <div className="section-header text-center">
              <span className="eyebrow">Our Office</span>
              <h2 className="section-h">Centralized production from Dhaka</h2>
              <p className="section-sub">
                Our Dhaka production office helps us keep workflows organized, quality controlled, and cost-efficient for international clients.
              </p>
            </div>
            <div className="office-gallery-grid">
              <figure>
                <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop" alt="CreatifyBD office workspace" />
                <figcaption><Building2 size={16} /> Creative production workspace</figcaption>
              </figure>
              <figure>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" alt="CreatifyBD team collaboration" />
                <figcaption><Users size={16} /> Team planning and review sessions</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="about-team-section">
          <div className="container">
            <div className="section-header text-center">
              <span className="eyebrow">Team Members</span>
              <h2 className="section-h">The specialists behind each delivery</h2>
            </div>
            <div className="about-team-grid">
              {teamMembers.map(member => (
                <article key={member.name} className="about-team-card">
                  <div className="member-avatar">{member.name.charAt(0)}</div>
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                  <p>{member.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
