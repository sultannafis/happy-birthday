"use client";

import { motion } from "framer-motion";

export default function PhotoboothLoading() {
  return (
    <div className="fixed inset-0 bg-[#fef5f0]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center">
      {/* Dynamic photostrip printing style loader */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map((i) => (
           <motion.div
             key={i}
             className="w-12 h-16 bg-white shadow-md border-t-4 border-rose-300 rounded-sm"
             animate={{ 
               y: [0, -20, 0],
               opacity: [0.3, 1, 0.3]
             }}
             transition={{ 
               duration: 1.5, 
               repeat: Infinity, 
               ease: "easeInOut",
               delay: i * 0.2
             }}
           />
        ))}
      </div>
      
      {/* Floating elegant text */}
      <motion.h2 
        className="text-2xl md:text-3xl font-caveat text-rose-500 drop-shadow-sm text-center px-4"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        mencetakk kenangann di photobooth...
      </motion.h2>
    </div>
  );
}
