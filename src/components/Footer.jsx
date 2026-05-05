import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Creatify<span className="dot">BD</span></h3>
            <p>Leading digital marketing and creative agency based in Dhaka, Bangladesh. Helping businesses grow their online presence since day one.</p>
            <div className="footer-social">
              <a href="https://facebook.com/creatifybd" className="f-social-btn" target="_blank" rel="noreferrer">f</a>
              <a href="https://instagram.com/creatifybd" className="f-social-btn" target="_blank" rel="noreferrer">in</a>
              <a href="mailto:creatifybd@gmail.com" className="f-social-btn">@</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Social Media Management</a></li>
              <li><a href="#services">Branding & Logo Design</a></li>
              <li><a href="#services">Product Photography</a></li>
              <li><a href="#services">Video Production</a></li>
              <li><a href="#services">Website Development</a></li>
              <li><a href="#services">Ad Campaigns</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#why">About Us</a></li>
              <li><a href="#portfolio">Our Work</a></li>
              <li><a href="#process">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-info">
              <div className="f-contact-item">
                <small>Phone</small>
                <a href="tel:+8801951676600">+880 01951 676600</a>
              </div>
              <div className="f-contact-item">
                <small>Email</small>
                <a href="mailto:creatifybd@gmail.com">creatifybd@gmail.com</a>
              </div>
              <div className="f-contact-item">
                <small>Location</small>
                <a href="#">Dhaka, Bangladesh</a>
              </div>
              <div className="f-contact-item">
                <small>Website</small>
                <a href="#">www.creatifybd.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CreatifyBD. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
