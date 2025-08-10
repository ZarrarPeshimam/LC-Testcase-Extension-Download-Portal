// src/components/FadeInOnScroll.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FadeInOnScroll = ({ children, className = '', direction = 'up', ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // triggers every time in view

  // Variants for different directions
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : 0,
      x: direction === 'left' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
