"use client";

import { motion } from "framer-motion";

export default function BirthdayCake() {
  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
      {/* Container to drop down the cake softly */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 1.5 }}
        className="relative"
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xl"
        >
          {/* Plate */}
          <ellipse cx="100" cy="180" rx="80" ry="15" fill="#E2E8F0" />
          <ellipse cx="100" cy="182" rx="78" ry="13" fill="#CBD5E1" />

          {/* Bottom Cake Tier */}
          <path d="M 30 180 L 30 130 C 30 130 100 150 170 130 L 170 180 C 170 180 100 200 30 180 Z" fill="#FDE68A" />
          {/* Bottom Tier Frosting */}
          <path d="M 30 130 C 30 130 100 150 170 130 C 160 145 150 145 140 135 C 130 148 120 148 110 137 C 100 150 90 150 80 138 C 70 148 60 148 50 137 C 40 145 30 130 30 130 Z" fill="#F472B6" />

          {/* Top Cake Tier */}
          <path d="M 50 135 L 50 90 C 50 90 100 105 150 90 L 150 135 C 150 135 100 150 50 135 Z" fill="#FEF3C7" />
          {/* Top Tier Frosting */}
          <path d="M 50 90 C 50 90 100 105 150 90 C 140 100 130 100 125 93 C 115 102 105 102 100 93 C 90 105 80 105 75 94 C 65 102 55 100 50 90 Z" fill="#60A5FA" />

          {/* Candles */}
          <g transform="translate(70, 60)">
            {/* Left Candle */}
            <rect x="0" y="0" width="8" height="35" rx="2" fill="#FCA5A5" />
            <rect x="0" y="5" width="8" height="5" fill="#EF4444" />
            <rect x="0" y="15" width="8" height="5" fill="#EF4444" />
            <rect x="0" y="25" width="8" height="5" fill="#EF4444" />
            <line x1="4" y1="0" x2="4" y2="-5" stroke="#475569" strokeWidth="2" />
          </g>

          <g transform="translate(100, 50)">
            {/* Center Candle */}
            <rect x="0" y="0" width="8" height="42" rx="2" fill="#FCA5A5" />
            <rect x="0" y="6" width="8" height="6" fill="#EF4444" />
            <rect x="0" y="18" width="8" height="6" fill="#EF4444" />
            <rect x="0" y="30" width="8" height="6" fill="#EF4444" />
            <line x1="4" y1="0" x2="4" y2="-5" stroke="#475569" strokeWidth="2" />
          </g>

          <g transform="translate(130, 60)">
            {/* Right Candle */}
            <rect x="-8" y="0" width="8" height="35" rx="2" fill="#FCA5A5" />
            <rect x="-8" y="5" width="8" height="5" fill="#EF4444" />
            <rect x="-8" y="15" width="8" height="5" fill="#EF4444" />
            <rect x="-8" y="25" width="8" height="5" fill="#EF4444" />
            <line x1="-4" y1="0" x2="-4" y2="-5" stroke="#475569" strokeWidth="2" />
          </g>
        </svg>

        {/* Animated Flames using framer-motion wrapping div overlays */}
        {/* Left Flame */}
        <motion.div
          className="absolute w-3 h-4 bg-orange-400 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_10px_#f59e0b,0_0_20px_#ef4444]"
          style={{ top: "27%", left: "37%" }}
          animate={{
            scale: [1, 1.2, 0.9, 1.1, 1],
            rotate: [-2, 2, -1, 3, -2],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />

        {/* Center Flame */}
        <motion.div
          className="absolute w-3 h-5 bg-orange-400 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_12px_#f59e0b,0_0_25px_#ef4444]"
          style={{ top: "22%", left: "51.5%" }}
          animate={{
            scale: [1, 1.15, 0.95, 1.2, 1],
            rotate: [1, -2, 3, -1, 1],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.2, // Phase offset
          }}
        />

        {/* Right Flame */}
        <motion.div
          className="absolute w-3 h-4 bg-orange-400 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_10px_#f59e0b,0_0_20px_#ef4444]"
          style={{ top: "27%", left: "62.5%" }}
          animate={{
            scale: [1, 1.2, 0.85, 1.15, 1],
            rotate: [-3, 1, -2, 2, -3],
          }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    </div>
  );
}
