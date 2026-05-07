import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, MessageSquare, Phone, MapPin, ArrowRight } from 'lucide-react';
import { TextReveal, FadeReveal } from './MotionReveal';

const Contact = () => {
  const { lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', budget: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), { ...formData, timestamp: serverTimestamp() });
      setSubmitted(true);
    } catch (err) { alert('Failed to send message. Please try again.'); }
    setLoading(false);
  };

  return (
    <section className="contact-premium-section" style={{ background: '#fff', padding: '12rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '10%', alignItems: 'start' }}>
          
          <div className="contact-info-panel">
            <FadeReveal>
              <div className="eyebrow" style={{ color: 'var(--red)', marginBottom: '1.5rem' }}>{lang === 'bn' ? 'যোগাযোগ করুন' : 'Get In Touch'}</div>
            </FadeReveal>
            <TextReveal className="contact-h1" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 900, color: '#000', lineHeight: 0.9, marginBottom: '3rem' }}>
              {lang === 'bn' ? 'আসুন নতুন কিছু তৈরি করি' : "Let's build something great."}
            </TextReveal>
            
            <FadeReveal delay={0.4}>
              <div className="contact-methods" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginTop: '4rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(232, 25, 44, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)' }}><MessageSquare size={24} /></div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4, marginBottom: '0.4rem' }}>Email Us</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#000' }}>hello@creatifybd.com</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(232, 25, 44, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)' }}><Phone size={24} /></div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4, marginBottom: '0.4rem' }}>Call Us</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#000' }}>+880 1951 676600</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(232, 25, 44, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)' }}><MapPin size={24} /></div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4, marginBottom: '0.4rem' }}>Location</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#000' }}>Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>
            </FadeReveal>
          </div>

          <div className="contact-form-card" style={{ background: '#fcfcfc', padding: '4rem', borderRadius: '48px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 40px 100px rgba(0,0,0,0.03)' }}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                >
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '3rem', color: '#000' }}>Start a Discovery Session</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', opacity: 0.6 }}>What's your name?</label>
                      <input 
                        type="text" required className="luxury-input" 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', opacity: 0.6 }}>Email Address</label>
                      <input 
                        type="email" required className="luxury-input" 
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', opacity: 0.6 }}>Interested In</label>
                      <select 
                        className="luxury-input" required
                        value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
                      >
                        <option value="">Select a service</option>
                        <option value="web">Web Design & Dev</option>
                        <option value="branding">Branding & Identity</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="video">Video Production</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', opacity: 0.6 }}>Monthly Budget</label>
                      <select 
                        className="luxury-input" required
                        value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}
                      >
                        <option value="">Select budget range</option>
                        <option value="5k-10k">৳5,000 - ৳10,000</option>
                        <option value="10k-30k">৳10,000 - ৳30,000</option>
                        <option value="30k-50k">৳30,000 - ৳50,000</option>
                        <option value="50k+">৳50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', opacity: 0.6 }}>Tell us about your project</label>
                    <textarea 
                      required className="luxury-input" style={{ height: '120px', paddingTop: '1rem' }}
                      value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="Share your vision..."
                    />
                  </div>

                  <button 
                    type="submit" disabled={loading} className="btn-huge-red" 
                    style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                  >
                    {loading ? 'Initiating...' : 'Send Inquiry'} <Send size={18} style={{ marginLeft: '1rem' }} />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-message"
                  style={{ textAlign: 'center', padding: '4rem 0' }}
                >
                  <CheckCircle2 size={80} color="var(--red)" style={{ marginBottom: '2rem' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#000', marginBottom: '1rem' }}>Inquiry Received.</h3>
                  <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1.1rem' }}>Our strategy team will review your project and get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-red" style={{ marginTop: '2.5rem' }}>Send Another Inquiry</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
