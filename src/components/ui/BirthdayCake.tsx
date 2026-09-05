"use client";

import { motion } from "framer-motion";

export default function BirthdayCake() {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
      
      {/* Main SVG Container */}
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        style={{ filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.25))" }}
      >
        <defs>
          <linearGradient id="tierShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.08" />
            <stop offset="25%" stopColor="#000" stopOpacity="0" />
            <stop offset="65%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="plateGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. PLATE */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
        >
          {/* Subtle Glow beneath the plate */}
          <ellipse cx="100" cy="184" rx="100" ry="25" fill="url(#plateGlow)" />
          
          <ellipse cx="100" cy="188" rx="70" ry="12" fill="#64748B" opacity="0.6"/>
          <ellipse cx="100" cy="180" rx="90" ry="16" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
          <ellipse cx="100" cy="183" rx="86" ry="14" fill="#FFFFFF" />
          <path d="M 12 180 Q 100 200 188 180 A 90 16 0 0 1 12 180 Z" fill="#E2E8F0" opacity="0.5" />
        </motion.g>

        {/* 2. TIER 1 (BOTTOM) */}
        <motion.g
          initial={{ opacity: 0, y: -120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", bounce: 0.4 }}
        >
          {/* Shadow from Tier 1 onto the Plate */}
          <ellipse cx="100" cy="180" rx="75" ry="11" fill="#000" opacity="0.15" />

          {/* Mint Base */}
          <path d="M 30 140 L 30 180 A 70 10 0 0 0 170 180 L 170 140 A 70 10 0 0 1 30 140 Z" fill="#D1FAE5" />
          <ellipse cx="100" cy="140" rx="70" ry="10" fill="#A7F3D0" />
          <path d="M 30 140 L 30 180 A 70 10 0 0 0 170 180 L 170 140 A 70 10 0 0 1 30 140 Z" fill="url(#tierShadow)" />
          
          {/* Delicate Wavy Border at bottom */}
          <path d="M 30 165 A 70 10 0 0 0 170 165" fill="none" stroke="#6EE7B7" strokeWidth="2.5" strokeDasharray="3,6" opacity="0.7" strokeLinecap="round" />
          
          {/* Blue Frosting */}
          <path d="M 30 140 
                   Q 33 150 36 142 
                   Q 43 162 48 141 
                   Q 55 149 60 142 
                   Q 72 165 80 143 
                   Q 90 152 100 144 
                   Q 115 168 125 145 
                   Q 135 156 145 144 
                   Q 155 160 162 143 
                   Q 166 148 170 140 
                   A 70 10 0 0 1 30 140 Z" fill="#38BDF8" />
          {/* Frosting Highlight */}
          <path d="M 32 140 Q 36 140 40 142 Z" fill="#FFF" opacity="0.5" />
          <ellipse cx="100" cy="140" rx="65" ry="8" fill="#7DD3FC" opacity="0.4" />
        </motion.g>

        {/* 3. TIER 2 (MIDDLE) */}
        <motion.g
          initial={{ opacity: 0, y: -160 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, type: "spring", bounce: 0.5 }}
        >
          {/* Shadow from Tier 2 onto Tier 1 */}
          <ellipse cx="100" cy="140" rx="58" ry="9" fill="#000" opacity="0.1" />

          {/* Yellow Base */}
          <path d="M 45 100 L 45 140 A 55 8 0 0 0 155 140 L 155 100 A 55 8 0 0 1 45 100 Z" fill="#FEF08A" />
          <ellipse cx="100" cy="100" rx="55" ry="8" fill="#FDE047" />
          <path d="M 45 100 L 45 140 A 55 8 0 0 0 155 140 L 155 100 A 55 8 0 0 1 45 100 Z" fill="url(#tierShadow)" />

          {/* Velvet Ribbon */}
          <path d="M 45 125 A 55 8 0 0 0 155 125 L 155 119 A 55 8 0 0 1 45 119 Z" fill="#FCA5A5" />
          {/* Shiny Ribbon Center */}
          <path d="M 45 122 A 55 8 0 0 0 155 122" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.4" />

          {/* Golden Sprinkles embedded in Yellow Layer */}
          <circle cx="60" cy="115" r="1.5" fill="#EAB308" />
          <circle cx="120" cy="130" r="1.5" fill="#EAB308" />
          <circle cx="140" cy="122" r="1.5" fill="#EAB308" />

          {/* Vanilla Frosting */}
          <path d="M 45 100 
                   Q 50 112 55 102 
                   Q 65 118 75 102 
                   Q 85 114 95 103 
                   Q 110 120 125 103 
                   Q 135 115 145 102 
                   Q 150 108 155 100 
                   A 55 8 0 0 1 45 100 Z" fill="#FFFFFF" />
          <path d="M 45 100 Q 50 112 55 102 Q 65 118 75 102 Q 85 114 95 103 Q 110 120 125 103 Q 135 115 145 102 Q 150 108 155 100 A 55 8 0 0 1 45 100 Z" fill="url(#tierShadow)" opacity="0.5"/>
          
          <ellipse cx="100" cy="100" rx="50" ry="6" fill="#F8FAFC" opacity="0.7" />
        </motion.g>

        {/* 4. TIER 3 (TOP) */}
        <motion.g
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, type: "spring", bounce: 0.6 }}
        >
          {/* Shadow from Tier 3 onto Tier 2 */}
          <ellipse cx="100" cy="100" rx="43" ry="7" fill="#000" opacity="0.1" />

          {/* White Vanilla Base */}
          <path d="M 60 65 L 60 100 A 40 6 0 0 0 140 100 L 140 65 A 40 6 0 0 1 60 65 Z" fill="#F8FAFC" />
          <ellipse cx="100" cy="65" rx="40" ry="6" fill="#F1F5F9" />
          <path d="M 60 65 L 60 100 A 40 6 0 0 0 140 100 L 140 65 A 40 6 0 0 1 60 65 Z" fill="url(#tierShadow)" />

          {/* Premium Pearl Border */}
          {[...Array(13)].map((_, i) => (
            <g key={`p-${i}`} transform={`translate(${63 + i * 6.2}, ${100 + Math.sin(i / 12 * Math.PI) * 5.2})`}>
              <circle cx="0" cy="0" r="2.8" fill="#FFF" />
              <circle cx="-0.5" cy="-0.5" r="1.5" fill="#E2E8F0" />
            </g>
          ))}

          {/* Lavender Frosting */}
          <path d="M 60 65 
                   Q 66 76 72 66 
                   Q 82 82 92 66 
                   Q 102 78 112 66 
                   Q 122 80 132 66 
                   Q 136 72 140 65 
                   A 40 6 0 0 1 60 65 Z" fill="#C4B5FD" />
          
          <path d="M 60 65 Q 66 76 72 66 Q 82 82 92 66 Q 102 78 112 66 Q 122 80 132 66 Q 136 72 140 65 A 40 6 0 0 1 60 65 Z" fill="url(#tierShadow)" opacity="0.6"/>

          {/* Color Sprinkles */}
          <rect x="75" y="67" width="2" height="6" fill="#FDE047" transform="rotate(45 75 67)" rx="1"/>
          <rect x="85" y="66" width="2" height="5" fill="#38BDF8" transform="rotate(-30 85 66)" rx="1"/>
          <rect x="100" y="69" width="3" height="6" fill="#FCA5A5" transform="rotate(75 100 69)" rx="1"/>
          <rect x="115" y="68" width="2" height="5" fill="#A7F3D0" transform="rotate(15 115 68)" rx="1"/>
          <rect x="125" y="66" width="2" height="4" fill="#FDE047" transform="rotate(-60 125 66)" rx="1"/>
        </motion.g>

        {/* 5. CANDLES (NUMBER 18) */}
        <motion.g
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, type: "spring", bounce: 0.6 }}
        >
          {/* Back Glowing Aura for the candles */}
          <ellipse cx="100" cy="50" rx="35" ry="15" fill="#FDA4AF" opacity="0.2" filter="blur(8px)" />
          
          <g transform="translate(0, -6)">
             {/* Wicks */}
            <line x1="88.5" y1="36" x2="88.5" y2="28" stroke="#334155" strokeWidth="1.5" />
            <line x1="112" y1="34" x2="112" y2="26" stroke="#334155" strokeWidth="1.5" />

            {/* Candle #1 */}
            <path d="M 83 35 L 94 35 L 94 72 L 83 72 Z" fill="#FCA5A5" />
            <path d="M 83 35 L 88 35 L 88 72 L 83 72 Z" fill="#FFF" opacity="0.3" /> 
            <path d="M 91 35 L 94 35 L 94 72 L 91 72 Z" fill="#E11D48" opacity="0.2" />
            <path d="M 83 35 L 94 35 L 83 48 Z" fill="#FCA5A5" />
            <path d="M 80 72 L 97 72 L 97 75 L 80 75 Z" fill="#F9A8D4" />
            
            {/* Candy Cane Stripes for 1 */}
            <path d="M 83 40 L 94 36 M 83 50 L 94 46 M 83 60 L 94 56 M 83 70 L 94 66" stroke="#FFF" strokeWidth="2.5" opacity="0.8"/>
            <path d="M 83 45 L 94 41 M 83 55 L 94 51 M 83 65 L 94 61" stroke="#E11D48" strokeWidth="2" opacity="0.5"/>

            {/* Candle #8 */}
            {/* Outer rings */}
            <circle cx="112" cy="44" r="10.5" fill="none" stroke="#FCA5A5" strokeWidth="7.5" />
            <circle cx="112" cy="62" r="11.5" fill="none" stroke="#FCA5A5" strokeWidth="7.5" />
            
            {/* Gloss/Shadow for 8 */}
            <path d="M 120 44 A 8 8 0 0 1 112 52 A 8 8 0 0 1 120 62" fill="none" stroke="#E11D48" strokeWidth="2" opacity="0.3" />
            <path d="M 104 44 A 8 8 0 0 0 112 36 A 8 8 0 0 0 104 62" fill="none" stroke="#FFF" strokeWidth="2.5" opacity="0.6" />
            
            {/* Center Join */}
            <circle cx="112" cy="53" r="5" fill="#FCA5A5" />
            <circle cx="111" cy="52" r="2" fill="#FFF" opacity="0.8" />
          </g>
        </motion.g>

        {/* 6. AESTHETIC SPARKLES */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {/* Sparkle Left */}
          <motion.path 
             d="M 30 90 L 34 89 L 35 85 L 36 89 L 40 90 L 36 91 L 35 95 L 34 91 Z" 
             fill="#FDE047"
             animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Sparkle Right */}
          <motion.path 
             d="M 160 110 L 164 109 L 165 105 L 166 109 L 170 110 L 166 111 L 165 115 L 164 111 Z" 
             fill="#6EE7B7"
             animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
             transition={{ duration: 1.8, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      </svg>

      {/* 7. ANIMATED FLAMES (Ignite after candles) */}
      <motion.div
        className="absolute w-4 h-6 bg-orange-300 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_20px_#f59e0b,0_0_35px_#ef4444,0_0_50px_#fca5a5]"
        style={{ top: "2%", left: "42%" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: [1, 1.3, 0.9, 1.25, 1],
          rotate: [-4, 4, -2, 5, -3],
        }}
        transition={{
          opacity: { delay: 1.8, duration: 0.2 },
          scale: { delay: 1.8, duration: 1.2, repeat: Infinity, repeatType: "mirror" },
          rotate: { delay: 1.8, duration: 1.5, repeat: Infinity, repeatType: "mirror" }
        }}
      />

      <motion.div
        className="absolute w-4 h-6 bg-orange-300 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_20px_#f59e0b,0_0_35px_#ef4444,0_0_50px_#fca5a5]"
        style={{ top: "1%", left: "54%" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: [1, 1.2, 0.95, 1.3, 1],
          rotate: [2, -3, 5, -2, 2],
        }}
        transition={{
          opacity: { delay: 1.9, duration: 0.2 },
          scale: { delay: 1.9, duration: 1.4, repeat: Infinity, repeatType: "mirror" },
          rotate: { delay: 1.9, duration: 1.3, repeat: Infinity, repeatType: "mirror" }
        }}
      />
    </div>
  );
}
