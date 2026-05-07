import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Plus, Edit2, Trash2, X, Check, Eye, EyeOff } from 'lucide-react';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', desc: '', price: '', icon: '📱', bg: 's1', hidden: false });

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('title'));
    const unsub = onSnapshot(q, (snap) => {
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'services', editingId), formData);
      } else {
        await addDoc(collection(db, 'services'), formData);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: '', desc: '', price: '', icon: '📱', bg: 's1', hidden: false });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await deleteDoc(doc(db, 'services', id));
    }
  };

  const toggleHide = async (id, currentStatus) => {
    await updateDoc(doc(db, 'services', id), { hidden: !currentStatus });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Manage Services</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Add, edit or hide services offered by CreatifyBD.</p>
        </div>
        <button className="admin-btn" onClick={() => { setEditingId(null); setFormData({ title: '', desc: '', price: '', icon: '📱', bg: 's1', hidden: false }); setIsModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Add New Service
        </button>
      </div>

      <div className="admin-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Service Title</th>
              <th>Price Tag</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} style={{ opacity: s.hidden ? 0.5 : 1 }}>
                <td><div style={{ fontSize: '1.5rem' }}>{s.icon}</div></td>
                <td style={{ fontWeight: '600' }}>{s.title}</td>
                <td><span style={{ color: '#E8192C', fontWeight: '700' }}>{s.price}</span></td>
                <td>
                  <span className={`badge-status ${s.hidden ? 'badge-hidden' : 'badge-active'}`}>
                    {s.hidden ? 'Hidden' : 'Visible'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => toggleHide(s.id, s.hidden)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                      {s.hidden ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button onClick={() => { setEditingId(s.id); setFormData({ ...s }); setIsModalOpen(true); }} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}>
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(s.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X /></button>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Service' : 'Add New Service'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div><label>Icon (Emoji)</label><input className="admin-input" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} required /></div>
                <div><label>Price Tag</label><input className="admin-input" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="e.g. From ৳1,500" required /></div>
              </div>
              <div style={{ marginBottom: '1rem' }}><label>Title</label><input className="admin-input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required /></div>
              <div style={{ marginBottom: '1.5rem' }}><label>Description</label><textarea className="admin-input" style={{ height: '100px' }} value={formData.desc} onChange={(e) => setFormData({...formData, desc: e.target.value})} required /></div>
              <button type="submit" className="admin-btn" style={{ width: '100%' }}>{editingId ? 'Update Service' : 'Create Service'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
