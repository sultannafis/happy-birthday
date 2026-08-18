"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        onOpen();
      }, 1500); // Wait for flap and slide animations to finish before notifying parent
    }
  };

  return (
    <div className="relative flex items-center justify-center cursor-pointer w-72 h-48 sm:w-96 sm:h-64 perspective-1000" onClick={handleClick}>
      
      {/* Back of Envelope */}
      <motion.div 
        className="absolute inset-0 bg-[#ffd6e7] rounded-b-xl rounded-t-sm shadow-inner"
        style={{ zIndex: 1 }}
      />

      {/* Letter inside */}
      <motion.div 
        className="absolute bg-[#fffae6] rounded-md shadow-sm border border-[#f0e6c8]"
        initial={{ top: "10%", bottom: "10%", left: "5%", right: "5%" }}
        animate={{ 
          top: isOpen ? "-40%" : "10%",
          zIndex: isOpen ? 3 : 1
        }}
        transition={{ duration: 0.8, ease: "easeOut", delay: isOpen ? 0.3 : 0 }}
      >
        {/* Fake text lines for visual effect */}
        <div className="p-4 flex flex-col gap-2 opacity-50">
           <div className="w-1/2 h-2 rounded bg-slate-300"></div>
           <div className="w-full h-2 rounded bg-slate-200"></div>
           <div className="w-3/4 h-2 rounded bg-slate-200"></div>
        </div>
      </motion.div>

      {/* Front of Envelope left fold */}
      <div 
        className="absolute inset-0 bg-pink-100 rounded-b-xl"
        style={{ 
          clipPath: "polygon(0 0, 50% 50%, 0 100%)",
          zIndex: 4 
        }}
      />
      {/* Front of Envelope right fold */}
      <div 
        className="absolute inset-0 bg-pink-100 rounded-b-xl"
        style={{ 
          clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
          zIndex: 4 
        }}
      />
      {/* Front of Envelope bottom fold */}
      <div 
        className="absolute inset-0 bg-pink-50 rounded-b-xl"
        style={{ 
          clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
          zIndex: 5 
        }}
      />

      {/* Top Flap (Starts closed, rotates up when opened) */}
      <motion.div 
        className="absolute inset-0 bg-pink-200 rounded-t-xl origin-top"
        style={{ 
          clipPath: "polygon(0 0, 100% 0, 50% 50%)",
          zIndex: isOpen ? 2 : 6 // Moves behind the letter once open
        }}
        initial={{ rotateX: 0 }}
        animate={{ rotateX: isOpen ? -180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
      </motion.div>

      {/* Heart seal */}
      <motion.div
        className="absolute flex items-center justify-center w-12 h-12 bg-red-400 rounded-full shadow-md text-white text-xl"
        style={{ zIndex: 6, top: "40%" }}
        initial={{ scale: 1, opacity: 1 }}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: [1, 1.1, 1] }}
        transition={{ 
          scale: isOpen ? { duration: 0.3 } : { repeat: Infinity, duration: 1.5 },
          opacity: isOpen ? { duration: 0.2 } : { duration: 0 }
        }}
      >
        💌
      </motion.div>

      {/* Tap instruction */}
      <motion.p
        className="absolute -bottom-10 text-white font-medium text-sm drop-shadow-md"
        animate={{ opacity: isOpen ? 0 : [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        klikk untukk membukaaa...
      </motion.p>
    </div>
  );
}
