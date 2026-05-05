import React from 'react';

const testimonials = [
  { stars: '★★★★★', text: "CreatifyBD completely transformed our online presence. <strong>Our Facebook page went from 200 to 5,000 followers</strong> in just 3 months. Truly amazing work!", author: 'Rahim Uddin', role: 'Owner, Nova Fashion House', av: 'av1', initial: 'R' },
  { stars: '★★★★★', text: "The logo they designed for us is exactly what we wanted. <strong>Professional, affordable, and delivered on time.</strong> We've gotten so many compliments on it!", author: 'Sumaiya Ahmed', role: 'Founder, Green Eats Café', av: 'av2', initial: 'S' },
  { stars: '★★★★★', text: "Our product photos are stunning. <strong>Sales increased 40% after using CreatifyBD's photography</strong> for our e-commerce listings. Absolutely worth it.", author: 'Karim Hossain', role: 'CEO, CraftNest BD', av: 'av3', initial: 'K' },
  { stars: '★★★★★', text: "They built our website in under 2 weeks and it looks incredible. <strong>Very responsive team and great communication</strong> throughout the whole process.", author: 'Nadia Rahman', role: 'Co-founder, ByteWave Tech', av: 'av4', initial: 'N' },
  { stars: '★★★★★', text: "The Facebook ad campaign they ran for us <strong>generated 3x return on investment</strong> in the first month. I highly recommend CreatifyBD to every business owner.", author: 'Tanvir Islam', role: 'Director, ShopLocal BD', av: 'av5', initial: 'T' }
];

const Testimonials = () => {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="testi-header sr">
          <div>
            <div className="eyebrow">Reviews</div>
            <h2 className="section-h">What Our <span className="red">Clients</span> Say</h2>
          </div>
          <div className="rating-summary">
            <div className="rating-val">5.0</div>
            <div>
              <div className="rating-stars">★★★★★</div>
              <div className="rating-count">From 50+ reviews</div>
            </div>
          </div>
        </div>
        <div className="testi-scroll sr sr-delay-1">
          {testimonials.map((t, index) => (
            <div key={index} className="testi-card">
              <div className="testi-stars">{t.stars}</div>
              <p className="testi-text" dangerouslySetInnerHTML={{ __html: t.text }}></p>
              <div className="testi-author">
                <div className={`testi-avatar ${t.av}`}>{t.initial}</div>
                <div>
                  <div className="testi-name">{t.author}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
