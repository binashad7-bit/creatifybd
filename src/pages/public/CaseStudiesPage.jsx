import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CustomCursor from '../../components/CustomCursor';
import { TextReveal, FadeReveal, ImageReveal, ParallaxImage } from '../../components/MotionReveal';

const caseStudies = [
  {
    id: "veldt-co",
    num: "01",
    client: "Veldt & Co.",
    sector: "Luxe Sustainability",
    tagline: "Conscious Craftsmanship, Redefined.",
    challenge: "Veldt & Co. had a disconnect between their premium sustainable products and their digital identity. They needed to justify a high-end price point while maintaining an authentic eco-conscious narrative in a cluttered market.",
    approach: "We engineered an 'Editorial Commerce' experience. By treating every product as a museum piece, we used generous whitespace, earth-toned palettes, and macro-cinematography to tell a story of longevity and soul, rather than just utility.",
    results: [
      { val: "140%", label: "Revenue Growth" },
      { val: "22m", label: "Avg Session" },
      { val: "Top 5", label: "Design Awards" },
    ],
    color: "#E8572A",
    quote: "They captured the soul of our brand. Our customers now see us as a movement, not just a store.",
    author: "Marcus Thorne, Founder"
  },
  {
    id: "aura-labs",
    num: "02",
    client: "Aura Labs",
    sector: "AI & Healthcare",
    tagline: "Intelligence with a Human Pulse.",
    challenge: "Aura Labs' groundbreaking AI tool was masked by a clinical, intimidating interface. Medical professionals found the data hard to trust because the 'black box' of AI logic wasn't transparently communicated.",
    approach: "We implemented a 'Glassmorphic' UI system focusing on 'Visual Logic.' By using depth, transparency, and subtle motion, we made complex diagnostic paths feel intuitive, fostering trust between doctor and machine.",
    results: [
      { val: "65%", label: "Time Saved" },
      { val: "92%", label: "Trust Index" },
      { val: "$1.2M", label: "Series A" },
    ],
    color: "#6366F1",
    quote: "They took complex algorithms and turned them into a tool doctors love. Design is now our biggest advantage.",
    author: "Dr. Elena Vance, CTO"
  },
  {
    id: "lumina-watch",
    num: "03",
    client: "Lumina Watchmaking",
    sector: "High Horology",
    tagline: "The Architecture of Time.",
    challenge: "Boutique watchmakers often struggle against heritage brands. Lumina needed to showcase the 'tactile luxury' of their movements that traditional photography simply couldn't capture.",
    approach: "We pioneered a hybrid approach of 8K macro-cinematography and 3D digital twins. We dissected the watch in mid-air via interactive web components, allowing users to feel the precision of 200+ moving parts.",
    results: [
      { val: "3.5M", label: "Global Reach" },
      { val: "210%", label: "Pre-orders" },
      { val: "58%", label: "Social Lift" },
    ],
    color: "#B45309",
    quote: "The 3D visuals were so realistic that clients were trying to touch their screens. Truly world-class.",
    author: "Julian Mercer, Creative Lead"
  },
  {
    id: "nomad-brews",
    num: "04",
    client: "Nomad Brews",
    sector: "Artisanal Lifestyle",
    tagline: "Culture, Poured into Every Cup.",
    challenge: "Expanding from an indie shop to a regional chain often kills 'soul.' Nomad needed a brand system that felt hyper-local in every city while maintaining a globally recognizable aesthetic.",
    approach: "We developed a 'Modular Identity'—a visual language that adapts its DNA to local architecture and street art. We overhauled their social presence to focus on the 'Third Space' lifestyle, building a tribe of 45k+ digital nomads.",
    results: [
      { val: "12", label: "Cities Opened" },
      { val: "45k", label: "New Tribe" },
      { val: "30%", label: "Footfall" },
    ],
    color: "#78350F",
    quote: "They didn't just give us a logo; they gave us a culture. Every shop feels like it has always belonged.",
    author: "Sarah Chen, CEO"
  },
  {
    id: "vertex-fintech",
    num: "05",
    client: "Vertex FinTech",
    sector: "Digital Economy",
    tagline: "Finance, but make it personal.",
    challenge: "Vertex felt like 'just another bank.' They were losing younger users to platforms that felt more 'human' and less 'transactional.'",
    approach: "We redesigned the banking experience around 'Micro-wins.' We replaced cold numbers with progress-driven animations and a neon-dark aesthetic that feels more like a gaming ecosystem than a ledger.",
    results: [
      { val: "500k", label: "New Users" },
      { val: "4.8", label: "App Rating" },
      { val: "75%", label: "Retention" },
    ],
    color: "#2DD4BF",
    quote: "They understood that banking is emotional. They made money management feel like a game you want to win.",
    author: "Rashed Ahmed, Product Head"
  },
  {
    id: "solis-energy",
    num: "06",
    client: "Solis Energy",
    sector: "Renewable Tech",
    tagline: "The Future of Power, Visualized.",
    challenge: "Solis's technical spec-heavy communication was boring investors. They needed to pivot from 'solar panels' to 'visionary energy infrastructure.'",
    approach: "We produced a cinematic brand film titled 'The First Light,' using drone-led CG overlays to visualize energy grids. We positioned them as the 'Tesla of Solar' through a Sun-Gold and Deep-Blue brand overhaul.",
    results: [
      { val: "3", label: "National Wins" },
      { val: "1.5M", label: "Video Views" },
      { val: "Global", label: "Innovation Award" },
    ],
    color: "#EAB308",
    quote: "Our pitches used to be about wires. Now they are about the future of our children. A massive shift.",
    author: "Robert Glass, VP of Sales"
  },
  {
    id: "kyber-sec",
    num: "07",
    client: "Kyber Security",
    sector: "Cybersecurity",
    tagline: "Quiet Strength for a Loud World.",
    challenge: "In an industry of fear, Kyber wanted to stand for peace. They needed to look impenetrable yet modern, avoiding the 'scare-tactics' tropes of their competitors.",
    approach: "We used Brutalist digital architecture—heavy, monolithic 3D shapes and a Ruby-Red palette. The web experience feels like descending into a high-security vault, making 'safety' a tangible aesthetic experience.",
    results: [
      { val: "400%", label: "Lead Growth" },
      { val: "Top 1%", label: "Design Rank" },
      { val: "14", label: "Mega Partners" },
    ],
    color: "#F43F5E",
    quote: "They made security look cool. Our clients don't just feel safe; they feel like they have the best tech.",
    author: "Samiul Haque, CEO"
  },
  {
    id: "echo-skincare",
    num: "08",
    client: "Echo Skincare",
    sector: "Clean Beauty",
    tagline: "Nature's Rhythm, Amplified.",
    challenge: "Echo's superior ingredients were hidden behind pharmacy-grade packaging. They weren't winning the 'shelf-war' in luxury boutiques or the 'feed-war' on Instagram.",
    approach: "We designed a soft-touch packaging system with light-refractive holographic labels. We launched a 'Zero-Retouch' campaign, building a high-trust community through science-backed, artistic social content.",
    results: [
      { val: "48h", label: "Sold Out" },
      { val: "50k+", label: "Organic Growth" },
      { val: "85%", label: "Repurchase" },
    ],
    color: "#EC4899",
    quote: "The packaging is so beautiful people are keeping the boxes. Our digital presence now matches our quality.",
    author: "Tania Rahman, Founder"
  },
  {
    id: "arcane-spirits",
    num: "09",
    client: "Arcane Spirits",
    sector: "Ultra-Premium Beverage",
    tagline: "The Mystery of the Midnight Pour.",
    challenge: "Launching a limited reserve requires mystery, not just ads. Arcane needed to create a 'Secret Society' feel to drive high-value pre-orders.",
    approach: "We built a password-protected digital gateway hidden behind cryptic social teasers. The visuals used 'Chiaroscuro' lighting—deep shadows and golden highlights—to emphasize rarity and craft.",
    results: [
      { val: "100%", label: "Allocation Filled" },
      { val: "2.4M", label: "Impressions" },
      { val: "$250k+", label: "Pre-Launch Revenue" },
    ],
    color: "#8B5CF6",
    quote: "For luxury, what you don't show is as important as what you do. The mystery was our best salesperson.",
    author: "Arthur Sterling, Brand Mgr"
  },
  {
    id: "zenith-aviation",
    num: "10",
    client: "Zenith Aviation",
    sector: "Private Aviation",
    tagline: "Seamless Luxury, Above the Clouds.",
    challenge: "Zenith's booking platform felt like a standard airline site. Their UHNW clients expected a digital experience as bespoke as their private cabin service.",
    approach: "We built a 'Frictionless Luxury' portal with conversational AI and high-fidelity 3D jet tours. No forms, no friction—just a 'Midnight Blue' and 'Cloud White' interface optimized for elite global travel.",
    results: [
      { val: "45%", label: "Booking Lift" },
      { val: "Top 5", label: "Travel Awards" },
      { val: "$50k+", label: "Avg Transaction" },
    ],
    color: "#1E3A8A",
    quote: "Finally, a site that understands our clients. Fast, beautiful, and discreet. The digital equivalent of first class.",
    author: "Capt. Victor Thorne, Director"
  }
];

