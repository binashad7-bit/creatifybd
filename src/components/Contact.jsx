import React, { useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clock3, Globe2, Loader2, Mail, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendMessage } from '../firebase/services';
import { TextReveal, FadeReveal } from './MotionReveal';
import { useSettings } from '../context/SettingsContext';

const Contact = () => {
  const { content } = useSettings();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });

  const cContent = content?.contact || {};
  const safeHeading = useMemo(() => (
    cContent.heading
      ? DOMPurify.sanitize(cContent.heading, {
          ALLOWED_TAGS: ['span', 'br', 'strong', 'em'],
          ALLOWED_ATTR: ['class']
        })
      : ''
  ), [cContent.heading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service || !formData.budget || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Sending your inquiry...');
    try {
      await sendMessage(formData);
      setSubmitted(true);
      toast.success('Success! We will contact you soon.', { id: toastId });
      setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to send. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-premium-section" id="contact">
      <div className="container">
        <div className="contact-grid-wrap">
          <div className="contact-info-panel">
            <FadeReveal>
              <div className="eyebrow">Get In Touch</div>
            </FadeReveal>

            <TextReveal className="contact-h1">
              {safeHeading ? (
                <span dangerouslySetInnerHTML={{ __html: safeHeading }} />
              ) : (
                'Book a strategy call with our creative team.'
              )}
            </TextReveal>

            <FadeReveal delay={0.2}>
              <p className="contact-intro-copy">
                Tell us where you are now, what market you want to win, and which channels need stronger creative. We will reply with a practical next step.
              </p>
            </FadeReveal>

            <FadeReveal delay={0.4}>
              <div className="contact-methods">
                <div className="contact-method-item">
                  <div className="method-icon"><Mail size={24} /></div>
                  <div>
                    <div className="method-label">Email</div>
                    <div className="method-val">hello@creatifybd.com</div>
                  </div>
                </div>
                <div className="contact-method-item">
                  <div className="method-icon"><MessageSquare size={24} /></div>
                  <div>
                    <div className="method-label">WhatsApp</div>
                    <div className="method-val">+880 1951 676600</div>
                  </div>
                </div>
                <div className="contact-method-item">
                  <div className="method-icon"><Globe2 size={24} /></div>
                  <div>
                    <div className="method-label">Serving</div>
                    <div className="method-val">USA, Canada, Australia, UK and global clients</div>
                  </div>
                </div>
                <div className="contact-method-item">
                  <div className="method-icon"><Clock3 size={24} /></div>
                  <div>
                    <div className="method-label">Response Time</div>
                    <div className="method-val">{cContent.working_hours || 'Within 24 business hours'}</div>
                  </div>
                </div>
              </div>
            </FadeReveal>
          </div>

          <div className="contact-form-card">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                >
                  <h3 className="form-title">Start a Global Growth Brief</h3>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="luxury-label" htmlFor="contact-name">Your name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        className="luxury-input"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="luxury-label" htmlFor="contact-email">Email address</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        className="luxury-input"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="luxury-label" htmlFor="contact-phone">Phone / WhatsApp</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        className="luxury-input"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 555 000 0000"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="form-group">
                      <label className="luxury-label" htmlFor="contact-service">Interested in</label>
                      <select
                        id="contact-service"
                        className="luxury-input"
                        required
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="">Select a service</option>
                        <option value="social-media-management">Social Media Management</option>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="video-editing">Video Editing</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="website-design">Website Design</option>
                        <option value="full-creative-retainer">Full Creative Retainer</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="luxury-label" htmlFor="contact-budget">Monthly budget</label>
                      <select
                        id="contact-budget"
                        className="luxury-input"
                        required
                        value={formData.budget}
                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option value="">Select budget range</option>
                        <option value="500-1000">USD $500 - $1,000/mo</option>
                        <option value="1000-2500">USD $1,000 - $2,500/mo</option>
                        <option value="2500-5000">USD $2,500 - $5,000/mo</option>
                        <option value="5000-plus">USD $5,000+/mo</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group-full">
                    <label className="luxury-label" htmlFor="contact-message">Tell us about your goals</label>
                    <textarea
                      id="contact-message"
                      required
                      className="luxury-input"
                      style={{ height: '120px', paddingTop: '1rem' }}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your market, current channels, goals and timeline..."
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-huge-red w-full">
                    {loading ? (
                      <>Processing... <Loader2 size={18} className="animate-spin" style={{ marginLeft: '1rem' }} /></>
                    ) : (
                      <>Send Inquiry <Send size={18} style={{ marginLeft: '1rem' }} /></>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-message"
                >
                  <CheckCircle2 size={80} color="var(--red)" style={{ marginBottom: '2rem' }} />
                  <h3 className="success-title">Inquiry Received.</h3>
                  <p className="success-desc">Our strategy team will review your project and get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-red" style={{ marginTop: '2.5rem' }}>
                    Send Another Inquiry
                  </button>
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
