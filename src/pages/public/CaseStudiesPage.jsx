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
    id: "veldt-co",
    num: "01",
    client: "Veldt & Co.",
    industry: "Sustainable Furniture",
    tag: "Branding + Digital Experience",
    tagline: "Crafting a legacy of conscious living through minimalist design.",
    challenge: "Veldt & Co. approached us with a high-end product line but a brand identity that felt disconnected from their sustainable roots. Their digital presence was cluttered, failing to justify their premium price point to an eco-conscious audience that values transparency and aesthetic purity.",
    approach: "We redefined their visual language using an earth-toned palette and organic typography. The core of our strategy was 'Editorial Commerce'—transforming their website into a digital lookbook where every product story was told through high-fidelity visuals and minimal copy, emphasizing the craftsmanship behind each piece.",
    results: [
      { metric: "140%", label: "Conversion Rate Increase" },
      { metric: "22m", label: "Average Session Duration" },
      { metric: "BDT 4.2M", label: "Direct-to-Consumer Revenue" },
      { metric: "Top 5", label: "Global Design Award Shortlist" },
    ],
    services: ["Brand Strategy", "Visual Identity", "E-commerce Development", "Art Direction"],
    color: "#4A5D4E",
    accentLight: "#A3B18A",
    bgGradient: "linear-gradient(135deg, #0f1411 0%, #1a231e 100%)",
    testimonial: "\"CreatifyBD didn't just design a website; they captured the soul of our brand. Our customers now see us as a movement, not just a store.\"",
    testimonialAuthor: "Marcus Thorne, Founder",
  },
  {
    id: "aura-labs",
    num: "02",
    client: "Aura Labs",
    industry: "AI Healthcare",
    tag: "UI/UX + Motion Systems",
    tagline: "Humanizing artificial intelligence for a healthier tomorrow.",
    challenge: "Aura Labs had developed a groundbreaking AI diagnostic tool, but their interface was overly technical and intimidating for medical professionals. They needed to bridge the gap between complex data and intuitive clinical decision-making without losing the 'high-tech' feel.",
    approach: "We implemented a 'Glassmorphic' design system that prioritized data visualization through clarity and depth. By using subtle motion cues, we guided clinicians through complex patient reports, making the AI's logic transparent and trustworthy. Every interaction was designed to reduce cognitive load in high-stress environments.",
    results: [
      { metric: "65%", label: "Reduction in Diagnostic Time" },
      { metric: "92%", label: "User Satisfaction Score" },
      { metric: "$1.2M", label: "Series A Funding Secured" },
      { metric: "Zero", label: "Interface Training Required" },
    ],
    services: ["UX Research", "UI Design System", "Motion Graphics", "Data Visualization"],
    color: "#6366F1",
    accentLight: "#818CF8",
    bgGradient: "linear-gradient(135deg, #060714 0%, #0d0e2b 100%)",
    testimonial: "\"They took our complex algorithms and turned them into a tool that doctors actually love to use. The design became our biggest competitive advantage.\"",
    testimonialAuthor: "Dr. Elena Vance, CTO",
  },
  {
    id: "lumina-watch",
    num: "03",
    client: "Lumina Watchmaking",
    industry: "Luxury Timepieces",
    tag: "Product Photography + 3D Ads",
    tagline: "Precision in every second. Perfection in every pixel.",
    challenge: "Lumina, a boutique watchmaker, struggled to compete with legacy heritage brands. Their marketing materials lacked the 'tactile luxury' that justifies a $5,000 price tag. They needed to showcase their internal movements and material quality with extreme macro detail.",
    approach: "We moved away from traditional photography toward a hybrid of 8K macro-cinematography and 3D product rendering. We created a series of high-impact social media ads that 'dissected' the watch in mid-air, showing the 200+ moving parts, paired with a website that featured a 360-degree interactive configurator.",
    results: [
      { metric: "3.5M", label: "Global Campaign Reach" },
      { metric: "210%", label: "Pre-order Target Achievement" },
      { metric: "58%", label: "Instagram Engagement Lift" },
      { metric: "8k", label: "Hours of Content Interaction" },
    ],
    services: ["3D Product Rendering", "Macro Cinematography", "Social Ad Strategy", "Interactive Web Components"],
    color: "#B45309",
    accentLight: "#F59E0B",
    bgGradient: "linear-gradient(135deg, #140b02 0%, #261605 100%)",
    testimonial: "\"The 3D visuals were so realistic that clients were trying to touch their screens. CreatifyBD brought our craftsmanship to life.\"",
    testimonialAuthor: "Julian Mercer, Creative Director",
  },
  {
    id: "nomad-brews",
    num: "04",
    client: "Nomad Brews",
    industry: "Artisanal Coffee Chain",
    tag: "Social Media + Brand Identity",
    tagline: "Fueling the modern wanderer with soul and caffeine.",
    challenge: "Nomad Brews was expanding from a single shop to a regional chain. Their 'indie' charm was getting lost in the scale. They needed a cohesive brand system that felt local and authentic in every city, while maintaining operational consistency.",
    approach: "We developed a 'Modular Identity' system—a core logo that could be adapted with local elements for each city. We then overhauled their Instagram into a lifestyle platform, focusing on the 'third space' experience rather than just the coffee. We implemented a high-contrast, gritty-yet-clean aesthetic that resonated with Gen-Z and Millennial remote workers.",
    results: [
      { metric: "12", label: "Successful New Location Launches" },
      { metric: "45k", label: "Organic Community Growth" },
      { metric: "30%", label: "In-store Footfall Increase" },
      { metric: "4.9/5", label: "Brand Sentiment Index" },
    ],
    services: ["Modular Branding", "Lifestyle Photography", "Influencer Strategy", "Interior Signage"],
    color: "#78350F",
    accentLight: "#D97706",
    bgGradient: "linear-gradient(135deg, #120802 0%, #1f0e04 100%)",
    testimonial: "\"They didn't just give us a logo; they gave us a culture. Every new shop feels like it has always belonged there.\"",
    testimonialAuthor: "Sarah Chen, CEO",
  },
  {
    id: "vertex-fintech",
    num: "05",
    client: "Vertex FinTech",
    industry: "Digital Banking",
    tag: "Complete Digital Overhaul",
    tagline: "The future of finance, simplified for everyone.",
    challenge: "Vertex was losing users to legacy banks who had finally updated their apps. Their platform felt 'built by engineers for engineers.' They needed a radical shift toward a lifestyle-oriented financial experience that felt secure but friendly.",
    approach: "We redesigned the entire mobile experience from the ground up, focusing on 'Micro-wins'—small animations and rewards for saving and spending wisely. We replaced complex financial jargon with human language and created a vibrant, neon-on-dark color system that stood out in a sea of corporate blue.",
    results: [
      { metric: "500k", label: "New Active Users" },
      { metric: "4.8", label: "App Store Rating" },
      { metric: "75%", label: "Churn Rate Reduction" },
      { metric: "BDT 120M", label: "Increased Transaction Volume" },
    ],
    services: ["Mobile App Design", "Brand Voice Architecture", "Customer Journey Mapping", "FinTech Compliance Design"],
    color: "#2DD4BF",
    accentLight: "#5EEAD4",
    bgGradient: "linear-gradient(135deg, #021411 0%, #042923 100%)",
    testimonial: "\"CreatifyBD understood that banking is emotional, not just transactional. They made money management feel like a game you want to win.\"",
    testimonialAuthor: "Rashed Ahmed, Product Head",
  },
  {
    id: "solis-energy",
    num: "06",
    client: "Solis Energy",
    industry: "Renewable Tech",
    tag: "Corporate Branding + Video",
    tagline: "Powering the planet without costing the earth.",
    challenge: "Solis was a leader in solar tech, but their B2B communications felt dry and uninspiring. They needed to move from 'technical spec' marketing to 'visionary leadership' to win government contracts and large-scale industrial partnerships.",
    approach: "We produced a cinematic brand film titled 'The First Light,' blending sweeping drone footage with CG overlays that visualized energy flow. We paired this with a high-end corporate identity that utilized deep blues and sun-golds, positioning them as the 'Tesla of the energy grid.'",
    results: [
      { metric: "3", label: "National Infrastructure Wins" },
      { metric: "1.5M", label: "Vision Video Views" },
      { metric: "25%", label: "Partnership Inquiry Growth" },
      { metric: "Global", label: "Sustainability Award Winner" },
    ],
    services: ["Cinematic Video Production", "B2B Brand Strategy", "Sales Deck Design", "Digital Annual Reports"],
    color: "#EAB308",
    accentLight: "#FDE047",
    bgGradient: "linear-gradient(135deg, #141002 0%, #261d05 100%)",
    testimonial: "\"Our pitches used to be about panels and wires. Now they are about the future of our children. That change was all CreatifyBD.\"",
    testimonialAuthor: "Robert Glass, VP of Sales",
  },
  {
    id: "kyber-sec",
    num: "07",
    client: "Kyber Security",
    industry: "Cybersecurity",
    tag: "3D Motion + Web",
    tagline: "Invisible protection for a visible world.",
    challenge: "In an industry where 'fear' is the standard marketing tool, Kyber wanted to stand for 'peace of mind.' Their brand needed to feel impenetrable yet accessible, modern yet timeless.",
    approach: "We created a 3D-driven web experience where users 'descended' into a digital vault. Every scroll triggered a motion sequence showing Kyber's shielding layers in action. The aesthetic was inspired by brutalist architecture—solid, heavy, and reliable—but executed with futuristic digital materials.",
    results: [
      { metric: "400%", label: "Demo Request Increase" },
      { metric: "99.9%", label: "Brand Recall Score" },
      { metric: "Top 1%", label: "Awwwards Site of the Day" },
      { metric: "14", label: "Enterprise Partnerships" },
    ],
    services: ["Interactive Web Design", "3D Motion Graphics", "Brutalist Brand Identity", "Cyber-visual Language"],
    color: "#F43F5E",
    accentLight: "#FB7185",
    bgGradient: "linear-gradient(135deg, #140408 0%, #2b0811 100%)",
    testimonial: "\"They made security look cool. Our clients don't just feel safe; they feel like they are using the best tech on the planet.\"",
    testimonialAuthor: "Samiul Haque, CEO",
  },
  {
    id: "echo-skincare",
    num: "08",
    client: "Echo Skincare",
    industry: "Clean Beauty",
    tag: "Packaging + Social Growth",
    tagline: "Your skin's natural rhythm, amplified.",
    challenge: "Echo was entering a saturated 'clean beauty' market. Their ingredients were superior, but their packaging looked like a generic pharmacy brand. They needed to pop on the shelf and look 'Instagrammable' in every customer's bathroom.",
    approach: "We designed a packaging system using soft-touch materials and holographic accents that changed color with the light. We then launched an Instagram campaign focused on 'Real Skin,' using zero-retouch photography and educational carousels that demystified skincare science, building a community of 50k+ advocates in 3 months.",
    results: [
      { metric: "Sold Out", label: "Launch Batch in 48 Hours" },
      { metric: "50k+", label: "Targeted Instagram Growth" },
      { metric: "12", label: "Major Retailer Inquiries" },
      { metric: "85%", label: "Customer Re-purchase Rate" },
    ],
    services: ["Packaging Design", "Social Media Management", "Content Production", "Influencer Gifting Design"],
    color: "#EC4899",
    accentLight: "#F472B6",
    bgGradient: "linear-gradient(135deg, #14060d 0%, #2b0d1c 100%)",
    testimonial: "\"The packaging is so beautiful people are keeping the empty boxes. Our digital presence finally matches the quality of our creams.\"",
    testimonialAuthor: "Tania Rahman, Founder",
  },
  {
    id: "arcane-spirits",
    num: "09",
    client: "Arcane Spirits",
    industry: "Premium Beverage",
    tag: "Campaign Strategy + Visuals",
    tagline: "Mystique in every drop. Craft in every bottle.",
    challenge: "Arcane was launching a limited-edition reserve. They needed to create a sense of exclusivity and 'mystery' to drive high-value pre-orders without traditional advertising.",
    approach: "We built a 'Secret Society' campaign. The website was password-protected, with codes hidden in cinematic teaser clips released on social media. The visuals used deep shadows and golden highlights to create a 'Midnight' aesthetic, emphasizing the rarity of the ingredients and the time-honored distillation process.",
    results: [
      { metric: "100%", label: "Pre-order Allocation Filled" },
      { metric: "$250k", label: "Revenue Before Launch" },
      { metric: "2.4M", label: "Teaser Campaign Impressions" },
      { metric: "Exclusive", label: "Waitlist of 15k+ Members" },
    ],
    services: ["Guerilla Marketing Strategy", "Premium Art Direction", "Cinematic Teasers", "Exclusive Web Portals"],
    color: "#8B5CF6",
    accentLight: "#A78BFA",
    bgGradient: "linear-gradient(135deg, #0a0614 0%, #160d2b 100%)",
    testimonial: "\"CreatifyBD understood that for luxury, what you don't show is as important as what you do. The mystery was our best salesperson.\"",
    testimonialAuthor: "Arthur Sterling, Brand Manager",
  },
  {
    id: "zenith-aviation",
    num: "10",
    client: "Zenith Aviation",
    industry: "Private Jet Charter",
    tag: "Luxury Web Experience",
    tagline: "The sky is not the limit. It's your playground.",
    challenge: "Zenith's booking platform was functional but felt like a standard airline site. Their Ultra-High-Net-Worth (UHNW) clients expected a digital experience as seamless and luxurious as their private cabin service.",
    approach: "We created a 'Frictionless Luxury' portal. No forms—just a conversational AI interface and high-fidelity 3D jet tours. We used a palette of 'Midnight Blue' and 'Cloud White,' with typography that mimicked high-end watch magazines. The site was optimized for ultra-fast loading on satellite internet, ensuring global accessibility.",
    results: [
      { metric: "45%", label: "Direct Booking Increase" },
      { metric: "$50k", label: "Average Transaction Value" },
      { metric: "Top 5", label: "Travel & Tourism Design Award" },
      { metric: "100%", label: "Client Privacy Protection" },
    ],
    services: ["UHNW Experience Design", "High-Fidelity 3D Tours", "Bespoke Portal Development", "Global Brand Positioning"],
    color: "#1E3A8A",
    accentLight: "#3B82F6",
    bgGradient: "linear-gradient(135deg, #020614 0%, #040c2b 100%)",
    testimonial: "\"Finally, a website that understands our clients. It's fast, beautiful, and completely discreet. It's the digital equivalent of first class.\"",
    testimonialAuthor: "Captain Victor Thorne, Director",
  },
];

