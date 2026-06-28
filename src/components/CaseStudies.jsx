import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { socialCaseStudies } from '../data/caseStudiesData';

const CaseStudies = () => {
  const selected = socialCaseStudies.slice(0, 3);

  return (
    <section className="home-cases" id="case-studies">
      <div className="container">
        <div className="home-cases-header">
          <div>
            <span className="cs-section-label">Selected social media work</span>
            <h2>Strategy is only compelling when the work proves it.</h2>
          </div>
          <p>Category-specific social systems built to strengthen attention, trust and action across the full customer journey.</p>
        </div>

        <div className="home-cases-grid">
          {selected.map((study, index) => (
            <Link className={`home-case-card ${index === 0 ? 'home-case-card-lead' : ''}`} to={`/case-study/${study.id}`} key={study.id}>
              <div className="home-case-image">
                <img src={study.image} alt={`${study.client} social media management case study`} loading={index === 0 ? 'eager' : 'lazy'} />
              </div>
              <div className="home-case-info">
                <span>{study.number} / {study.industry}</span>
                <h3>{study.client}</h3>
                <p>{study.title}</p>
                <div><strong>{study.outcome}</strong><ArrowUpRight size={20} /></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="home-cases-footer">
          <p>Explore strategy, execution and project-reported performance snapshots.</p>
          <Link to="/case-studies" className="btn-outline-dark">View all 10 case studies <ArrowUpRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
