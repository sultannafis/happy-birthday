"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const SadSticker = ({ className = "" }: { className?: string }) => (
  <motion.div 
    className={`w-32 h-32 relative flex items-center justify-center ${className}`}
    animate={{ y: [0, 5, 0] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  >
    <img 
      src="/gifs/sedihh" 
      alt="Sedih" 
      className="w-full h-full object-contain pointer-events-none drop-shadow-md mix-blend-multiply" 
    />
  </motion.div>
);

export const NeutralSticker = ({ className = "" }: { className?: string }) => (
  <motion.div 
    className={`w-32 h-32 relative flex items-center justify-center ${className}`}
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
  >
    <img 
      src="/gifs/lumayan tapi tetep sedih" 
      alt="Neutral" 
      className="w-full h-full object-contain pointer-events-none drop-shadow-md mix-blend-multiply" 
    />
  </motion.div>
);

export const HappySticker = ({ className = "" }: { className?: string }) => (
  <motion.div 
    className={`w-32 h-32 relative flex items-center justify-center ${className}`}
    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <img 
      src="/gifs/happy" 
      alt="Happy" 
      className="w-full h-full object-contain pointer-events-none drop-shadow-lg mix-blend-multiply" 
    />
  </motion.div>
);
