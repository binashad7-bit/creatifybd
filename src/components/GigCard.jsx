import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const GigCard = ({ gig }) => {
  // Determine special badge based on category or price
  const getSpecialBadge = () => {
    if (gig.category === 'social-media-management') {
      return { text: 'Monthly Plan', class: 'monthly' };
    }
    if (gig.startingPrice >= 200) {
      return { text: 'Best Seller', class: 'best-seller' };
    }
    if (gig.startingPrice < 50) {
      return { text: 'Fast Delivery', class: 'fast' };
    }
    return { text: 'Popular', class: 'popular' };
  };

  const badge = getSpecialBadge();
  const mainImage = gig.galleryImages && gig.galleryImages[0]
    ? gig.galleryImages[0]
    : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop';

  return (
    <motion.div 
      className="gig-card"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link to={`/gigs/${gig.slug}`} className="gig-card-link" aria-label={`View details for ${gig.title}`}>
        <div className="gig-card-image-wrapper">
          <img 
            src={mainImage} 
            alt={gig.title} 
            className="gig-card-img" 
            loading="lazy" 
          />
          <span className={`gig-card-badge ${badge.class}`}>
            {badge.text}
          </span>
          <button 
            type="button" 
            className="gig-card-favorite-btn" 
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart size={16} />
          </button>
        </div>

        <div className="gig-card-body">
          <div className="gig-card-meta">
            <span className="gig-card-category">
              {gig.subcategory || gig.category.replace('-', ' ')}
            </span>
            <div className="gig-card-rating">
              <Star size={14} fill="var(--red)" stroke="var(--red)" />
              <span className="rating-value">{gig.rating?.toFixed(1) || '5.0'}</span>
              <span className="rating-count">({gig.reviewCount || '10'})</span>
            </div>
          </div>

          <h3 className="gig-card-title">{gig.title}</h3>
          
          <p className="gig-card-desc">
            {gig.overview.length > 95 ? `${gig.overview.substring(0, 95)}...` : gig.overview}
          </p>

          <div className="gig-card-footer">
            <div className="gig-card-delivery">
              <Clock size={14} />
              <span>{gig.packages?.basic?.deliveryTime || gig.deliveryTime || 7} Days Delivery</span>
            </div>
            <div className="gig-card-price">
              <span className="price-label">Starting At</span>
              <span className="price-value">${gig.startingPrice} <span className="price-unit">USD</span></span>
            </div>
          </div>
        </div>
      </Link>

      <style>{`
        .gig-card {
          background: #161616;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s;
        }

        .gig-card:hover {
          border-color: rgba(232, 25, 44, 0.3);
          box-shadow: 0 15px 40px rgba(232, 25, 44, 0.1);
        }

        .gig-card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .gig-card-image-wrapper {
          position: relative;
          padding-top: 62.5%; /* 16:10 aspect ratio */
          width: 100%;
          overflow: hidden;
          background: #222;
        }

        .gig-card-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gig-card:hover .gig-card-img {
          transform: scale(1.05);
        }

        .gig-card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.3rem 0.8rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
        }

        .gig-card-badge.monthly {
          background: rgba(33, 150, 243, 0.2);
          border: 1px solid rgba(33, 150, 243, 0.4);
          color: #2196f3;
        }

        .gig-card-badge.best-seller {
          background: rgba(255, 152, 0, 0.2);
          border: 1px solid rgba(255, 152, 0, 0.4);
          color: #ff9800;
        }

        .gig-card-badge.fast {
          background: rgba(7caf50, 0.2);
          border: 1px solid rgba(76, 175, 80, 0.4);
          color: #4caf50;
        }

        .gig-card-badge.popular {
          background: rgba(232, 25, 44, 0.2);
          border: 1px solid rgba(232, 25, 44, 0.4);
          color: var(--red);
        }

        .gig-card-favorite-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.2s;
          z-index: 2;
        }

        .gig-card-favorite-btn:hover {
          background: var(--red);
          border-color: var(--red);
        }

        .gig-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          background: #161616;
        }

        .gig-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .gig-card-category {
          color: var(--red);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .gig-card-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .rating-value {
          font-size: 0.85rem;
          font-weight: 700;
          color: white;
        }

        .rating-count {
          font-size: 0.75rem;
          color: #777;
        }

        .gig-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.5rem;
          color: white;
          letter-spacing: -0.01em;
          height: 2.6em; /* Ensure uniform title heights */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .gig-card-desc {
          color: #888;
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          height: 3em; /* Ensure description alignment */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .gig-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .gig-card-delivery {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #888;
          font-size: 0.8rem;
        }

        .gig-card-price {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .price-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: #777;
          letter-spacing: 0.5px;
          margin-bottom: 0.1rem;
        }

        .price-value {
          font-size: 1.15rem;
          font-weight: 800;
          color: white;
        }

        .price-unit {
          font-size: 0.7rem;
          font-weight: 600;
          color: #888;
        }
      `}</style>
    </motion.div>
  );
};

export default GigCard;
