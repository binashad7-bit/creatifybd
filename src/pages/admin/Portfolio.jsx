import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { uploadImage } from '../../utils/imgbb';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Upload, Loader2, CloudCheck } from 'lucide-react';

const PortfolioManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', imageUrl: '', hidden: false });

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('title'));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
      setSyncing(true);
      setTimeout(() => setSyncing(false), 2000);
    });
    return () => unsub();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData({ ...formData, imageUrl: url });
    } catch (err) { alert('Upload failed'); }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert('Please upload an image first');
    try {
      if (editingId) {
        await updateDoc(doc(db, 'portfolio', editingId), formData);
      } else {
        await addDoc(collection(db, 'portfolio'), formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: '', category: '', imageUrl: '', hidden: false });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this portfolio item?')) {
      await deleteDoc(doc(db, 'portfolio', id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Manage Portfolio</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Showcase your best work with high-res images.</p>
        </div>
        <button className="admin-btn" onClick={() => { setEditingId(null); setFormData({ title: '', category: '', imageUrl: '', hidden: false }); setIsModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Add New Item
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {items.map((item) => (
          <div key={item.id} className="admin-card" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
            <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#E8192C', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{item.category}</div>
              <h4 style={{ fontWeight: '700', marginBottom: '1rem' }}>{item.title}</h4>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => { setEditingId(item.id); setFormData({ ...item }); setIsModalOpen(true); }} className="admin-btn" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: '#fff' }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} className="admin-btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><Trash2 size={16} /></button>
              </div>
            </div>
            {item.hidden && <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.6rem' }}>HIDDEN</div>}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X /></button>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Portfolio Image</label>
                <div style={{ width: '100%', height: '200px', border: '2px dashed var(--admin-border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  {formData.imageUrl ? (
                    <>
                      <img src={formData.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0}>
                        <label style={{ cursor: 'pointer', background: '#fff', color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>
                          Change Image
                          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                        </label>
                      </div>
                    </>
                  ) : (
                    <label style={{ cursor: 'pointer', textAlign: 'center' }}>
                      {uploading ? <Loader2 className="animate-spin" /> : <Upload size={32} style={{ color: 'var(--admin-text-dim)', marginBottom: '0.5rem' }} />}
                      <div style={{ color: 'var(--admin-text-dim)', fontSize: '0.8rem' }}>{uploading ? 'Uploading to ImgBB...' : 'Click to upload (Full Res)'}</div>
                      <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                    </label>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}><label>Project Title</label><input className="admin-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Fashion Brand Identity" required /></div>
              <div style={{ marginBottom: '1.5rem' }}><label>Category</label><input className="admin-input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="e.g. Branding / Photography" required /></div>
              <button type="submit" className="admin-btn" style={{ width: '100%' }} disabled={uploading}>{editingId ? 'Update Item' : 'Publish to Portfolio'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
