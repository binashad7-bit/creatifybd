import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { db } from '../../firebase/config';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { Star, Globe, Quote, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { CLIENT_REVIEWS } from '../../data/clientReviews';

const FALLBACK_REVIEWS = CLIENT_REVIEWS;

const getAvatarUrl = (review) => {
  if (review.avatarUrl) return review.avatarUrl;
  const label = (review.clientName || 'Client')
    .split(/[_\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('') || 'C';
  const palette = [
    ['#fff1f2', '#e8192c'],
    ['#eef7ff', '#1463ff'],
    ['#f2fff8', '#07885d'],
    ['#fff8ea', '#a46100'],
    ['#f6f1ff', '#6d35c7'],
  ];
  const index = (review.clientName || '').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length;
  const [bg, fg] = palette[index];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="64" fill="${bg}"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="44" font-weight="800" fill="${fg}">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const StarDisplay = ({ rating }) => (
  <div style={{ display: 'flex', gap: '0.1rem' }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={15} 
        fill={i < rating ? 'var(--red)' : 'none'} 
        stroke={i < rating ? 'var(--red)' : '#444'} 
      />
    ))}
  </div>
);

const ReviewCard = ({ review, idx }) => (
  <motion.div 
    className="review-card-pub"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: idx * 0.06 }}
  >
    <div className="rc-header">
      <div className="rc-avatar">
        <img src={getAvatarUrl(review)} alt={`${review.clientName} profile`} loading="lazy" />
      </div>
      <div className="rc-meta">
        <h5 className="rc-name">{review.clientName}</h5>
        <div className="rc-sub">
          <Globe size={12} />
          <span>{review.country}</span>
          <span className="bullet">·</span>
          <span>Verified order</span>
          {review.repeatClient && <span>Repeat client</span>}
        </div>
      </div>
      <div className="rc-stars">
        <StarDisplay rating={review.rating} />
      </div>
    </div>

    <div className="rc-quote-icon"><Quote size={28} /></div>
    <p className="rc-text">"{review.reviewText}"</p>

    {review.gigTitle && (
      <div className="rc-service-tag">
        <span>Service: {review.gigTitle}</span>
      </div>
    )}
  </motion.div>
);

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [displayCount, setDisplayCount] = useState(9);

  const countries = [
    'all',
    ...Array.from(new Set(reviews.map(r => r.country).filter(Boolean))).sort((a, b) => {
      const priority = ['USA', 'Canada', 'Australia', 'UK', 'Germany'];
      const aPriority = priority.indexOf(a);
      const bPriority = priority.indexOf(b);
      if (aPriority !== -1 || bPriority !== -1) {
        return (aPriority === -1 ? 99 : aPriority) - (bPriority === -1 ? 99 : bPriority);
      }
      return a.localeCompare(b);
    }),
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc'),
          limit(60)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setReviews(data);
        }
      } catch (err) {
        console.warn('Using fallback reviews:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filtered = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.country === filter);

  const displayed = filtered.slice(0, displayCount);

  // Aggregate stats
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;

  return (
    <div className="reviews-page-pub">
      <SEO 
        title="Client Reviews & Verified Feedback | CreatifyBD"
        description="Read verified client reviews from completed CreatifyBD creative orders. See how our team delivers responsive communication, fast delivery, and high-quality creative work."
        keywords="creatifybd reviews, client testimonials, creative agency feedback"
      />

      <Navbar />

      <section className="reviews-hero dark-section">
        <div className="container">
          <h1 className="page-title">Verified Client <span className="red">Reviews</span></h1>
          <p className="page-subtitle">Real client feedback from completed creative orders, reviewed through our delivery and approval workflow.</p>

          <div className="reviews-aggregate-stats">
            <div className="agg-stat">
              <span className="agg-num">{avgRating.toFixed(1)}</span>
              <StarDisplay rating={5} />
              <span className="agg-lbl">Average Rating</span>
            </div>
            <div className="agg-divider" />
            <div className="agg-stat">
              <span className="agg-num">{reviews.length}+</span>
              <span className="agg-lbl">Total Reviews</span>
            </div>
            <div className="agg-divider" />
            <div className="agg-stat">
              <span className="agg-num">{Math.round((fiveStarCount / reviews.length) * 100)}%</span>
              <span className="agg-lbl">Five-Star Ratings</span>
            </div>
          </div>
        </div>
      </section>

      <section className="review-workflow-band" aria-label="Verified review workflow">
        <div className="container">
          <div className="review-workflow-row">
            {[
              'Order placed',
              'Delivery reviewed',
              'Feedback submitted',
              'Published after approval',
            ].map((item, index) => (
              <div className="review-workflow-step" key={item}>
                <span>{index + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reviews-content-section">
        <div className="container">
          {/* Country Filter */}
          <div className="country-filter-tabs">
            {countries.map(c => (
              <button 
                key={c} 
                type="button"
                data-country={c === 'all' ? 'All Countries' : c}
                className={`filter-tab-btn ${filter === c ? 'active' : ''}`}
                onClick={() => { setFilter(c); setDisplayCount(9); }}
              >
                {c === 'all' ? 'All Countries' : `🌏 ${c}`}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="reviews-masonry-grid">
            {displayed.map((review, idx) => (
              <ReviewCard key={review.id} review={review} idx={idx} />
            ))}
          </div>

          {/* Load More */}
          {filtered.length > displayCount && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button 
                type="button"
                className="btn-outline-dark"
                onClick={() => setDisplayCount(prev => prev + 9)}
              >
                <ChevronDown size={18} />
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        .reviews-hero {
          padding: 8rem 1rem 5rem;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .reviews-aggregate-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          margin-top: 3rem;
          flex-wrap: wrap;
        }

        .agg-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .agg-num {
          font-size: 2.5rem;
          font-weight: 900;
          color: #16181d;
        }

        .agg-lbl {
          font-size: 0.8rem;
          color: #6b707c;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .agg-divider {
          width: 1px;
          height: 60px;
          background: rgba(17,19,24,0.1);
        }

        .reviews-content-section {
          padding: 5rem 1rem 6rem;
          background: #fbfaf8;
        }

        .review-workflow-band {
          background: #ffffff;
          border-bottom: 1px solid rgba(17,19,24,0.08);
          padding: 1.25rem 1rem;
        }

        .review-workflow-row {
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.75rem;
        }

        .review-workflow-step {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          min-width: 0;
          color: #303642;
          font-size: 0.84rem;
          font-weight: 700;
        }

        .review-workflow-step span {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          background: #fff7f8;
          color: var(--red);
          border: 1px solid rgba(232,25,44,0.16);
          font-size: 0.75rem;
          font-weight: 900;
        }

        @media (max-width: 720px) {
          .review-workflow-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .country-filter-tabs {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .filter-tab-btn {
          padding: 0.6rem 1.25rem;
          background: #ffffff;
          border: 1px solid rgba(17,19,24,0.1);
          border-radius: 100px;
          color: #5f6470;
          font-size: 0;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-tab-btn::after {
          content: attr(data-country);
          font-size: 0.85rem;
        }

        .filter-tab-btn:hover,
        .filter-tab-btn.active {
          background: var(--red);
          border-color: var(--red);
          color: white;
        }

        .reviews-masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .review-card-pub {
          background: #ffffff;
          border: 1px solid rgba(17,19,24,0.08);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s;
          box-shadow: 0 14px 36px rgba(17, 19, 24, 0.06);
        }

        .review-card-pub:hover {
          border-color: rgba(232, 25, 44, 0.2);
        }

        .rc-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .rc-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #fff7f8;
          border: 1px solid rgba(232,25,44,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--red);
          flex-shrink: 0;
          overflow: hidden;
        }

        .rc-avatar img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .rc-meta {
          flex-grow: 1;
          min-width: 0;
        }

        .rc-name {
          font-size: 1rem;
          color: #16181d;
          font-weight: 700;
          margin-bottom: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .rc-sub {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: #6b707c;
          flex-wrap: wrap;
        }

        .rc-sub .bullet {
          display: none;
          color: #a6abb5;
        }

        .rc-stars {
          flex-shrink: 0;
        }

        .rc-quote-icon {
          color: rgba(232, 25, 44, 0.15);
        }

        .rc-text {
          color: #3f4652;
          font-size: 0.9rem;
          line-height: 1.6;
          font-style: italic;
          flex-grow: 1;
        }

        .rc-service-tag {
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(17,19,24,0.08);
        }

        .rc-service-tag span {
          font-size: 0.7rem;
          color: var(--red);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-outline-dark {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          background: transparent;
          border: 1.5px solid rgba(17,19,24,0.14);
          color: #16181d;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-outline-dark:hover {
          border-color: var(--red);
          color: var(--red);
        }
      `}</style>
    </div>
  );
};

export default ReviewsPage;
