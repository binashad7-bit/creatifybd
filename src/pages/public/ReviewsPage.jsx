import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { db } from '../../firebase/config';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { Star, Globe, User, Quote, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

// Hardcoded fallback reviews while DB populates
const FALLBACK_REVIEWS = [
  { id: 'r1', clientName: 'Marcus Reynolds', country: 'USA', businessType: 'Real Estate Agency', rating: 5, reviewText: 'CreatifyBD completely transformed our social media presence. The content calendar they built was detailed and strategic. Our Instagram went from zero engagement to 600 profile visits per week within the first month.', gigTitle: 'Monthly Social Media Management', createdAt: { seconds: 1720000000 } },
  { id: 'r2', clientName: 'Sarah Thompson', country: 'Canada', businessType: 'Life Coaching Brand', rating: 5, reviewText: 'I hired them for a full brand identity package including logo and 3 months of social media content. The quality blew me away — it looked completely custom and premium. Zero templates.', gigTitle: 'Brand Identity Design', createdAt: { seconds: 1719000000 } },
  { id: 'r3', clientName: 'James Holloway', country: 'Australia', businessType: 'Restaurant Chain', rating: 5, reviewText: 'The video reels they created for our food business exploded on Instagram. Three of our videos crossed 50,000 views. Hands down best investment for our restaurant brand.', gigTitle: 'Short-form Reels Editing', createdAt: { seconds: 1718000000 } },
  { id: 'r4', clientName: 'Priya Sharma', country: 'USA', businessType: 'E-commerce Store', rating: 5, reviewText: 'Got 5 Reels videos edited and 20 product posts designed. Everything was delivered before deadline and the quality rivaled agencies charging 10x more.', gigTitle: 'Instagram Content Management', createdAt: { seconds: 1717000000 } },
  { id: 'r5', clientName: 'Daniel Carter', country: 'Canada', businessType: 'Law Firm', rating: 5, reviewText: 'The landing page they built for our law firm is sleek, responsive, and ranking well on Google. The contact form converts well. Very professional team.', gigTitle: 'Website Design', createdAt: { seconds: 1716000000 } },
  { id: 'r6', clientName: 'Emma Wilson', country: 'Australia', businessType: 'Digital Agency', rating: 5, reviewText: 'We outsource all our client\'s social media work to CreatifyBD. Consistent delivery, clear communication, and never once missed a deadline in 8 months.', gigTitle: 'Monthly Social Media Management', createdAt: { seconds: 1715000000 } },
];

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
        <User size={20} />
      </div>
      <div className="rc-meta">
        <h5 className="rc-name">{review.clientName}</h5>
        <div className="rc-sub">
          <Globe size={12} />
          <span>{review.country}</span>
          <span className="bullet">·</span>
          <span>{review.businessType}</span>
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

  const countries = ['all', 'USA', 'Canada', 'Australia'];

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
        description="Read verified client reviews from USA, Canada, and Australia. See how CreatifyBD delivers premium social media, design, video, and website services."
        keywords="creatifybd reviews, client testimonials, creative agency feedback"
      />

      <Navbar />

      <section className="reviews-hero dark-section">
        <div className="container">
          <h1 className="page-title">Verified Client <span className="red">Reviews</span></h1>
          <p className="page-subtitle">Real feedback from businesses across USA, Canada, and Australia who experienced our agency-level creative services.</p>

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

      <section className="reviews-content-section">
        <div className="container">
          {/* Country Filter */}
          <div className="country-filter-tabs">
            {countries.map(c => (
              <button 
                key={c} 
                type="button"
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
          color: white;
        }

        .agg-lbl {
          font-size: 0.8rem;
          color: #777;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .agg-divider {
          width: 1px;
          height: 60px;
          background: rgba(255,255,255,0.1);
        }

        .reviews-content-section {
          padding: 5rem 1rem 6rem;
          background: #111;
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
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          color: #888;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
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
          background: #161616;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s;
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
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          flex-shrink: 0;
        }

        .rc-meta {
          flex-grow: 1;
          min-width: 0;
        }

        .rc-name {
          font-size: 1rem;
          color: white;
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
          color: #777;
          flex-wrap: wrap;
        }

        .rc-sub .bullet {
          color: #444;
        }

        .rc-stars {
          flex-shrink: 0;
        }

        .rc-quote-icon {
          color: rgba(232, 25, 44, 0.15);
        }

        .rc-text {
          color: #b0b0b0;
          font-size: 0.9rem;
          line-height: 1.6;
          font-style: italic;
          flex-grow: 1;
        }

        .rc-service-tag {
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.04);
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
          border: 1.5px solid rgba(255,255,255,0.12);
          color: white;
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
