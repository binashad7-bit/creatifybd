import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { ShieldAlert, KeyRound, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ClientOrdersPortal = () => {
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLookup = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !orderId.trim()) {
      toast.error('Please enter both Email and Order ID');
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, 'orders', orderId.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const orderData = docSnap.data();
        const storedEmail = orderData.clientInfo?.email || '';

        if (storedEmail.toLowerCase().trim() === email.toLowerCase().trim()) {
          // Store verified lookup session
          sessionStorage.setItem(`auth_order_${orderId.trim()}`, email.toLowerCase().trim());
          toast.success('Order found! Access granted.');
          navigate(`/client/orders/${orderId.trim()}`);
        } else {
          toast.error('Invalid credentials. The email does not match this Order ID.');
        }
      } else {
        toast.error('Order ID not found. Please verify the ID.');
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      toast.error('An error occurred. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-portal-gate">
      <SEO 
        title="Client Order Portal | CreatifyBD"
        description="Access and track your order progress, download drafts, request revisions, and verify manual payments."
        noIndex={true}
      />

      <Navbar />

      <div className="container" style={{ padding: '8rem 1rem 6rem', display: 'flex', justifyContent: 'center' }}>
        <div className="lookup-card">
          <div className="lookup-icon-wrap">
            <KeyRound size={32} />
          </div>

          <h2>Track Your <span className="red">Order</span></h2>
          <p className="lookup-intro">
            Enter the email address used during checkout and your Order ID to view your delivery roadmap.
          </p>

          <form onSubmit={handleLookup} className="lookup-form">
            <div className="form-group">
              <label htmlFor="lookup-email">Email Address</label>
              <input 
                id="lookup-email"
                type="email"
                required
                placeholder="john@example.com"
                className="luxury-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lookup-id">Order ID</label>
              <input 
                id="lookup-id"
                type="text"
                required
                placeholder="e.g. ZQv7b3Lm5D..."
                className="luxury-input"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-red w-full justify-center"
              style={{ height: '48px', marginTop: '1.5rem', fontWeight: '800' }}
            >
              {loading ? (
                <>Searching... <Loader2 size={18} className="animate-spin" style={{ marginLeft: '1rem' }} /></>
              ) : (
                <>Track Order <Search size={16} style={{ marginLeft: '1rem' }} /></>
              )}
            </button>
          </form>

          <div className="lookup-support-bar">
            <ShieldAlert size={14} />
            <span>Need help? Contact <a href="mailto:hello@creatifybd.com">hello@creatifybd.com</a></span>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .lookup-card {
          background: #161616;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 3rem;
          max-width: 450px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        @media (max-width: 480px) {
          .lookup-card {
            padding: 2rem 1.5rem;
          }
        }

        .lookup-icon-wrap {
          color: var(--red);
          background: rgba(232, 25, 44, 0.1);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          border: 1px solid rgba(232,25,44,0.2);
        }

        .lookup-card h2 {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.5rem;
        }

        .lookup-intro {
          font-size: 0.85rem;
          color: #777;
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .lookup-form {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .lookup-form label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .lookup-support-bar {
          margin-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: #555;
        }

        .lookup-support-bar a {
          color: #777;
          text-decoration: none;
          font-weight: 600;
        }

        .lookup-support-bar a:hover {
          color: white;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default ClientOrdersPortal;
