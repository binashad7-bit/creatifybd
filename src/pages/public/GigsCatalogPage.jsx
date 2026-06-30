import React, { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import GigCard from '../../components/GigCard';
import { gigs, categories } from '../../data/gigs';
import { Search, Filter, SlidersHorizontal, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GigsCatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [maxDelivery, setMaxDelivery] = useState('any'); // any, 3, 7, 14, 30
  const [budgetRange, setBudgetRange] = useState('any'); // any, under-100, 100-300, 300-600, above-600
  const [frequency, setFrequency] = useState('all'); // all, monthly, one-time
  const [sortBy, setSortBy] = useState('recommended'); // recommended, price-low, price-high, delivery-fast

  const filteredGigs = useMemo(() => {
    return gigs
      .filter((gig) => {
        // Search query
        const matchesSearch = 
          gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gig.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gig.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category filter
        const matchesCat = selectedCat === 'all' || gig.category === selectedCat;

        // Delivery time filter (using basic package delivery time as guide)
        const delTime = gig.packages?.basic?.deliveryTime || gig.deliveryTime || 7;
        const matchesDelivery = 
          maxDelivery === 'any' || 
          (maxDelivery === '3' && delTime <= 3) ||
          (maxDelivery === '7' && delTime <= 7) ||
          (maxDelivery === '14' && delTime <= 14) ||
          (maxDelivery === '30' && delTime <= 30);

        // Budget filter
        const price = gig.startingPrice;
        const matchesBudget = 
          budgetRange === 'any' ||
          (budgetRange === 'under-100' && price < 100) ||
          (budgetRange === '100-300' && price >= 100 && price <= 300) ||
          (budgetRange === '300-600' && price > 300 && price <= 600) ||
          (budgetRange === 'above-600' && price > 600);

        // Frequency
        const isMonthly = gig.category === 'social-media-management' || gig.tags.includes('monthly');
        const matchesFreq = 
          frequency === 'all' ||
          (frequency === 'monthly' && isMonthly) ||
          (frequency === 'one-time' && !isMonthly);

        return matchesSearch && matchesCat && matchesDelivery && matchesBudget && matchesFreq;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.startingPrice - b.startingPrice;
        }
        if (sortBy === 'price-high') {
          return b.startingPrice - a.startingPrice;
        }
        if (sortBy === 'delivery-fast') {
          const aDel = a.packages?.basic?.deliveryTime || a.deliveryTime || 7;
          const bDel = b.packages?.basic?.deliveryTime || b.deliveryTime || 7;
          return aDel - bDel;
        }
        // Recommended default (rating/review weighted or original sequence)
        return b.rating * b.reviewCount - a.rating * a.reviewCount;
      });
  }, [searchQuery, selectedCat, maxDelivery, budgetRange, frequency, sortBy]);

  return (
    <div className="gigs-catalog-page">
      <SEO 
        title="Browse Creative Gigs & Packages | CreatifyBD"
        description="Browse professional creative services. Order social media management, logo design, video edits, and custom websites with clear fixed price packages."
        keywords="creatifybd gigs, buy logo design, order video editing, monthly social media manager"
      />

      <Navbar />

      <div className="page-header page-header-light">
        <div className="container">
          <h1 className="page-title">Browse Creative <span className="red">Gigs</span></h1>
          <p className="page-subtitle">Select transparent, fixed-price services designed to make your small business look premium online.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1rem' }}>
        {/* Marketplace Info Notice */}
        <div className="marketplace-banner">
          <div className="banner-inner">
            <Info size={20} className="banner-icon" />
            <div className="banner-text">
              <h5>Bangladesh Production Advantage</h5>
              <p>Get international quality deliverables managed through our professional agency pipeline in Dhaka. Prices are in USD. Manual payment (Payoneer / DBBL Bank) ensures safe escrow and review approval before order signoff.</p>
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="catalog-controls">
          <div className="search-box-wrap">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Search services (e.g. Logo, Reels, Monthly)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-row-grid">
            {/* Category selection */}
            <div className="filter-select-wrap">
              <label htmlFor="cat-filter">Category</label>
              <select 
                id="cat-filter"
                value={selectedCat}
                onChange={e => setSelectedCat(e.target.value)}
              >
                <option value="all">All Categories</option>
                {Object.values(categories).map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Delivery Time */}
            <div className="filter-select-wrap">
              <label htmlFor="del-filter">Delivery Time</label>
              <select 
                id="del-filter"
                value={maxDelivery}
                onChange={e => setMaxDelivery(e.target.value)}
              >
                <option value="any">Any Time</option>
                <option value="3">Up to 3 days</option>
                <option value="7">Up to 7 days</option>
                <option value="14">Up to 14 days</option>
                <option value="30">Up to 30 days</option>
              </select>
            </div>

            {/* Budget */}
            <div className="filter-select-wrap">
              <label htmlFor="budget-filter">Budget</label>
              <select 
                id="budget-filter"
                value={budgetRange}
                onChange={e => setBudgetRange(e.target.value)}
              >
                <option value="any">Any Price</option>
                <option value="under-100">Under $100 USD</option>
                <option value="100-300">$100 - $300 USD</option>
                <option value="300-600">$300 - $600 USD</option>
                <option value="above-600">$600+ USD</option>
              </select>
            </div>

            {/* Frequency */}
            <div className="filter-select-wrap">
              <label htmlFor="freq-filter">Billing Style</label>
              <select 
                id="freq-filter"
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
              >
                <option value="all">All Frequencies</option>
                <option value="monthly">Monthly retainer plan</option>
                <option value="one-time">One-time project</option>
              </select>
            </div>

            {/* Sort */}
            <div className="filter-select-wrap">
              <label htmlFor="sort-filter">Sort By</label>
              <select 
                id="sort-filter"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="recommended">Best Seller</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="delivery-fast">Delivery Speed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        <div className="active-filters-summary">
          <span>Found <strong>{filteredGigs.length}</strong> active gigs</span>
        </div>

        {/* Gigs Grid */}
        <div style={{ marginTop: '2rem' }}>
          {filteredGigs.length > 0 ? (
            <div className="catalog-gigs-grid">
              <AnimatePresence mode="popLayout">
                {filteredGigs.map(gig => (
                  <motion.div 
                    layout
                    key={gig.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GigCard gig={gig} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="no-gigs-found">
              <h4>No gigs match your filters</h4>
              <p>Try clearing your keywords or selecting another category.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCat('all');
                  setMaxDelivery('any');
                  setBudgetRange('any');
                  setFrequency('all');
                }} 
                className="btn-red"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        .gigs-catalog-page {
          background: #fbfaf8;
        }

        .marketplace-banner {
          background: #fff7f8;
          border: 1px solid rgba(232, 25, 44, 0.15);
          border-radius: 12px;
          padding: 1.5rem 2rem;
          margin-bottom: 3rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .banner-inner {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .banner-icon {
          color: var(--red);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .banner-text h5 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #16181d;
          margin-bottom: 0.25rem;
        }

        .banner-text p {
          font-size: 0.85rem;
          color: #5f6470;
          line-height: 1.5;
        }

        .catalog-controls {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: #ffffff;
          border: 1px solid rgba(17, 19, 24, 0.08);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 18px 42px rgba(17, 19, 24, 0.06);
        }

        .search-box-wrap {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #777;
        }

        .search-input {
          width: 100%;
          background: #fbfaf8;
          border: 1px solid rgba(17, 19, 24, 0.1);
          border-radius: 10px;
          padding: 1rem 1rem 1rem 3.25rem;
          color: #16181d;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          border-color: var(--red);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(232, 25, 44, 0.08);
        }

        .filters-row-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }

        @media (max-width: 968px) {
          .filters-row-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 600px) {
          .filters-row-grid {
            grid-template-columns: 1fr;
          }
        }

        .filter-select-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .filter-select-wrap label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #6b707c;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-select-wrap select {
          background: #fbfaf8;
          border: 1px solid rgba(17, 19, 24, 0.1);
          color: #16181d;
          padding: 0.75rem;
          border-radius: 8px;
          outline: none;
          font-weight: 500;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .filter-select-wrap select:focus {
          border-color: var(--red);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(232, 25, 44, 0.08);
        }

        .active-filters-summary {
          max-width: 1200px;
          margin: 1.5rem auto 0;
          color: #6b707c;
          font-size: 0.85rem;
        }

        .active-filters-summary strong {
          color: #16181d;
        }

        .catalog-gigs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .no-gigs-found {
          text-align: center;
          padding: 4rem 2rem;
          background: #ffffff;
          border: 1px solid rgba(17, 19, 24, 0.08);
          border-radius: 16px;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 18px 42px rgba(17, 19, 24, 0.06);
        }

        .no-gigs-found h4 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #16181d;
        }

        .no-gigs-found p {
          color: #6b707c;
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
};

export default GigsCatalogPage;
