import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to global site settings (Identity, Branding, Colors)
    const unsubSettings = onSnapshot(doc(db, 'settings', 'site'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setSettings(data);
        
        // Update CSS Variables for Theme
        if (data.primary_color) {
          document.documentElement.style.setProperty('--red', data.primary_color);
        }
        if (data.secondary_color) {
           document.documentElement.style.setProperty('--red-dark', data.secondary_color);
        }
      }
    }, (err) => {
      console.error("Settings Fetch Error:", err);
    });

    // Listen to section content (Hero, Process, etc.)
    const unsubContent = onSnapshot(doc(db, 'settings', 'content'), (snap) => {
      if (snap.exists()) {
        setContent(snap.data());
      }
      setLoading(false);
    }, (err) => {
      console.error("Content Fetch Error:", err);
      setLoading(false);
    });


    return () => {
      unsubSettings();
      unsubContent();
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, content, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};


export const useSettings = () => useContext(SettingsContext);
