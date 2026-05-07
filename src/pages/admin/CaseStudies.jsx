import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { uploadImage } from '../../utils/imgbb';
import { Upload, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react';

const cases = [
  { id: 'nestnook', name: 'NestNook', tag: 'Branding + Social Media', color: '#E8572A' },
  { id: 'ironedge', name: 'IronEdge Fitness', tag: 'Video Production + Ads', color: '#0EA5E9' },
  { id: 'zaraa', name: 'Zaraa Collections', tag: 'Complete Digital Overhaul', color: '#D946EF' },
  { id: 'bytebox', name: 'ByteBox Tech', tag: 'B2B Branding + Web', color: '#10B981' },
  { id: 'chulkata', name: 'Chulkata', tag: 'Social Media + Photography', color: '#F59E0B' },
];

const UploadSlot = ({ label, currentUrl, onUpload, uploading }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
      {label}
    </div>
    <div style={{
      width: '100%', height: '160px', borderRadius: '12px',
      border: currentUrl ? 'none' : '1.5px dashed rgba(255,255,255,0.15)',
      background: currentUrl ? 'transparent' : 'rgba(255,255,255,0.03)',
      overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {currentUrl ? (
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
            <label style={{ cursor: 'pointer', background: 'white', color: 'black', padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
              Change Image
              <input type="file" hidden accept="image/*" onChange={onUpload} />
            </label>
          </div>
        </>
      ) : (
        <label style={{ cursor: 'pointer', textAlign: 'center', padding: '1rem' }}>
          {uploading
            ? <Loader2 size={28} style={{ color: 'rgba(255,255,255,0.3)', animation: 'spin 1s linear infinite' }} />
            : <Upload size={28} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem', display: 'block', margin: '0 auto 0.5rem' }} />
          }
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
            {uploading ? 'Uploading...' : 'Click to upload image'}
          </div>
          <input type="file" hidden accept="image/*" onChange={onUpload} />
        </label>
      )}
    </div>
  </div>
);

const CaseStudyCard = ({ cs }) => {
  const [images, setImages] = useState({ heroUrl: '', resultUrl: '' });
  const [uploading, setUploading] = useState({ hero: false, result: false });
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
    setUploading(prev => ({ ...prev, [type]: true }));
    try {
      const url = await uploadImage(file);
      const updated = { ...images, [`${type}Url`]: url };
      setImages(updated);
      await setDoc(doc(db, 'case_study_images', cs.id), updated, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert('Upload failed. Please try again.');
    }
    setUploading(prev => ({ ...prev, [type]: false }));
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px', padding: '1.75rem', marginBottom: '1.25rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: cs.color, marginBottom: '0.3rem' }}>
            {cs.tag}
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>{cs.name}</h3>
        </div>
        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#22c55e', fontSize: '0.8rem', fontWeight: 600 }}>
            <CheckCircle2 size={16} /> Saved
          </div>
        )}
        {(images.heroUrl && images.resultUrl) && !saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            <ImageIcon size={14} /> Both images uploaded
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <UploadSlot
          label="Hero / Cover Image"
          currentUrl={images.heroUrl}
          onUpload={(e) => handleUpload(e, 'hero')}
          uploading={uploading.hero}
        />
        <UploadSlot
          label="Results / Mockup Image"
          currentUrl={images.resultUrl}
          onUpload={(e) => handleUpload(e, 'result')}
          uploading={uploading.result}
        />
      </div>
    </div>
  );
};

const CaseStudiesManager = () => {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Case Studies</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
          Upload Hero and Results images for each case study. Images will appear on the <strong style={{ color: 'white' }}>/case-studies</strong> page automatically.
        </p>
      </div>

      <div style={{ background: 'rgba(232,25,44,0.08)', border: '1px solid rgba(232,25,44,0.2)', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '1rem' }}>💡</div>
        <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
          Upload <strong style={{ color: 'white' }}>Hero Image</strong> — a beautiful product/brand photo (e.g. flat lay, cinematic shot) and <strong style={{ color: 'white' }}>Results Image</strong> — a mockup showing the outcome (e.g. phone showing Instagram grid, laptop showing website). Recommended size: 1200×800px minimum.
        </div>
      </div>

      {cases.map(cs => <CaseStudyCard key={cs.id} cs={cs} />)}
    </div>
  );
};

export default CaseStudiesManager;
