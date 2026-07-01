import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GigGallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop'
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="gig-gallery">
      <div className="gig-gallery-main-wrapper">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={galleryImages[activeIndex]}
            alt={`Gig gallery preview ${activeIndex + 1}`}
            className="gig-gallery-main-img"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>

        {galleryImages.length > 1 && (
          <>
            <button type="button" className="gallery-nav-btn prev" onClick={handlePrev} aria-label="Previous image">
              <ChevronLeft size={20} />
            </button>
            <button type="button" className="gallery-nav-btn next" onClick={handleNext} aria-label="Next image">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="gig-gallery-thumbnails">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`gallery-thumb-btn ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show gallery image ${idx + 1}`}
            >
              <img src={img} alt="" className="gallery-thumb-img" />
            </button>
          ))}
        </div>
      )}

      <style>{`
        .gig-gallery {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }

        .gig-gallery-main-wrapper {
          position: relative;
          width: 100%;
          padding-top: 60%; /* Aspect ratio ~ 5:3 */
          background: var(--surface-soft);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .gig-gallery-main-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gallery-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: none;
          backdrop-filter: blur(4px);
          transition: all 0.2s;
          z-index: 2;
        }

        .gallery-nav-btn:hover {
          background: var(--red);
          border-color: var(--red);
        }

        .gallery-nav-btn.prev {
          left: 1rem;
        }

        .gallery-nav-btn.next {
          right: 1rem;
        }

        .gig-gallery-thumbnails {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .gallery-thumb-btn {
          border: 2px solid transparent;
          border-radius: 8px;
          overflow: hidden;
          padding: 0;
          cursor: none;
          background: #222;
          width: 100%;
          padding-top: 60%;
          position: relative;
          transition: all 0.2s;
        }

        .gallery-thumb-btn:hover {
          border-color: rgba(255, 255, 255, 0.4);
        }

        .gallery-thumb-btn.active {
          border-color: var(--red);
        }

        .gallery-thumb-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default GigGallery;
