import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { detailedCaseStudies } from '../../data/caseStudiesData';

const CaseStudiesPage = () => {
  const studies = Object.values(detailedCaseStudies);

  return (
    <div className="case-studies-page">
      <SEO
        title="Case Studies | CreatifyBD Creative Work"
        description="Explore CreatifyBD case studies across branding, digital marketing, and website design with challenges, strategy, and measurable results."
        keywords="creatifybd case studies, digital marketing case study Bangladesh, creative agency results"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "CreatifyBD Case Studies",
          "url": "https://creatifybd.com/case-studies"
        }}
      />
      <Navbar />
      <main>
        <section className="page-header page-header-light">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container"
          >
            <h1 className="page-title">Case <span className="red">Studies</span></h1>
            <p className="page-subtitle">Strategic creative work explained through challenge, solution, and measurable outcomes.</p>
          </motion.div>
        </section>

        <section className="container" style={{ padding: '5rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {studies.map((study) => (
              <Link
                key={study.id}
                to={`/case-study/${study.id}`}
                style={{
                  display: 'flex',
                  minHeight: '360px',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2rem',
                  borderRadius: '20px',
                  background: `linear-gradient(145deg, ${study.color || 'var(--surface-soft)'} 0%, var(--surface-soft) 65%)`,
                  color: '#fff',
                  textDecoration: 'none',
                  overflow: 'hidden'
                }}
              >
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>
                    {study.category} / {study.year}
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.05, marginBottom: '1rem' }}>{study.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{study.about}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                  {study.results.slice(0, 3).map((result) => (
                    <span key={result.label} style={{ border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '0.5rem 0.8rem', fontSize: '0.8rem', fontWeight: 700 }}>
                      {result.val} {result.label}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
