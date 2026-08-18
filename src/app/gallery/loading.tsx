"use client";

import { motion } from "framer-motion";

export default function GalleryLoading() {
  return (
    <div className="fixed inset-0 bg-[#fffcfa]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center">
      {/* Dynamic heartbeat loader for premium feel */}
      <motion.div
        className="w-16 h-16 mb-8 rounded-full border-4 border-rose-200 border-t-rose-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating elegant text */}
      <motion.h2
        className="text-2xl md:text-3xl font-script text-[#234E70] drop-shadow-sm text-center px-4"
        animate={{ opacity: [0.4, 1, 0.4], y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        membukaa foto-fotoo orangg tercantikkkkk.......
      </motion.h2>
    </div>
  );
}
