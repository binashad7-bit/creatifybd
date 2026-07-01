import React, { useEffect, useMemo, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { detailedCaseStudies } from '../data/caseStudiesData';
import OptimizedImage from './OptimizedImage';
import { FadeReveal, SlideReveal, ImageReveal, StaggerReveal, StaggerChild, MagneticWrap } from './MotionReveal';

const fallbackImages = {
  'graphic-design-apex': '',
  'marketing-luxe': '',
  'web-design-finflow': ''
};

const CaseStudies = () => {
  const [images, setImages] = useState({});
  const [remoteCases, setRemoteCases] = useState([]);

  useEffect(() => {
    const unsubCases = onSnapshot(
      collection(db, 'case_studies'),
      (snap) => {
        const data = snap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => (b.createdAt?.toMillis ? b.createdAt.toMillis() : 0) - (a.createdAt?.toMillis ? a.createdAt.toMillis() : 0));
        setRemoteCases(data.slice(0, 3));
      },
      () => setRemoteCases([])
    );

    const unsubImages = onSnapshot(
      collection(db, 'case_study_images'),
      (snap) => {
        const imgMap = {};
        snap.docs.forEach(doc => { imgMap[doc.id] = doc.data(); });
        setImages(imgMap);
      },
      () => setImages({})
    );

    return () => {
      unsubCases();
      unsubImages();
    };
  }, []);

  const cases = useMemo(() => {
    if (remoteCases.length > 0) return remoteCases;
    return Object.values(detailedCaseStudies).map(item => ({
      id: item.id,
      title: item.title,
      sector: item.industry,
      tagline: `${item.solution} Results focus: ${item.results.map(result => `${result.val} ${result.label}`).join(', ')}.`,
      fallbackImage: fallbackImages[item.id]
    }));
  }, [remoteCases]);

  return (
    <section className="duck-cs-section" id="case-studies">
      <div className="container">
        <div className="cs-intro">
          <FadeReveal>
            <div className="eyebrow">Selected Case Studies</div>
          </FadeReveal>
          <FadeReveal delay={0.1}>
            <h2 className="duck-h section-h">Creative work tied to measurable business outcomes</h2>
          </FadeReveal>
        </div>

        <StaggerReveal className="duck-cs-list" stagger={0.15} delay={0.1}>
          {cases.map((project, index) => {
            const csImages = images[project.id] || {};
            const heroImg = csImages.heroUrl || csImages.resultUrl || project.fallbackImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop';
            const isReverse = index % 2 !== 0;

            return (
              <StaggerChild key={project.id}>
                <article className={`duck-cs-item ${isReverse ? 'reverse' : ''}`}>
                  <SlideReveal from={isReverse ? 'right' : 'left'} delay={0.05} className="duck-cs-copy-cell">
                    <div className="duck-cs-info">
                      <div className="duck-cs-num">0{index + 1}</div>
                      <h3 className="duck-cs-title">{project.title}</h3>
                      <div className="duck-cs-tags">
                        {project.sector && <span className="duck-tag">{project.sector}</span>}
                      </div>
                      <p className="duck-cs-desc">{project.tagline}</p>
                      <MagneticWrap strength={0.18}>
                        <Link to="/case-studies" className="duck-cs-link">
                          Read Case Study <ArrowRight size={18} />
                        </Link>
                      </MagneticWrap>
                    </div>
                  </SlideReveal>

                  <SlideReveal from={isReverse ? 'left' : 'right'} delay={0.1} className="duck-cs-media-cell">
                    <div className="duck-cs-visual">
                      <div className="duck-cs-img-wrap">
                        <ImageReveal direction="up" delay={0.15}>
                          <OptimizedImage src={heroImg} alt={project.title} objectFit="cover" />
                        </ImageReveal>
                      </div>
                    </div>
                  </SlideReveal>
                </article>
              </StaggerChild>
            );
          })}
        </StaggerReveal>

        <FadeReveal delay={0.3}>
          <div className="duck-cs-footer">
            <MagneticWrap strength={0.15}>
              <Link to="/case-studies" className="btn-huge-red">View All Case Studies -&gt;</Link>
            </MagneticWrap>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
};

export default CaseStudies;
