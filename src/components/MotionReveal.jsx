import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

/**
 * TextReveal: Animates text word by word using a masked reveal effect.
 */
export const TextReveal = ({ children, className = '', delay = 0, as = 'h2' }) => {
  const MotionTag = motion[as] || motion.h2;

  // If children is not a string (e.g. contains nested spans or is null), render it directly without word-by-word animation
  if (typeof children !== 'string') {
    return (
      <MotionTag
        className={`text-reveal-container ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 70,
      rotate: 5,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <MotionTag
      className={`text-reveal-container ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="word-mask">
          <motion.span variants={child} className="word-inner">
            {word}{" "}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

/**
 * ImageReveal: Duck.design style directional slide & scale reveal.
 */
export const ImageReveal = ({ children, delay = 0 }) => {
  return (
    <div className="image-reveal-wrap" style={{ position: 'relative', overflow: 'hidden', borderRadius: 'inherit', width: '100%', height: '100%' }}>
      <motion.div
        initial={{ y: "100%", scale: 1.2, opacity: 0 }}
        whileInView={{ y: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1.4, 
          ease: [0.16, 1, 0.3, 1], // Custom Duck Design Cubic Easing
          delay 
        }}
        style={{ width: '100%', height: '100%', willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * StaggerReveal: Container for staggered child animations.
 */
export const StaggerReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
        hidden: {}
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * FadeReveal: Advanced fade and skew reveal for blocks.
 */
export const FadeReveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 40, skewY: 2 },
        visible: { opacity: 1, y: 0, skewY: 0 }
      }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

/**
 * ParallaxImage: A simple parallax effect on image scroll.
 */
export const ParallaxImage = ({ src, alt, className = '' }) => {
  return (
    <div className={`parallax-wrap ${className}`} style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
      <motion.div
        style={{ width: '100%', height: '120%', y: '-10%' }}
        whileInView={{ y: '0%' }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: false }}
      >
        <OptimizedImage 
          src={src} 
          alt={alt} 
          objectFit="cover"
        />
      </motion.div>
    </div>
  );
};
