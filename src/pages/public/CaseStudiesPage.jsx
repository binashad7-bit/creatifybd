import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';

const caseStudies = [
  {
    id: "nestnook",
    num: "01",
    client: "NestNook",
    industry: "Home Decor & Lifestyle",
    tag: "Branding + Social Media",
    tagline: "From invisible to irresistible — a brand born to be seen.",
    challenge:
      "NestNook, a Dhaka-based home decor startup, had beautiful products but zero brand identity. Their Facebook page had fewer than 200 followers, zero engagement, and their product photos were taken on a phone with poor lighting. Competitors with half the product quality were outselling them simply because they looked more professional.",
    approach:
      "CreatifyBD started from scratch. We developed a full brand identity — logo, color palette, typography system, and tone of voice — that positioned NestNook as a premium yet accessible lifestyle brand. We then created a 30-day social media content calendar with curated aesthetics, reshot key product lines with studio photography, and launched a targeted Facebook and Instagram campaign aimed at urban homemakers aged 24–40.",
    results: [
      { metric: "3,200+", label: "New Followers in 30 Days" },
      { metric: "480%", label: "Increase in Profile Visits" },
      { metric: "62%", label: "Rise in Direct Message Inquiries" },
      { metric: "BDT 1.8L", label: "Revenue in First Campaign Month" },
    ],
    services: ["Logo & Branding", "Social Media Management", "Product Photography", "Facebook Ads"],
    color: "#E8572A",
    accentLight: "#FF8A5C",
    bgGradient: "linear-gradient(135deg, #1a0a05 0%, #2d1208 100%)",
    testimonial: "\"Before CreatifyBD, people couldn't tell us apart from any other page. Now customers recognize us instantly. The brand feels alive.\"",
    testimonialAuthor: "Founder, NestNook",
  },
  {
    id: "ironedge",
    num: "02",
    client: "IronEdge Fitness",
    industry: "Health & Fitness",
    tag: "Video Production + Ads",
    tagline: "One video. Three weeks. A gym transformed.",
    challenge:
      "IronEdge, a mid-sized gym in Uttara, was losing members to newer, flashier competitors. Their social media was inactive for months. They had no video content and relied solely on word-of-mouth. Despite having world-class equipment and certified trainers, they couldn't communicate their value online — and memberships were declining 15% month over month.",
    approach:
      "CreatifyBD produced a 60-second cinematic brand video capturing the gym's raw energy — early morning training sessions, sweat, determination, and transformation. We scripted a narrative around real member journeys. Post-production included color grading, dynamic motion graphics, and a licensed soundtrack. The video was then deployed as a Facebook and Instagram video ad campaign with hyper-local targeting in Uttara, Nikunja, and Bashundhara.",
    results: [
      { metric: "2.1M", label: "Video Views in 3 Weeks" },
      { metric: "340", label: "New Membership Inquiries" },
      { metric: "89", label: "New Members Enrolled" },
      { metric: "4.2x", label: "Return on Ad Spend" },
    ],
    services: ["Brand Video Production", "Motion Graphics", "Facebook & Instagram Ads", "Campaign Management"],
    color: "#0EA5E9",
    accentLight: "#38BDF8",
    bgGradient: "linear-gradient(135deg, #020d14 0%, #051a27 100%)",
    testimonial: "\"The video CreatifyBD made — I've seen it shared by people I've never met. That's when I knew this was different.\"",
    testimonialAuthor: "Manager, IronEdge Fitness",
  },
  {
    id: "zaraa",
    num: "03",
    client: "Zaraa Collections",
    industry: "Fashion & Apparel",
    tag: "Complete Digital Overhaul",
    tagline: "She didn't just want a logo. She wanted a legacy.",
    challenge:
      "Zaraa Collections was a women's fashion brand run by a young entrepreneur from Mirpur. The brand had a loyal but small customer base built entirely through word-of-mouth. The owner had a clear vision — contemporary Bangladeshi fashion with a global aesthetic — but her digital presence looked amateur. Poor product photography, an inconsistent visual language, and no website meant potential customers weren't taking the brand seriously.",
    approach:
      "CreatifyBD delivered a complete brand transformation. We redesigned the logo with a refined, fashion-forward identity system. We built a 5-page WordPress website with e-commerce functionality. A full product photoshoot was conducted with professional lighting and styling. Finally, we created a 4-week content rollout strategy for Instagram and Facebook, including a launch campaign with targeted ads toward fashion-forward women aged 18–35 in Dhaka.",
    results: [
      { metric: "5,800+", label: "Website Visits in Month 1" },
      { metric: "220%", label: "Increase in Online Sales" },
      { metric: "9,400+", label: "Instagram Followers Gained" },
      { metric: "BDT 3.4L", label: "Sales in Launch Month" },
    ],
    services: ["Logo Redesign", "Website Design & Development", "Product Photography", "Social Media Strategy", "Paid Ads"],
    color: "#D946EF",
    accentLight: "#E879F9",
    bgGradient: "linear-gradient(135deg, #0d0010 0%, #1a0020 100%)",
    testimonial: "\"I cried when I saw the website. For the first time, my brand looked exactly like what I imagined in my head.\"",
    testimonialAuthor: "Founder, Zaraa Collections",
  },
  {
    id: "bytebox",
    num: "04",
    client: "ByteBox Tech",
    industry: "Technology & IT Services",
    tag: "B2B Branding + Web",
    tagline: "They built great software. We built the brand that sold it.",
    challenge:
      "ByteBox Tech was a 3-year-old software development company in Dhaka with a strong technical team but a weak brand presence. They were losing pitches to smaller but better-presented competitors. Their existing website was outdated, slow, and lacked credibility signals. They needed to position themselves as a premium tech partner for both local and international clients — but didn't know where to start.",
    approach:
      "CreatifyBD redefined ByteBox's brand positioning. We developed a professional B2B brand identity — a modern logo, a corporate color system, and a brand voice that balanced technical authority with approachability. The new website (10-page premium WordPress build) featured case study sections, team showcases, service pages with clear CTAs, and was optimized for speed and SEO. We also created LinkedIn-optimized content assets and a lead-generation ad campaign targeting business decision-makers.",
    results: [
      { metric: "300%", label: "Increase in Website Traffic" },
      { metric: "18", label: "New Client Inquiries in 6 Weeks" },
      { metric: "2 International", label: "Contracts Closed via Website" },
      { metric: "Top 3", label: "Google Ranking for Target Keywords" },
    ],
    services: ["B2B Branding", "Website Design & Development", "SEO Optimization", "LinkedIn Content", "Lead Generation Ads"],
    color: "#10B981",
    accentLight: "#34D399",
    bgGradient: "linear-gradient(135deg, #010d08 0%, #021a10 100%)",
    testimonial: "\"We used to apologize for our website before sending it to clients. Now we lead every pitch with it.\"",
    testimonialAuthor: "CEO, ByteBox Tech",
  },
  {
    id: "chulkata",
    num: "05",
    client: "Chulkata",
    industry: "Food & Restaurant",
    tag: "Social Media + Photography",
    tagline: "Every scroll made people hungry. That was the plan.",
    challenge:
      "Chulkata, a small but beloved Bangladeshi street-food style restaurant in Dhanmondi, had amazing food but almost no digital presence. Their Facebook page was rarely updated, photos were blurry and unappetizing, and they had no system for engaging with customers online. In a city where food discovery happens almost entirely through social media, they were invisible — despite having a loyal dine-in crowd.",
    approach:
      "CreatifyBD ran a full-day food photography session — capturing the sizzle, the steam, the rich colors of each dish with professional lighting and food styling. We then built a vibrant Instagram and Facebook content strategy around the concept of 'real Bangladeshi flavor, proudly served' — leaning into authenticity, warmth, and nostalgia. A community engagement system was set up including response templates, story polls, and a monthly user-generated content campaign. Paid promotions targeted food lovers within a 5km radius.",
    results: [
      { metric: "12,000+", label: "New Followers in 45 Days" },
      { metric: "780%", label: "Increase in Post Reach" },
      { metric: "35%", label: "Rise in Walk-in Customers" },
      { metric: "4.8★", label: "Average Google Rating After Campaign" },
    ],
    services: ["Food Photography", "Social Media Management", "Community Engagement", "Local Facebook Ads"],
    color: "#F59E0B",
    accentLight: "#FCD34D",
    bgGradient: "linear-gradient(135deg, #0d0800 0%, #1a1000 100%)",
    testimonial: "\"People started coming in saying 'I saw your post and had to come.' That had never happened before in 4 years of running this place.\"",
    testimonialAuthor: "Owner, Chulkata",
  },
];

