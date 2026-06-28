import React from 'react';
import { Check, Minus } from 'lucide-react';

const PackageComparison = ({ packages = {} }) => {
  const basic = packages.basic || {};
  const standard = packages.standard || {};
  const premium = packages.premium || {};

  // Extract all unique feature keys
  const allFeatureKeys = new Set([
    ...Object.keys(basic.features || {}),
    ...Object.keys(standard.features || {}),
    ...Object.keys(premium.features || {})
  ]);

  const formatFeatureLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderValue = (val) => {
    if (typeof val === 'boolean') {
      return val ? <Check size={18} className="chk-icon-val" /> : <Minus size={16} className="dash-icon-val" />;
    }
    return val;
  };

  return (
    <div className="package-comparison-table-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="feature-col">Feature Comparison</th>
            <th>Basic</th>
            <th>Standard</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="feature-label-cell">Package Price</td>
            <td className="price-cell">${basic.price} USD</td>
            <td className="price-cell">${standard.price} USD</td>
            <td className="price-cell">${premium.price} USD</td>
          </tr>
          <tr>
            <td className="feature-label-cell">Delivery Time</td>
            <td>{basic.deliveryTime} Days</td>
            <td>{standard.deliveryTime} Days</td>
            <td>{premium.deliveryTime} Days</td>
          </tr>
          <tr>
            <td className="feature-label-cell">Revisions</td>
            <td>{basic.revisions}</td>
            <td>{standard.revisions}</td>
            <td>{premium.revisions === 10 ? 'Unlimited' : premium.revisions}</td>
          </tr>
          {Array.from(allFeatureKeys).map((key) => (
            <tr key={key}>
              <td className="feature-label-cell">{formatFeatureLabel(key)}</td>
              <td>{renderValue(basic.features?.[key])}</td>
              <td>{renderValue(standard.features?.[key])}</td>
              <td>{renderValue(premium.features?.[key])}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .package-comparison-table-wrapper {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          background: #161616;
          margin: 2.5rem 0;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: center;
          font-size: 0.9rem;
        }

        .comparison-table th {
          background: #111;
          color: white;
          font-weight: 700;
          padding: 1.25rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .comparison-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #b0b0b0;
          font-weight: 500;
        }

        .comparison-table tr:last-child td {
          border-bottom: none;
        }

        .feature-col {
          text-align: left;
        }

        .feature-label-cell {
          text-align: left;
          color: white;
          font-weight: 600;
          padding-left: 1.5rem !important;
        }

        .price-cell {
          color: var(--red) !important;
          font-weight: 700 !important;
          font-size: 1.05rem;
        }

        .chk-icon-val {
          color: #4caf50;
          margin: 0 auto;
        }

        .dash-icon-val {
          color: #444;
          margin: 0 auto;
        }

        @media (max-width: 600px) {
          .package-comparison-table-wrapper {
            overflow-x: auto;
          }
          .comparison-table th, 
          .comparison-table td {
            padding: 0.75rem 0.5rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PackageComparison;
