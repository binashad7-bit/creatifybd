import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setIsVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.getAttribute('data-cursor') === 'View' ||
        target.getAttribute('data-cursor') === 'Click'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }

      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor-main ${isHovered ? 'cursor-hover' : ''} ${isTyping ? 'cursor-typing' : ''}`}
      style={{
        opacity: isVisible ? (isTyping ? 0 : 1) : 0,
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 999999,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default CustomCursor;
