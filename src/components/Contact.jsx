import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    business: '',
    service: '',
    project: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({ name: '', contact: '', business: '', service: '', project: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error("Error submitting message: ", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info sr">
            <div className="eyebrow">Get In Touch</div>
            <h2 className="section-h">Let's Build <span className="red">Something Great</span></h2>
            <p>Have a project in mind? Tell us what you need and we'll put together the perfect plan for your business and budget.</p>
            <div className="contact-links">
              <a href="tel:+8801951676600" className="clink">
                <div className="clink-icon">📞</div>
                <div className="clink-info"><small>Call Us</small><strong>+880 01951 676600</strong></div>
              </a>
              <a href="mailto:creatifybd@gmail.com" className="clink">
                <div className="clink-icon">✉️</div>
                <div className="clink-info"><small>Email</small><strong>creatifybd@gmail.com</strong></div>
              </a>
              <a href="https://facebook.com/creatifybd" target="_blank" rel="noreferrer" className="clink">
                <div className="clink-icon">📘</div>
                <div className="clink-info"><small>Facebook</small><strong>@creatifybd</strong></div>
              </a>
              <a href="https://instagram.com/creatifybd" target="_blank" rel="noreferrer" className="clink">
                <div className="clink-icon">📸</div>
                <div className="clink-info"><small>Instagram</small><strong>@creatifybd</strong></div>
              </a>
            </div>
          </div>
          <div className="contact-form-card sr sr-delay-1">
            <h3>Send Us a Message</h3>
            <p>We typically respond within a few hours.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="fg"><label>Your Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Mohammad Ali" required /></div>
                <div className="fg"><label>Phone / Email</label><input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="01XXXXXXXXX" required /></div>
              </div>
              <div className="fg">
                <label>Business Name</label>
                <input type="text" name="business" value={formData.business} onChange={handleChange} placeholder="Your Company Name" />
              </div>
              <div className="fg">
                <label>Service Needed</label>
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="">Select a service...</option>
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
                <label>Tell Us About Your Project</label>
                <textarea name="project" value={formData.project} onChange={handleChange} placeholder="Briefly describe your business and what you need help with..." required></textarea>
              </div>
              <button 
                type="submit"
                className="btn-red" 
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '0.95rem', borderRadius: '12px', background: submitted ? '#15803d' : '' }}
                disabled={submitted}
              >
                {submitted ? "✓ Message Sent! We'll reply soon." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
