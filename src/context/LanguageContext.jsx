import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync with Firestore settings
    const unsub = onSnapshot(doc(db, 'settings', 'site'), (docSnap) => {
      if (docSnap.exists()) {
        const currentLang = docSnap.data().lang || 'en';
        setLang(currentLang);
        // Apply class to body for font switching
        document.body.className = currentLang === 'bn' ? 'lang-bn' : '';
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {!loading && children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