const CaseStudiesPage = () => {
  const [activeCase, setActiveCase] = useState(null);
  const [images, setImages] = useState({});
  const { lang } = useLanguage();

  // Fetch case study images from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'case_study_images'), (snap) => {
      const imgMap = {};
      snap.docs.forEach(doc => { imgMap[doc.id] = doc.data(); });
      setImages(imgMap);
    });
    return () => unsub();
  }, []);

  const toggle = (id) => setActiveCase(prev => prev === id ? null : id);

  return (
    <div className="cs-page-wrap">
      <CustomCursor />
      <Helmet>
        <title>Case Studies — CreatifyBD | Real Results for Real Brands</title>
        <meta name="description" content="See how CreatifyBD transformed brands across Bangladesh — from home decor to fitness, fashion to tech. Real challenges, real strategies, real results." />
      </Helmet>
      <Navbar />

      {/* Page Header */}
      <div className="cs-page-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="container"
          style={{ textAlign: 'center' }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            {lang === 'bn' ? 'আমাদের কাজের ফলাফল' : 'Work & Results'}
          </div>
          <h1 className="cs-page-title">
            {lang === 'bn' ? <>সাফল্যের <span className="red">গল্প</span></> : <>Success <span className="red">Stories</span></>}
          </h1>
          <p className="cs-page-sub">
            {lang === 'bn'
              ? 'বাস্তব ব্র্যান্ড। বাস্তব চ্যালেঞ্জ। বাস্তব ফলাফল।'
              : 'Real brands. Real challenges. Real results.'}
          </p>
        </motion.div>
      </div>

      {/* Case Studies List */}
      <div className="cs-accordion-wrap container">
        {caseStudies.map((cs, index) => {
          const isOpen = activeCase === cs.id;
          const csImages = images[cs.id] || {};

          return (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="cs-accordion-item"
              style={{ background: cs.bgGradient, borderColor: `${cs.color}30` }}
            >
              {/* Header — always visible */}
              <div
                className="cs-accordion-header"
                onClick={() => toggle(cs.id)}
                role="button"
                aria-expanded={isOpen}
              >
                <div className="cs-accordion-left">
                  <div className="cs-accordion-meta" style={{ color: cs.color }}>
                    {cs.num} — {cs.tag}
                  </div>
                  <h2 className="cs-accordion-title">{cs.client}</h2>
                  <p className="cs-accordion-industry">{cs.industry}</p>
                  <p className="cs-accordion-tagline" style={{ color: cs.accentLight }}>
                    {cs.tagline}
                  </p>
                </div>

                <div className="cs-accordion-right">
                  {/* 2 mini metrics */}
                  <div className="cs-mini-metrics">
                    {cs.results.slice(0, 2).map((r, i) => (
                      <div key={i} className="cs-mini-metric" style={{ borderColor: `${cs.color}40`, background: `${cs.color}10` }}>
                        <div className="cs-mini-val" style={{ color: cs.color }}>{r.metric}</div>
                        <div className="cs-mini-label">{r.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className={`cs-chevron ${isOpen ? 'open' : ''}`} style={{ color: cs.color }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="cs-expanded-body" style={{ borderTopColor: `${cs.color}20` }}>
                      
                      {/* Images row */}
                      <div className="cs-images-row">
                        <div className="cs-img-slot">
                          <div className="cs-img-label">Hero / Cover</div>
                          {csImages.heroUrl ? (
                            <img src={csImages.heroUrl} alt={`${cs.client} hero`} className="cs-img" />
                          ) : (
                            <div className="cs-img-placeholder">
                              <span>📸</span>
                              <p>Image coming soon</p>
                            </div>
                          )}
                        </div>
                        <div className="cs-img-slot">
                          <div className="cs-img-label">Results / Mockup</div>
                          {csImages.resultUrl ? (
                            <img src={csImages.resultUrl} alt={`${cs.client} results`} className="cs-img" />
                          ) : (
                            <div className="cs-img-placeholder">
                              <span>📊</span>
                              <p>Image coming soon</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Challenge + Approach */}
                      <div className="cs-two-col">
                        <div>
                          <div className="cs-section-label">
                            <span className="cs-dot" style={{ background: '#e74c3c' }}></span>
                            The Challenge
                          </div>
                          <p className="cs-body-text">{cs.challenge}</p>
                        </div>
                        <div>
                          <div className="cs-section-label">
                            <span className="cs-dot" style={{ background: cs.color }}></span>
                            Our Approach
                          </div>
                          <p className="cs-body-text">{cs.approach}</p>
                        </div>
                      </div>

                      {/* Full Results */}
                      <div className="cs-results-section">
                        <div className="cs-section-label-plain">Results</div>
                        <div className="cs-results-grid">
                          {cs.results.map((r, i) => (
                            <div key={i} className="cs-result-card" style={{ background: `${cs.color}10`, borderColor: `${cs.color}30` }}>
                              <div className="cs-result-metric" style={{ color: cs.color }}>{r.metric}</div>
                              <div className="cs-result-label">{r.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Services */}
                      <div className="cs-services-section">
                        <div className="cs-section-label-plain">Services Delivered</div>
                        <div className="cs-tags-row">
                          {cs.services.map((s, i) => (
                            <span key={i} className="cs-service-tag" style={{ background: `${cs.color}15`, color: cs.accentLight, borderColor: `${cs.color}30` }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      <blockquote className="cs-testimonial" style={{ borderLeftColor: cs.color }}>
                        <p className="cs-testimonial-text">{cs.testimonial}</p>
                        <cite className="cs-testimonial-author" style={{ color: cs.accentLight }}>— {cs.testimonialAuthor}</cite>
                      </blockquote>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="cs-page-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container"
          style={{ textAlign: 'center' }}
        >
          <h2 className="cs-cta-heading">
            {lang === 'bn' ? <>আপনার ব্র্যান্ডকে <span className="red">পরবর্তী সাফল্যের গল্প</span> করতে চান?</> : <>Want Your Brand to Be the <span className="red">Next Success Story?</span></>}
          </h2>
          <p className="cs-cta-sub">
            {lang === 'bn'
              ? 'আমাদের সাথে কথা বলুন — আমরা আপনার জন্য সঠিক প্ল্যান তৈরি করব।'
              : "Let's talk about your goals and build a strategy that actually delivers."}
          </p>
          <a href="/contact" className="btn-red" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            {lang === 'bn' ? 'আজই শুরু করুন →' : 'Start a Project →'}
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