const CaseStudyItem = ({ cs, index, images }) => {
  const isEven = index % 2 === 0;
  const csImages = images[cs.id] || {};

  return (
    <div className={`premium-cs-item ${isEven ? 'even' : 'odd'}`}>
      <div className="cs-sticky-info">
        <FadeReveal delay={0.2}>
          <div className="cs-num-badge" style={{ background: `${cs.color}15`, color: cs.color }}>
            {cs.num} — {cs.sector}
          </div>
        </FadeReveal>
        
        <TextReveal className="cs-hero-title">
          {cs.client}
        </TextReveal>

        <FadeReveal delay={0.4}>
          <h3 className="cs-tagline" style={{ color: cs.color }}>{cs.tagline}</h3>
        </FadeReveal>

        <div className="cs-narrative-box">
          <div className="cs-narrative-section">
            <h4 className="cs-sec-head">The Challenge</h4>
            <p className="cs-sec-body">{cs.challenge}</p>
          </div>
          <div className="cs-narrative-section">
            <h4 className="cs-sec-head">Strategy</h4>
            <p className="cs-sec-body">{cs.approach}</p>
          </div>
        </div>

        <div className="cs-metrics-staggered">
          {cs.results.map((r, i) => (
            <div key={i} className="cs-metric-pill" style={{ borderColor: `${cs.color}20` }}>
              <div className="cs-metric-val" style={{ color: cs.color }}>{r.val}</div>
              <div className="cs-metric-lab">{r.label}</div>
            </div>
          ))}
        </div>

        <div className="cs-quote-wrap" style={{ borderLeft: `2px solid ${cs.color}` }}>
          <p className="cs-quote-text">"{cs.quote}"</p>
          <span className="cs-quote-author" style={{ color: cs.color }}>— {cs.author}</span>
        </div>
      </div>

      <div className="cs-visual-scroll">
        <div className="cs-parallax-slot">
          {csImages.heroUrl ? (
            <ParallaxImage src={csImages.heroUrl} alt={`${cs.client} hero`} className="cs-large-img" />
          ) : (
            <div className="cs-placeholder-luxury">Hero Image Pending</div>
          )}
        </div>
        <div className="cs-parallax-slot secondary">
          {csImages.resultUrl ? (
            <ParallaxImage src={csImages.resultUrl} alt={`${cs.client} result`} className="cs-large-img" />
          ) : (
            <div className="cs-placeholder-luxury">Result Image Pending</div>
          )}
        </div>
      </div>
    </div>
  );
};

