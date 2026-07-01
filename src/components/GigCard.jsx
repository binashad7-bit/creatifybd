import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart } from 'lucide-react';
import { HoverTilt } from './MotionReveal';

const GigCard = ({ gig }) => {
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
  const hasRating = gig.rating && gig.reviewCount && gig.reviewCount > 0;
  const mainImage = gig.galleryImages && gig.galleryImages[0]
    ? gig.galleryImages[0]
    : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop';

  return (
    <HoverTilt maxTilt={6} scale={1.02} className="gig-card">
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
            aria-label="Save this service"
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
              {gig.subcategory || gig.category.replace(/-/g, ' ')}
            </span>
            {hasRating ? (
              <div className="gig-card-rating">
                <Star size={14} fill="var(--brand-red)" stroke="var(--brand-red)" />
                <span className="rating-value">{gig.rating.toFixed(1)}</span>
                <span className="rating-count">({gig.reviewCount})</span>
              </div>
            ) : (
              <span className="gig-card-new-badge">New</span>
            )}
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
        .gig-card-new-badge {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--success);
          background: var(--success-soft);
          border: 1px solid var(--success-soft);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }
        .gig-card {
          background: var(--surface-card);
          border: 1px solid var(--border-card);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: var(--shadow-card);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .gig-card:hover {
          border-color: var(--border);
          box-shadow: var(--shadow-float);
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
          padding-top: 62.5%;
          width: 100%;
          overflow: hidden;
          background: var(--surface-muted);
        }
        .gig-card-img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gig-card:hover .gig-card-img { transform: scale(1.06); }
        .gig-card-badge {
          position: absolute;
          top: 1rem; left: 1rem;
          padding: 0.3rem 0.8rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          z-index: 2;
        }
        .gig-card-badge.monthly { background: var(--info-soft); border: 1px solid var(--info-soft); color: var(--info); }
        .gig-card-badge.best-seller { background: var(--warning-soft); border: 1px solid var(--warning-soft); color: var(--warning); }
        .gig-card-badge.fast { background: var(--success-soft); border: 1px solid var(--success-soft); color: var(--success); }
        .gig-card-badge.popular { background: var(--brand-red-soft); border: 1px solid var(--red-mid); color: var(--brand-red); }
        .gig-card-favorite-btn {
          position: absolute;
          top: 1rem; right: 1rem;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.85);
          border: 1px solid var(--border-card);
          color: var(--muted);
          display: flex;
          align-items: center; justify-content: center;
          cursor: none;
          backdrop-filter: blur(4px);
          transition: all 0.25s ease;
          z-index: 2;
        }
        .gig-card-favorite-btn:hover { background: var(--brand-red); border-color: var(--brand-red); color: #fff; }
        .gig-card-body {
          padding: 1.5rem;
          display: flex; flex-direction: column;
          flex-grow: 1;
          background: var(--surface-card);
        }
        .gig-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .gig-card-category {
          color: var(--brand-red);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .gig-card-rating { display: flex; align-items: center; gap: 0.25rem; }
        .rating-value { font-size: 0.85rem; font-weight: 700; color: var(--ink-soft); }
        .rating-count { font-size: 0.75rem; color: var(--muted); }
        .gig-card-title {
          font-size: 1.05rem; font-weight: 700;
          line-height: 1.35; margin-bottom: 0.5rem;
          color: var(--ink); letter-spacing: -0.01em;
          height: 2.7em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gig-card-desc {
          color: var(--muted); font-size: 0.85rem;
          line-height: 1.5; margin-bottom: 1.5rem;
          height: 3em;
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
          border-top: 1px solid var(--border-soft);
        }
        .gig-card-delivery { display: flex; align-items: center; gap: 0.4rem; color: var(--muted); font-size: 0.8rem; }
        .gig-card-price { display: flex; flex-direction: column; align-items: flex-end; }
        .price-label { font-size: 0.65rem; text-transform: uppercase; color: var(--muted); letter-spacing: 0.5px; margin-bottom: 0.1rem; }
        .price-value { font-size: 1.15rem; font-weight: 800; color: var(--ink); }
        .price-unit { font-size: 0.7rem; font-weight: 600; color: var(--muted); }
      `}</style>
    </HoverTilt>
  );
};

export default GigCard;
