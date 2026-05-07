import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Globe, Phone, Mail, Share2, AtSign, Search, Save, RefreshCw } from 'lucide-react';

const defaultSettings = {
  site_name: 'CreatifyBD',
  tagline: 'Creative Agency & Digital Marketing in Dhaka',
  phone: '+880 01951 676600',
  email: 'creatifybd@gmail.com',
  facebook: 'https://facebook.com/creatifybd',
  instagram: 'https://instagram.com/creatifybd',
  whatsapp: '',
  seo_title: 'CreatifyBD — Creative Agency & Digital Marketing in Dhaka, Bangladesh',
  seo_description: 'CreatifyBD is a leading creative agency in Dhaka providing social media marketing, professional photography, web development, and branding services.',
  seo_keywords: 'creative agency dhaka, digital marketing bangladesh, social media management dhaka',
  lang: 'en',
};

const SettingsManager = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const ref = doc(db, 'settings', 'site');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setSettings({ ...defaultSettings, ...snap.data() });
        }
      } catch (err) {
        toast.error('Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'site'), settings, { merge: true });
      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default values?')) {
      setSettings(defaultSettings);
      toast('Settings reset. Click Save to apply.', { icon: '⚠️' });
    }
  };

  if (loading) {
    return (
      <div className="admin-card" style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{ color: 'var(--adm-dim)', fontSize: '0.9rem' }}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div className="admin-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'white', marginBottom: '0.25rem' }}>Site Settings</h1>
          <p style={{ color: 'var(--adm-dim)', fontSize: '0.85rem' }}>Manage global site configuration — saved directly to Firestore.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleReset}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--adm-border)', borderRadius: '10px', color: 'var(--adm-dim)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}
          >
            <RefreshCw size={15} /> Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.4rem', background: saving ? '#333' : 'var(--adm-red)', border: 'none', borderRadius: '10px', color: 'white', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: '600', fontFamily: 'inherit' }}
          >
            <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Branding */}
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <Globe size={18} color="var(--adm-red)" />
          <h2 style={{ fontSize: '1rem', fontWeight: '700', color: 'white' }}>Branding</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <SettingField label="Site Name" name="site_name" value={settings.site_name} onChange={handleChange} />
          <SettingField label="Tagline" name="tagline" value={settings.tagline} onChange={handleChange} />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: 'var(--adm-dim)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Default Language</label>
          <select
            name="lang"
            value={settings.lang}
            onChange={handleChange}
            style={{ padding: '0.6rem 0.9rem', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '10px', color: 'white', fontSize: '0.875rem', fontFamily: 'inherit', width: '200px' }}
          >
            <option value="en">English</option>
            <option value="bn">বাংলা (Bengali)</option>
          </select>
        </div>
      </div>

      {/* Contact Info */}
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <Phone size={18} color="var(--adm-red)" />
          <h2 style={{ fontSize: '1rem', fontWeight: '700', color: 'white' }}>Contact Information</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <SettingField label="Phone Number" name="phone" value={settings.phone} onChange={handleChange} placeholder="+880 01XXXXXXXXX" />
          <SettingField label="Email Address" name="email" value={settings.email} onChange={handleChange} placeholder="your@email.com" />
          <SettingField label="WhatsApp Number" name="whatsapp" value={settings.whatsapp} onChange={handleChange} placeholder="+880 01XXXXXXXXX" />
        </div>
      </div>

      {/* Social Links */}
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <Share2 size={18} color="var(--adm-red)" />
          <h2 style={{ fontSize: '1rem', fontWeight: '700', color: 'white' }}>Social Media Links</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <SettingField label="Facebook URL" name="facebook" value={settings.facebook} onChange={handleChange} placeholder="https://facebook.com/yourpage" />
          <SettingField label="Instagram URL" name="instagram" value={settings.instagram} onChange={handleChange} placeholder="https://instagram.com/yourpage" />
        </div>
      </div>

      {/* SEO Settings */}
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <Search size={18} color="var(--adm-red)" />
          <h2 style={{ fontSize: '1rem', fontWeight: '700', color: 'white' }}>SEO & Meta Tags</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <SettingField label="SEO Title" name="seo_title" value={settings.seo_title} onChange={handleChange} />
          <SettingField label="SEO Description" name="seo_description" value={settings.seo_description} onChange={handleChange} isTextarea />
          <SettingField label="SEO Keywords (comma separated)" name="seo_keywords" value={settings.seo_keywords} onChange={handleChange} isTextarea />
        </div>

        {/* Live Preview */}
        <div style={{ marginTop: '1.5rem', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '12px', padding: '1.25rem' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: '600', color: 'var(--adm-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Google Preview</p>
          <p style={{ color: '#8ab4f8', fontSize: '1rem', marginBottom: '0.2rem', fontWeight: '500' }}>{settings.seo_title || 'Page Title'}</p>
          <p style={{ color: '#34a853', fontSize: '0.8rem', marginBottom: '0.25rem' }}>creatify-bd.web.app</p>
          <p style={{ color: 'var(--adm-dim)', fontSize: '0.85rem', lineHeight: 1.5 }}>{settings.seo_description || 'Meta description...'}</p>
        </div>
      </div>

      {/* Save Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '1rem' }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem', background: saving ? '#333' : 'var(--adm-red)', border: 'none', borderRadius: '12px', color: 'white', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.9rem', fontWeight: '600', fontFamily: 'inherit' }}
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

    </div>
  );
};

// Reusable form field
const SettingField = ({ label, name, value, onChange, placeholder = '', isTextarea = false }) => (
  <div>
    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: 'var(--adm-dim)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {label}
    </label>
    {isTextarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        style={{ width: '100%', padding: '0.65rem 0.9rem', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '10px', color: 'white', fontSize: '0.875rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none' }}
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: '100%', padding: '0.65rem 0.9rem', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: '10px', color: 'white', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none' }}
      />
    )}
  </div>
);

export default SettingsManager;
