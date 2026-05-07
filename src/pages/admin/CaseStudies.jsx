import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/config';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { uploadImage } from '../../utils/imgbb';
import { Upload, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react';

const cases = [
  { id: 'veldt-co', name: 'Veldt & Co.', tag: 'Branding + Digital', color: '#4A5D4E' },
  { id: 'aura-labs', name: 'Aura Labs', tag: 'UI/UX + Motion', color: '#6366F1' },
  { id: 'lumina-watch', name: 'Lumina Watchmaking', tag: 'Product Photography', color: '#B45309' },
  { id: 'nomad-brews', name: 'Nomad Brews', tag: 'Social Media + Identity', color: '#78350F' },
  { id: 'vertex-fintech', name: 'Vertex FinTech', tag: 'FinTech Overhaul', color: '#2DD4BF' },
  { id: 'solis-energy', name: 'Solis Energy', tag: 'Corporate + Video', color: '#EAB308' },
  { id: 'kyber-sec', name: 'Kyber Security', tag: '3D Motion + Web', color: '#F43F5E' },
  { id: 'echo-skincare', name: 'Echo Skincare', tag: 'Packaging + Growth', color: '#EC4899' },
  { id: 'arcane-spirits', name: 'Arcane Spirits', tag: 'Campaign + Visuals', color: '#8B5CF6' },
  { id: 'zenith-aviation', name: 'Zenith Aviation', tag: 'Luxury Web', color: '#1E3A8A' },
];

const UploadSlot = ({ label, currentUrl, onUpload, uploading, progress, accentColor }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem', display: 'flex', justifyContent: 'space-between' }}>
      <span>{label}</span>
      {uploading && <span style={{ color: accentColor }}>{progress}%</span>}
    </div>
    <div style={{
      width: '100%', height: '180px', borderRadius: '16px',
      border: currentUrl ? 'none' : '1.5px dashed rgba(255,255,255,0.15)',
      background: currentUrl ? 'transparent' : 'rgba(255,255,255,0.03)',
      overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 0.3s ease'
    }}>
      {currentUrl && !uploading ? (
        <>
          <img src={currentUrl} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0, transition: '0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0}
          >
            <label style={{ cursor: 'pointer', background: 'white', color: 'black', padding: '0.6rem 1.4rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800 }}>
              Replace Image
              <input type="file" hidden accept="image/*" onChange={onUpload} />
            </label>
          </div>
        </>
      ) : (
        <label style={{ cursor: 'pointer', textAlign: 'center', padding: '2rem', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {uploading ? (
            <div style={{ width: '100%', padding: '0 2rem' }}>
              <div style={{ position: 'relative', width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
                <div style={{ 
                  position: 'absolute', top: 0, left: 0, height: '100%', 
                  background: accentColor, width: `${progress}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                Uploading... {progress}%
              </div>
            </div>
          ) : (
            <>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Upload size={20} style={{ color: 'rgba(255,255,255,0.4)' }} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                Click to upload
              </div>
              <input type="file" hidden accept="image/*" onChange={onUpload} />
            </>
          )}
        </label>
      )}
    </div>
  </div>
);

const CaseStudyCard = ({ cs }) => {
  const [images, setImages] = useState({ heroUrl: '', resultUrl: '' });
  const [uploading, setUploading] = useState({ hero: false, result: false });
  const [progress, setProgress] = useState({ hero: 0, result: 0 });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'case_study_images', cs.id), (snap) => {
      if (snap.exists()) setImages(snap.data());
    });
    return () => unsub();
  }, [cs.id]);

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 15 * 1024 * 1024) {
      alert("File is too large. Max size is 15MB.");
      return;
    }

    setUploading(prev => ({ ...prev, [type]: true }));
    setProgress(prev => ({ ...prev, [type]: 0 }));

    try {
      if (!auth.currentUser) throw new Error("Authentication failed. Please re-login.");

      const url = await uploadImage(file, (p) => {
        setProgress(prev => ({ ...prev, [type]: p }));
      });
      
      const updated = { ...images, [`${type}Url`]: url };
      setImages(updated);
      
      await setDoc(doc(db, 'case_study_images', cs.id), updated, { merge: true });
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Case Study Upload Error:', err);
      alert(`Upload failed: ${err.message || 'Firebase error'}`);
    }
    setUploading(prev => ({ ...prev, [type]: false }));
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '24px', padding: '2rem', marginBottom: '2rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${cs.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cs.color, fontSize: '1.2rem', fontWeight: 800 }}>
            {cs.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: cs.color, marginBottom: '0.2rem' }}>
              {cs.tag}
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>{cs.name}</h3>
          </div>
        </div>
        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', fontSize: '0.85rem', fontWeight: 700, background: 'rgba(34, 197, 94, 0.1)', padding: '0.5rem 1rem', borderRadius: '100px' }}>
            <CheckCircle2 size={16} /> All Changes Saved
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <UploadSlot
          label="Hero / Cover Visual"
          currentUrl={images.heroUrl}
          onUpload={(e) => handleUpload(e, 'hero')}
          uploading={uploading.hero}
          progress={progress.hero}
          accentColor={cs.color}
        />
        <UploadSlot
          label="Results / Outcome Mockup"
          currentUrl={images.resultUrl}
          onUpload={(e) => handleUpload(e, 'result')}
          uploading={uploading.result}
          progress={progress.result}
          accentColor={cs.color}
        />
      </div>
    </div>
  );
};

const CaseStudiesManager = () => {
  return (
    <div className="admin-content-wrap">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>Premium Case Studies</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Bring your success stories to life with cinematic visuals. Progress tracking enabled for large file uploads.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {cases.map(cs => <CaseStudyCard key={cs.id} cs={cs} />)}
      </div>
    </div>
  );
};

export default CaseStudiesManager;
