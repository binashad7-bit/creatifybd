import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { socialCaseStudies } from '../../data/caseStudiesData';

const CaseStudiesPage = () => (
  <div className="case-studies-page social-cases-page">
    <SEO
      title="Social Media Management Case Studies | CreatifyBD"
      description="Explore ten social media management case studies by CreatifyBD across beauty, real estate, hospitality, healthcare, legal, fitness, travel, fashion and interiors."
      keywords="social media management case studies, social media agency portfolio, creative agency results, international social media agency"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CreatifyBD Social Media Management Case Studies',
        url: 'https://creatify-bd.web.app/case-studies'
      }}
    />
    <Navbar />
    <main>
      <header className="cs-index-hero">
        <div className="container cs-index-hero-inner">
          <div>
            <div className="cs-kicker">Selected client work / 01-10</div>
            <h1>Social media work built to move business.</h1>
          </div>
          <div className="cs-index-intro">
            <p>Ten category-specific social systems designed around audience behavior, brand credibility and measurable action.</p>
            <div className="cs-index-facts">
              <span><strong>10</strong> Industries</span>
              <span><strong>4</strong> Core platforms</span>
              <span><strong>90</strong> Day snapshots</span>
            </div>
          </div>
        </div>
      </header>

      <section className="cs-index-work" aria-label="Social media case studies">
        <div className="container cs-index-grid">
          {socialCaseStudies.map((study, index) => (
            <Link
              className={`cs-index-card ${index === 0 || index === 5 ? 'cs-index-card-featured' : ''}`}
              key={study.id}
              to={`/case-study/${study.id}`}
            >
              <div className="cs-index-image-wrap">
                <img src={study.image} alt={`${study.client} social media management project overview`} loading={index < 2 ? 'eager' : 'lazy'} />
                <span className="cs-index-number">{study.number}</span>
              </div>
              <div className="cs-index-card-body">
                <div className="cs-index-card-meta">
                  <span>{study.industry}</span>
                  <span><MapPin size={14} aria-hidden="true" />{study.location}</span>
                </div>
                <h2>{study.client}</h2>
                <p>{study.title}</p>
                <div className="cs-index-outcome">
                  <span>{study.outcome}</span>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="container cs-proof-note">Performance figures reflect the supplied 90-day project reporting snapshots.</p>
      </section>

      <section className="cs-index-cta">
        <div className="container cs-index-cta-inner">
          <div>
            <span>Have a growth target?</span>
            <h2>Let us build the social system behind it.</h2>
          </div>
          <Link className="btn-red" to="/contact">Book a Strategy Call <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default CaseStudiesPage;
