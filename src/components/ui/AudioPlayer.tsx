"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";

export default function AudioPlayer() {
  const { isPlaying, togglePlay, showPrompt, isVisible } = useAudio();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <AnimatePresence>
            {showPrompt && !isPlaying && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-white/70 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-[#234E70] shadow-sm hidden sm:block"
              >
                Klik layar untuk mainkan musik 🎵
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            onClick={(e) => {
               e.stopPropagation();
               togglePlay();
            }}
            className="p-3 bg-white/50 backdrop-blur-lg border border-white/40 shadow-soft rounded-full text-[#87ceeb] hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? "Mute music" : "Play music"}
          >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