const CaseStudiesPage = () => {
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

  return (
    <div className="premium-cs-page">
      <CustomCursor />
      <Helmet>
        <title>Selected Case Studies — CreatifyBD | World-Class Digital Strategy</title>
        <meta name="description" content="A deep dive into 10 masterpieces of branding, UI/UX, and digital strategy by CreatifyBD." />
      </Helmet>
      <Navbar />

      <header className="premium-cs-header">
        <div className="container">
          <FadeReveal>
            <div className="eyebrow" style={{ color: 'var(--red)' }}>Global Portfolio</div>
          </FadeReveal>
          <TextReveal className="premium-cs-h1">
            {lang === 'bn' ? 'সাফল্যের নতুন সংজ্ঞা' : 'Success, Engineered.'}
          </TextReveal>
          <FadeReveal delay={0.4}>
            <p className="premium-cs-sub">
              Explore 10 world-class case studies. A deep dive into how we solve complex business problems through strategic design and technical excellence.
            </p>
          </FadeReveal>
        </div>
        <div className="cs-header-scroll-hint">
          <div className="cs-mouse">
            <div className="cs-wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </header>

      <div className="premium-cs-container">
        {caseStudies.map((cs, idx) => (
          <CaseStudyItem key={cs.id} cs={cs} index={idx} images={images} />
        ))}
      </div>

      <section className="premium-cs-cta">
        <div className="container">
          <TextReveal className="cs-cta-big">Ready to make history?</TextReveal>
          <FadeReveal delay={0.4}>
            <p className="cs-cta-text">Let's build your brand's next masterpiece together.</p>
            <a href="/contact" className="btn-huge-red">Start Your Story →</a>
          </FadeReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