const CaseStudiesPage = () => {
  const [activeCase, setActiveCase] = useState(null);
  const [images, setImages] = useState({});
  const { lang } = useLanguage();

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
        <title>Case Studies — CreatifyBD | World-Class Digital Solutions</title>
        <meta name="description" content="Explore 10 world-class case studies from CreatifyBD. From AI Healthcare to Luxury Watchmaking, see how we transform brands through strategic design." />
      </Helmet>
      <Navbar />

      <div className="cs-page-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="container"
          style={{ textAlign: 'center' }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            {lang === 'bn' ? 'আমাদের গ্লোবাল পোর্টফোলিও' : 'Global Portfolio'}
          </div>
          <h1 className="cs-page-title">
            {lang === 'bn' ? <>সাফল্যের <span className="red">আখ্যান</span></> : <>Success <span className="red">Narratives</span></>}
          </h1>
          <p className="cs-page-sub">
            {lang === 'bn'
              ? '১০টি বিশ্বমানের কেস স্টাডি। কৌশলগত ডিজাইন এবং ডিজিটাল উৎকর্ষের সমন্বয়।'
              : '10 world-class case studies. A fusion of strategic design and digital excellence.'}
          </p>
        </motion.div>
      </div>

      <div className="cs-accordion-wrap container">
        {caseStudies.map((cs, index) => {
          const isOpen = activeCase === cs.id;
          const csImages = images[cs.id] || {};

          return (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="cs-accordion-item"
              style={{ background: cs.bgGradient, borderColor: `${cs.color}30` }}
            >
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
                      <div className="cs-images-row">
                        <div className="cs-img-slot">
                          <div className="cs-img-label">Brand Visual / Hero</div>
                          {csImages.heroUrl ? (
                            <img src={csImages.heroUrl} alt={`${cs.client} hero`} className="cs-img" />
                          ) : (
                            <div className="cs-img-placeholder">
                              <span>📸</span>
                              <p>Hero visual pending upload</p>
                            </div>
                          )}
                        </div>
                        <div className="cs-img-slot">
                          <div className="cs-img-label">Outcome / Mockup</div>
                          {csImages.resultUrl ? (
                            <img src={csImages.resultUrl} alt={`${cs.client} results`} className="cs-img" />
                          ) : (
                            <div className="cs-img-placeholder">
                              <span>📊</span>
                              <p>Result mockup pending upload</p>
                            </div>
                          )}
                        </div>
                      </div>

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
                            Strategic Approach
                          </div>
                          <p className="cs-body-text">{cs.approach}</p>
                        </div>
                      </div>

                      <div className="cs-results-section">
                        <div className="cs-section-label-plain">Key Performance Indicators</div>
                        <div className="cs-results-grid">
                          {cs.results.map((r, i) => (
                            <div key={i} className="cs-result-card" style={{ background: `${cs.color}10`, borderColor: `${cs.color}30` }}>
                              <div className="cs-result-metric" style={{ color: cs.color }}>{r.metric}</div>
                              <div className="cs-result-label">{r.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="cs-services-section">
                        <div className="cs-section-label-plain">Capabilities Deployed</div>
                        <div className="cs-tags-row">
                          {cs.services.map((s, i) => (
                            <span key={i} className="cs-service-tag" style={{ background: `${cs.color}15`, color: cs.accentLight, borderColor: `${cs.color}30` }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

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
            {lang === 'bn' ? <>আপনার প্রজেক্ট কি <span className="red">পরবর্তী মাস্টারপিস</span> হবে?</> : <>Will Your Project Be the <span className="red">Next Masterpiece?</span></>}
          </h2>
          <p className="cs-cta-sub">
            {lang === 'bn'
              ? 'আসুন আপনার লক্ষ্য নিয়ে আলোচনা করি এবং একটি বিশ্বমানের কৌশল তৈরি করি।'
              : "Let's discuss your vision and engineer a strategy that redefines your industry."}
          </p>
          <a href="/contact" className="btn-red" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            {lang === 'bn' ? 'পরামর্শ শুরু করুন →' : 'Start Consultation →'}
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
