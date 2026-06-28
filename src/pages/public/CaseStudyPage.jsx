import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock3, MapPin } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { detailedCaseStudies, socialCaseStudies } from '../../data/caseStudiesData';

const CaseStudyPage = () => {
  const { slug } = useParams();
  const study = detailedCaseStudies[slug];

  if (!study) return <Navigate to="/case-studies" replace />;

  const currentIndex = socialCaseStudies.findIndex((item) => item.id === study.id);
  const nextStudy = socialCaseStudies[(currentIndex + 1) % socialCaseStudies.length];

  return (
    <div className="case-study-page premium-social-case">
      <SEO
        title={`${study.client} Social Media Case Study | CreatifyBD`}
        description={`${study.client}: ${study.title}. Explore the strategy, execution and supplied 90-day performance snapshot.`}
        keywords={`${study.client}, social media management case study, ${study.industry}, CreatifyBD`}
        type="article"
        image={study.image}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: study.title,
          image: study.image,
          author: { '@type': 'Organization', name: 'CreatifyBD' },
          publisher: { '@type': 'Organization', name: 'CreatifyBD' },
          mainEntityOfPage: `https://creatify-bd.web.app/case-study/${study.id}`
        }}
      />
      <Navbar />
      <main>
        <header className="cs-detail-hero" style={{ '--case-accent': study.accent }}>
          <div className="container">
            <Link to="/case-studies" className="cs-back-link"><ArrowLeft size={17} /> All case studies</Link>
            <div className="cs-detail-heading-grid">
              <div>
                <div className="cs-kicker">Project {study.number} / {study.industry}</div>
                <h1>{study.client}</h1>
                <p className="cs-detail-deck">{study.title}</p>
              </div>
              <div className="cs-detail-meta">
                <span><MapPin size={17} />{study.location}</span>
                <span><Clock3 size={17} />{study.duration}</span>
                <span>Instagram / TikTok / Facebook / LinkedIn</span>
              </div>
            </div>
          </div>
        </header>

        <section className="cs-detail-visual">
          <div className="container">
            <img src={study.image} alt={`${study.client} cross-platform social media case study`} />
          </div>
        </section>

        <section className="cs-results-band" aria-label="Performance snapshot">
          <div className="container cs-results-grid">
            {study.results.map((result) => (
              <div className="cs-result" key={result.label}>
                <strong>{result.val}</strong>
                <span>{result.label}</span>
              </div>
            ))}
          </div>
          <p className="container cs-detail-proof">Performance figures reflect the supplied 90-day project reporting snapshot.</p>
        </section>

        <section className="cs-story-section">
          <div className="container cs-story-grid">
            <div className="cs-story-intro">
              <span className="cs-section-label">The brief</span>
              <h2>A social presence designed around the decision journey.</h2>
            </div>
            <div className="cs-story-copy">
              <p className="cs-story-lead">{study.about}</p>
              <article>
                <span>01 / Challenge</span>
                <h3>What needed to change</h3>
                <p>{study.challenge}</p>
              </article>
              <article>
                <span>02 / Strategy</span>
                <h3>How we built momentum</h3>
                <p>{study.solution}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="cs-delivery-section">
          <div className="container cs-delivery-grid">
            <div>
              <span className="cs-section-label">Scope delivered</span>
              <h2>One connected creative and growth system.</h2>
            </div>
            <ul>
              {study.execution.map((item) => <li key={item}><CheckCircle2 size={19} />{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="cs-quote-section">
          <div className="container">
            <blockquote>
              <span aria-hidden="true">&ldquo;</span>
              <p>{study.testimonial.text}</p>
              <footer>{study.testimonial.author}<small>{study.testimonial.position}</small></footer>
            </blockquote>
          </div>
        </section>

        <section className="cs-next-section">
          <Link to={`/case-study/${nextStudy.id}`} className="container cs-next-link">
            <div><span>Next case study / {nextStudy.number}</span><h2>{nextStudy.client}</h2></div>
            <ArrowUpRight size={36} />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudyPage;
