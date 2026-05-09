import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

const TestimonialsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', text: '', stars: 5, hidden: false });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'testimonials'), orderBy('name'));
      const snap = await getDocs(q);
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'testimonials', editingId), formData);
      } else {
        await addDoc(collection(db, 'testimonials'), formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ name: '', role: '', text: '', stars: 5, hidden: false });
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save testimonial. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      await deleteDoc(doc(db, 'testimonials', id));
      fetchItems();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Client Reviews</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Manage client feedback shown on the homepage.</p>
        </div>
        <button className="admin-btn" onClick={() => { setEditingId(null); setFormData({ name: '', role: '', text: '', stars: 5, hidden: false }); setIsModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Add New Review
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {items.map((t) => (
          <div key={t.id} className="admin-card" style={{ opacity: t.hidden ? 0.5 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ color: '#f59e0b', display: 'flex', gap: '2px' }}>
                {[...Array(parseInt(t.stars))].map((_, i) => <Star key={i} size={14} fill="#f59e0b" />)}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setEditingId(t.id); setFormData({ ...t }); setIsModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(t.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', lineHeight: '1.6' }}>"{t.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>{t.name.charAt(0)}</div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X /></button>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><label>Client Name</label><input className="admin-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required /></div>
                <div><label>Stars</label><select className="admin-input" value={formData.stars} onChange={(e) => setFormData({...formData, stars: e.target.value})}><option value="5">5 Stars</option><option value="4">4 Stars</option></select></div>
              </div>
              <div style={{ marginBottom: '1rem' }}><label>Client Role/Company</label><input className="admin-input" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} required /></div>
              <div style={{ marginBottom: '1.5rem' }}><label>Testimonial Text</label><textarea className="admin-input" style={{ height: '100px' }} value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} required /></div>
              <button type="submit" className="admin-btn" style={{ width: '100%' }}>{editingId ? 'Update Review' : 'Add Review'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;
