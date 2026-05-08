import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(err.message || 'Login failed. Please check your connection.');
      }
    }

  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f', padding: '2rem' }}>
      <div style={{ background: '#161616', padding: '3rem', borderRadius: '24px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '0.5rem', fontFamily: 'Bricolage Grotesque, sans-serif' }}>
            Creatify<span style={{ color: '#E8192C' }}>BD</span> Admin
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>Secure access to your creative command center</p>
        </div>

        {error && <div style={{ background: 'rgba(232,25,44,0.1)', color: '#E8192C', padding: '0.8rem', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(232,25,44,0.2)' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@creatifybd.com" 
                style={{ width: '100%', background: '#1a1a1a', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem 0.85rem 2.8rem', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }} 
                required 
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{ width: '100%', background: '#1a1a1a', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.85rem 1rem 0.85rem 2.8rem', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }} 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', background: '#E8192C', color: '#fff', padding: '1rem', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
          >
            Login to Dashboard <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
