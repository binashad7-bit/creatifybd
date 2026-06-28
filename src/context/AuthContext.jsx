import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      console.warn('Auth state check timed out. Continuing as guest.');
      setUser(null);
      setLoading(false);
    }, 5000);

    let unsubscribe = () => {};
    try {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        window.clearTimeout(timeoutId);
        setUser(currentUser);
        setLoading(false);
      }, (error) => {
        window.clearTimeout(timeoutId);
        console.error('Auth state error:', error);
        setUser(null);
        setLoading(false);
      });
    } catch (error) {
      window.clearTimeout(timeoutId);
      console.error('Auth listener failed:', error);
      setLoading(false);
    }

    return () => {
      window.clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
