import React from 'react';

const Features = ({ theme = 'light' }) => {
  return (
    <section className={`section features-section ${theme === 'dark' ? 'dark-section' : ''}`} id="why">
      <div className="container">
        <div className="features-grid">
          <div>
            <div className="eyebrow sr">Why CreatifyBD</div>
            <h2 className="section-h sr sr-delay-1">Built for <span className="red">Bangladesh.</span><br />Built for Growth.</h2>
            <p className="section-sub sr sr-delay-1" style={{ color: 'var(--section-subtext)' }}>We're not just another agency. We understand the local market deeply and we're obsessed with your results.</p>

            <div className="feature-list" style={{ marginTop: '2.5rem' }}>
              <div className="feature-item sr">
                <div className="feature-icon-wrap">🎯</div>
                <div>
                  <h4>Deep Local Market Knowledge</h4>
                  <p>We know what works in Bangladesh — the platforms, the audiences, the trends. No guesswork.</p>
                </div>
              </div>
              <div className="feature-item sr sr-delay-1">
                <div className="feature-icon-wrap">💰</div>
                <div>
                  <h4>Transparent, Budget-Friendly</h4>
                  <p>No hidden fees. No bloated agency overhead. You pay for results, not fancy office rent.</p>
                </div>
              </div>
              <div className="feature-item sr sr-delay-2">
                <div className="feature-icon-wrap">⚡</div>
                <div>
                  <h4>Fast Turnaround</h4>
                  <p>We move fast. Most deliverables are turned around within 2–5 business days.</p>
                </div>
              </div>
              <div className="feature-item sr sr-delay-3">
                <div className="feature-icon-wrap">🤝</div>
                <div>
                  <h4>Personalized for Your Brand</h4>
                  <p>We take time to understand your vision, voice, and goals before we create anything.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="features-visual sr sr-delay-2">
            <div className="feat-card-big">
              <h3>Trusted by <span>100+</span> businesses across Bangladesh</h3>
              <div className="feat-stats">
                <div className="feat-stat">
                  <div className="feat-stat-val">100<em>+</em></div>
                  <div className="feat-stat-label">Projects Delivered</div>
                </div>
                <div className="feat-stat">
                  <div className="feat-stat-val">6<em>+</em></div>
                  <div className="feat-stat-label">Core Services</div>
                </div>
                <div className="feat-stat">
                  <div className="feat-stat-val">2<em>x</em></div>
                  <div className="feat-stat-label">Avg. Brand Growth</div>
                </div>
                <div className="feat-stat">
                  <div className="feat-stat-val">5<em>★</em></div>
                  <div className="feat-stat-label">Client Rating</div>
                </div>
              </div>
              <div className="badge-row">
                <span className="badge hot">🔥 Social Media</span>
                <span className="badge">Branding</span>
                <span className="badge">Web Design</span>
                <span className="badge hot">⚡ Fast Delivery</span>
                <span className="badge">Photography</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
