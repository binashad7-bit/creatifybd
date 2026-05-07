import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { TextReveal, FadeReveal } from './MotionReveal';

const Contact = ({ highlight = false, fullPage = false }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    business: '',
    service: '',
    project: ''
  });
  const { lang } = useLanguage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      toast.success(lang === 'bn' ? "✓ মেসেজ পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।" : "✓ Message sent! We'll reply within a few hours.");
      setFormData({ name: '', contact: '', business: '', service: '', project: '' });
    } catch (error) {
      console.error('Error submitting message:', error);
      toast.error(lang === 'bn' ? 'মেসেজ পাঠানো সম্ভব হয়নি। আবার চেষ্টা করুন।' : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section contact-section ${fullPage ? 'full-page-section' : ''}`} id="contact">
      <div className="container">
        <div className="contact-grid">
          {!fullPage && (
            <div className="contact-info">
              <FadeReveal>
                <div className="eyebrow">{lang === 'bn' ? 'যোগাযোগ করুন' : 'Get In Touch'}</div>
              </FadeReveal>
              <TextReveal className="section-h">
                {lang === 'bn' ? 'চলুন দারুণ কিছু করি' : "Let's Build Something Great"}
              </TextReveal>
              <FadeReveal delay={0.4}>
                <p>{lang === 'bn' ? 'আপনার প্রজেক্ট নিয়ে আমাদের সাথে কথা বলুন। আমরা আপনার বাজেট এবং ব্যবসার জন্য সঠিক প্ল্যান তৈরি করব।' : 'Have a project in mind? Tell us what you need and we\'ll put together the perfect plan for your business and budget.'}</p>
                <div className="contact-links">
                  <a href="tel:+8801951676600" className="clink">
                    <div className="clink-icon">📞</div>
                    <div className="clink-info"><small>{lang === 'bn' ? 'কল করুন' : 'Call Us'}</small><strong>+880 01951 676600</strong></div>
                  </a>
                  <a href="mailto:creatifybd@gmail.com" className="clink">
                    <div className="clink-icon">✉️</div>
                    <div className="clink-info"><small>{lang === 'bn' ? 'ইমেইল' : 'Email'}</small><strong>creatifybd@gmail.com</strong></div>
                  </a>
                </div>
              </FadeReveal>
            </div>
          )}
          
          <FadeReveal delay={0.5} style={{ width: '100%' }}>
            <div className={`contact-form-card`} style={fullPage ? { maxWidth: '800px', margin: '0 auto' } : {}}>
              <h3>{lang === 'bn' ? 'আমাদের মেসেজ পাঠান' : 'Send Us a Message'}</h3>
              <p>{lang === 'bn' ? 'আমরা খুব দ্রুত রিপ্লাই দিয়ে থাকি।' : 'We typically respond within a few hours.'}</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="fg"><label>{lang === 'bn' ? 'আপনার নাম' : 'Your Name'}</label><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Mohammad Ali" required /></div>
                  <div className="fg"><label>{lang === 'bn' ? 'ফোন / ইমেইল' : 'Phone / Email'}</label><input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="01XXXXXXXXX" required /></div>
                </div>
                <div className="fg">
                  <label>{lang === 'bn' ? 'প্রতিষ্ঠানের নাম' : 'Business Name'}</label>
                  <input type="text" name="business" value={formData.business} onChange={handleChange} placeholder="Your Company Name" />
                </div>
                <div className="fg">
                  <label>{lang === 'bn' ? 'সার্ভিস বাছাই করুন' : 'Service Needed'}</label>
                  <select name="service" value={formData.service} onChange={handleChange} required>
                    <option value="">{lang === 'bn' ? 'সিলেক্ট করুন...' : 'Select a service...'}</option>
                    <option>Social Media Management</option>
                    <option>Branding & Logo Design</option>
                    <option>Product Photography</option>
                    <option>Video Production</option>
                    <option>Website Design & Development</option>
                    <option>Advertising Campaigns</option>
                    <option>Thumbnail / Poster Design</option>
                    <option>Multiple Services</option>
                  </select>
                </div>
                <div className="fg">
                  <label>{lang === 'bn' ? 'প্রজেক্ট সম্পর্কে বিস্তারিত' : 'Tell Us About Your Project'}</label>
                  <textarea name="project" value={formData.project} onChange={handleChange} placeholder="Briefly describe what you need help with..." required></textarea>
                </div>
                <button 
                  type="submit"
                  className="btn-red" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem', borderRadius: '12px', opacity: loading ? 0.7 : 1 }}
                  disabled={loading}
                >
                  {loading ? (lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...') : (lang === 'bn' ? "মেসেজ পাঠান →" : "Send Message →")}
                </button>
              </form>
            </div>
          </FadeReveal>
        </div>
        
        {highlight && (
          <FadeReveal delay={0.8}>
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <Link to="/contact" className="btn-outline-red">
                {lang === 'bn' ? 'সব যোগাযোগের তথ্য' : 'Full Contact Details'}
              </Link>
            </div>
          </FadeReveal>
        )}
      </div>
    </section>
  );
};

export default Contact;
