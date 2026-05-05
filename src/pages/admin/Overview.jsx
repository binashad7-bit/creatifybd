import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, limit, addDoc, serverTimestamp, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { MessageSquare, Briefcase, Image as ImageIcon, Star, TrendingUp, Database, Trash2, Mail, Phone, Calendar, Globe } from 'lucide-react';

const Overview = () => {
  const [stats, setStats] = useState({
    messages: 0,
    services: 0,
    portfolio: 0,
    testimonials: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');

  const toggleLanguage = async (newLang) => {
    if (newLang === lang) return;
    try {
      await setDoc(doc(db, 'settings', 'site'), { lang: newLang }, { merge: true });
      setLang(newLang);
    } catch (err) { 
      console.error(err);
      alert('Failed to update language'); 
    }
  };

  const seedDemoData = async () => {
    if (!window.confirm('This will add demo data to your website. Continue?')) return;
    
    try {
      // Seed Services
      const services = [
        { 
          icon: '📱', 
          title: 'Social Media Management', 
          title_bn: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট',
          desc: 'Facebook & Instagram setup, content creation, community management, and follower growth.', 
          desc_bn: 'আপনার ব্যবসার ভ্যালু বাড়াতে আমরা করছি প্রফেশনাল সোশ্যাল মিডিয়া ম্যানেজমেন্ট এবং কন্টেন্ট ক্রিয়েশন।',
          price: 'From ৳1,500', bg: 's1', hidden: false 
        },
        { 
          icon: '🎨', 
          title: 'Branding & Logo Design', 
          title_bn: 'ব্র্যান্ডিং ও লোগো ডিজাইন',
          desc: 'Impactful logos and branding materials with unlimited revisions and brand guidelines.', 
          desc_bn: 'আপনার ব্যবসার জন্য একটি ইউনিক আইডেন্টিটি বা লোগো তৈরি করুন যা সবার নজর কাড়বে।',
          price: 'From ৳1,000', bg: 's2', hidden: false 
        },
        { 
          icon: '📸', 
          title: 'Product Photography', 
          title_bn: 'প্রোডাক্ট ফটোগ্রাফি',
          desc: 'Professional studio, lifestyle, and white background shots for your products.', 
          desc_bn: 'আপনার পণ্যের সেরা লুক ফুটিয়ে তুলতে আমরা দিচ্ছি প্রফেশনাল স্টুডিও ও লাইফস্টাইল ফটোগ্রাফি।',
          price: 'From ৳1,500', bg: 's3', hidden: false 
        },
        { 
          icon: '🎬', 
          title: 'Video Production', 
          title_bn: 'ভিডিও প্রোডাকশন',
          desc: '15 to 60-second cinematic brand videos with voice-over and licensed soundtracks.', 
          desc_bn: 'সিনেমাটিক ব্র্যান্ড ভিডিওর মাধ্যমে আপনার ব্যবসার গল্পটি পৌঁছে দিন সবার কাছে।',
          price: 'From ৳2,000', bg: 's4', hidden: false 
        },
        { 
          icon: '💻', 
          title: 'Website Design & Dev', 
          title_bn: 'ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট',
          desc: 'Responsive, SEO-optimized WordPress websites from single-page to full e-commerce.', 
          desc_bn: 'একটি আধুনিক ও দ্রুতগতির ওয়েবসাইট যা আপনার ব্যবসাকে নিয়ে যাবে অন্য এক উচ্চতায়।',
          price: 'From ৳8,000', bg: 's5', hidden: false 
        }
      ];
      for (const s of services) await addDoc(collection(db, 'services'), s);

      // Seed Portfolio
      const portfolio = [
        { 
          title: 'Nova Fashion Branding', 
          title_bn: 'নোভা ফ্যাশনের ব্র্যান্ডিং সলিউশন',
          category: 'Branding', 
          category_bn: 'ব্র্যান্ডিং',
          imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800', 
          hidden: false 
        },
        { 
          title: 'Organic Food Website', 
          title_bn: 'অর্গানিক ফুড ই-কমার্স ওয়েবসাইট',
          category: 'Web Dev', 
          category_bn: 'ওয়েব ডেভেলপমেন্ট',
          imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800', 
          hidden: false 
        }
      ];
      for (const p of portfolio) await addDoc(collection(db, 'portfolio'), p);

      // Seed Testimonials
      const testimonials = [
        { name: 'Rahim Uddin', role: 'CEO, Nova Fashion', role_bn: 'সিইও, নোভা ফ্যাশন', text: 'CreatifyBD transformed our online presence. Highly recommended!', text_bn: 'ক্রিয়েটিফাইবিডির সাথে কাজ করে আমাদের ব্যবসার ভ্যালু অনেক বেড়েছে। তাদের সার্ভিস সত্যিই অসাধারণ!', stars: 5, hidden: false },
        { name: 'Sumaiya Ahmed', role: 'Founder, Green Eats', role_bn: 'ফাউন্ডার, গ্রিন ইটস', text: 'Amazing branding work. They understood our vision perfectly.', text_bn: 'খুবই চমৎকার ব্র্যান্ডিং! তারা আমাদের আইডিয়াকে খুব সুন্দরভাবে ফুটিয়ে তুলেছে।', stars: 5, hidden: false }
      ];
      for (const t of testimonials) await addDoc(collection(db, 'testimonials'), t);

      // Seed Pricing
      const pricing = [
        { 
          category: 'social', tier: 'Basic', tier_bn: 'বেসিক',
          price: '1,500', 
          desc: 'Perfect for getting started online', 
          desc_bn: 'অনলাইনে ব্যবসার নতুন যাত্রার জন্য উপযুক্ত',
          features: ['Facebook page setup', 'Instagram page setup', 'Basic design'], 
          features_bn: ['ফেসবুক পেজ সেটআপ', 'ইনস্টাগ্রাম পেজ সেটআপ', 'বেসিক গ্রাফিক ডিজাইন'],
          order: 1, hidden: false 
        },
        { 
          category: 'social', tier: 'Standard', tier_bn: 'স্ট্যান্ডার্ড',
          price: '3,000', 
          desc: 'Best for growing businesses', 
          desc_bn: 'বর্ধিষ্ণু ব্যবসার জন্য আমাদের সেরা সলিউশন',
          features: ['Full social setup', 'Logo design', '1-week scheduling'], 
          features_bn: ['ফুল সোশ্যাল মিডিয়া সেটআপ', 'লোগো ডিজাইন অন্তর্ভুক্ত', '১ সপ্তাহের কন্টেন্ট শিডিউলিং'],
          order: 2, featured: true, hidden: false 
        }
      ];
      for (const pr of pricing) await addDoc(collection(db, 'pricing'), pr);

      alert('Demo data seeded successfully! All sections are now live.');
      window.location.reload();
    } catch (err) { alert('Seeding failed: ' + err.message); }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const mSnap = await getDocs(collection(db, 'messages'));
        const sSnap = await getDocs(collection(db, 'services'));
        const pSnap = await getDocs(collection(db, 'portfolio'));
        const tSnap = await getDocs(collection(db, 'testimonials'));

        setStats({
          messages: mSnap.size,
          services: sSnap.size,
          portfolio: pSnap.size,
          testimonials: tSnap.size
        });

        const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(5));
        const qSnap = await getDocs(q);
        setRecentMessages(qSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchStats();

    const unsub = onSnapshot(doc(db, 'settings', 'site'), (docSnap) => {
      if (docSnap.exists()) setLang(docSnap.data().lang || 'en');
    });
    return () => unsub();
  }, []);

  const statCards = [
    { label: 'Total Inquiries', value: stats.messages, icon: <MessageSquare />, color: '#E8192C' },
    { label: 'Active Services', value: stats.services, icon: <Briefcase />, color: '#3b82f6' },
    { label: 'Portfolio Items', value: stats.portfolio, icon: <ImageIcon />, color: '#8b5cf6' },
    { label: 'Client Reviews', value: stats.testimonials, icon: <Star />, color: '#f59e0b' },
  ];

  if (loading) return <div style={{ padding: '2rem', color: 'white' }}>Loading statistics...</div>;

  return (
    <div>
      <div className="content-header">
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--adm-dim)', fontSize: '0.95rem' }}>Welcome back, Admin! Control your agency's presence from here.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ background: 'var(--adm-card)', padding: '0.4rem', borderRadius: '12px', display: 'flex', border: '1px solid var(--adm-border)' }}>
            <button 
              onClick={() => toggleLanguage('en')}
              style={{ 
                padding: '0.5rem 1.25rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: lang === 'en' ? 'var(--adm-red)' : 'transparent', 
                color: '#fff', 
                cursor: 'pointer', 
                fontSize: '0.75rem', 
                fontWeight: '800',
                transition: 'all 0.2s ease'
              }}
            >
              EN
            </button>
            <button 
              onClick={() => toggleLanguage('bn')}
              style={{ 
                padding: '0.5rem 1.25rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: lang === 'bn' ? 'var(--adm-red)' : 'transparent', 
                color: '#fff', 
                cursor: 'pointer', 
                fontSize: '0.75rem', 
                fontWeight: '800',
                transition: 'all 0.2s ease'
              }}
            >
              BN
            </button>
          </div>
          <button className="admin-btn" onClick={seedDemoData} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--adm-border)' }}>
            Seed Demo Data
          </button>
        </div>
      </div>

      <div className="stat-grid">
        {statCards.map((card, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: `${card.color}15`, color: card.color }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--adm-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>{card.label}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem' }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontWeight: '700', fontSize: '1.2rem' }}>Recent Inquiries</h3>
            <Link to="/admin/messages" style={{ color: 'var(--adm-red)', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none' }}>View All</Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Interested In</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.map((msg) => (
                <tr key={msg.id}>
                  <td style={{ fontWeight: '600' }}>{msg.name}</td>
                  <td style={{ color: 'var(--adm-dim)' }}>{msg.service}</td>
                  <td><span style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', background: 'var(--adm-red-soft)', color: 'var(--adm-red)', fontWeight: '700' }}>New Lead</span></td>
                </tr>
              ))}
              {recentMessages.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '3rem', color: 'var(--adm-dim)' }}>No recent inquiries.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="admin-card" style={{ background: 'linear-gradient(135deg, #E8192C 0%, #a8101e 100%)', border: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem' }}>
          <TrendingUp size={40} style={{ marginBottom: '1.5rem', color: 'white' }} />
          <h3 style={{ fontWeight: '800', fontSize: '1.4rem', marginBottom: '1rem', color: 'white' }}>SEO Pro Tip</h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem' }}>
            To rank #1 for "Creative Agency", ensure you add 5+ high-quality projects to your portfolio. Google prioritizes active portfolios.
          </p>
          <Link to="/admin/portfolio" className="admin-btn" style={{ background: 'white', color: 'var(--adm-red)', width: 'fit-content', padding: '0.75rem 1.5rem' }}>
            Optimize Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
