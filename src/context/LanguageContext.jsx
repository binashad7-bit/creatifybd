import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const applyLanguage = (currentLang) => {
      setLang(currentLang);
      document.body.classList.toggle('lang-bn', currentLang === 'bn');
    };

    const timeoutId = window.setTimeout(() => {
      console.warn('Language settings check timed out. Continuing with English.');
      applyLanguage('en');
      setLoading(false);
    }, 5000);

    let unsub = () => {};
    try {
      // Sync with Firestore settings
      unsub = onSnapshot(doc(db, 'settings', 'site'), (docSnap) => {
        window.clearTimeout(timeoutId);
        applyLanguage(docSnap.exists() ? (docSnap.data().lang || 'en') : 'en');
        setLoading(false);
      }, (error) => {
        window.clearTimeout(timeoutId);
        console.error('Language settings error:', error);
        applyLanguage('en');
        setLoading(false);
      });
    } catch (error) {
      window.clearTimeout(timeoutId);
      console.error('Language listener failed:', error);
      applyLanguage('en');
      setLoading(false);
    }

    return () => {
      window.clearTimeout(timeoutId);
      unsub();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (lang !== 'bn') {
        document.body.classList.remove('lang-bn');
      }
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {!loading && children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
