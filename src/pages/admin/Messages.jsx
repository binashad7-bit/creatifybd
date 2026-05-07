import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, deleteDoc, doc, query, orderBy, onSnapshot, updateDoc } from 'firebase/firestore';
import { Trash2, Mail, Phone, Calendar, CheckCircle2, Circle } from 'lucide-react';

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message permanently?')) {
      await deleteDoc(doc(db, 'messages', id));
    }
  };

  const toggleRead = async (id, currentStatus) => {
    await updateDoc(doc(db, 'messages', id), { read: !currentStatus });
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.5rem' }}>Customer Inquiries</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Manage and track all messages from the contact form.</p>
      </div>

      <div className="admin-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Date</th>
              <th>Customer Info</th>
              <th>Business & Service</th>
              <th>Project Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} style={{ opacity: m.read ? 0.7 : 1 }}>
                <td style={{ verticalAlign: 'top' }}>
                  <button 
                    onClick={() => toggleRead(m.id, m.read)} 
                    style={{ background: 'none', border: 'none', color: m.read ? '#22c55e' : '#E8192C', cursor: 'pointer' }}
                    title={m.read ? "Mark as Unread" : "Mark as Read"}
                  >
                    {m.read ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>{m.timestamp?.toDate().toLocaleDateString()}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>{m.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <div style={{ fontWeight: '700', marginBottom: '0.3rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{m.contact}</div>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{m.business || 'Personal'}</div>
                  <div style={{ color: '#E8192C', fontSize: '0.75rem', fontWeight: '700' }}>{m.service}</div>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', maxWidth: '400px', lineHeight: '1.4' }}>{m.project}</p>
                </td>
                <td style={{ verticalAlign: 'top' }}>
                  <button onClick={() => handleDelete(m.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && !loading && (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.2)' }}>No messages found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesList;
