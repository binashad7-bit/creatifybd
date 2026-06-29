import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

const Preloader = ({ onComplete }) => {
  const { settings } = useSettings();
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 800;
    const start = Date.now();
    let hideTimeout;
    let completeTimeout;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * 100));

      if (progress >= 1) {
        clearInterval(interval);
        hideTimeout = setTimeout(() => {
          setIsVisible(false);
          completeTimeout = setTimeout(onComplete, 350);
        }, 100);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } }}
          className="preloader"
        >
          <div className="preloader-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="preloader-brand"
            >
              <img src={settings?.loading_logo_url || '/favicon.png'} alt="CreatifyBD" style={{ height: '120px', marginBottom: '2rem' }} />
            </motion.div>

            <div className="preloader-progress">
              <div className="preloader-bar" style={{ width: `${count}%` }} />
            </div>
            <div className="preloader-num">{count}%</div>
          </div>
          <div className="preloader-bg-text">CREATIVITY / GROWTH / RESULTS</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
