import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { siteConfig } from '../config/siteConfig';

const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="footer-v2">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-mark">
              <img src={settings?.logo_url || '/favicon.png'} alt="" loading="lazy" />
              <span>{settings?.site_name?.split('BD')[0] || 'Creatify'}<strong>BD</strong></span>
            </div>
            <p>
              Social media management, graphic design, video editing, digital marketing, and website design for international small businesses.
            </p>
            <div className="footer-social">
              <a href={siteConfig.socialLinks.facebook} aria-label="CreatifyBD on Facebook" className="f-social-btn" target="_blank" rel="noreferrer">Fb</a>
              <a href={siteConfig.socialLinks.instagram} aria-label="CreatifyBD on Instagram" className="f-social-btn" target="_blank" rel="noreferrer">Ig</a>
              <a href={`mailto:${siteConfig.email}`} aria-label="Email CreatifyBD" className="f-social-btn">@</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Social Media Management</Link></li>
              <li><Link to="/services">Graphic Design</Link></li>
              <li><Link to="/services">Video Editing</Link></li>
              <li><Link to="/services">Digital Marketing</Link></li>
              <li><Link to="/services">Website Design</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-info">
              <div className="f-contact-item">
                <small>Phone</small>
                <a href={`tel:${siteConfig.whatsappNumber}`}>{siteConfig.phone}</a>
              </div>
              <div className="f-contact-item">
                <small>Email</small>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
              <div className="f-contact-item">
                <small>Location</small>
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p>Copyright {new Date().getFullYear()} CreatifyBD. All rights reserved.</p>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
