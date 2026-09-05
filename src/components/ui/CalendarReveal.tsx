"use client";

import { motion } from "framer-motion";

export default function CalendarReveal() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const startDayOffset = 2; // misal tanggal 1 mulai di hari Selasa (0=Minggu, 1=Senin, 2=Selasa)

  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 z-30 relative w-full px-4 h-full">
      
      {/* Dekorasi Awan/Bintang melayang di sekitar kalender */}
      <motion.div 
        className="absolute top-10 left-6 sm:left-10 text-white/50 text-3xl sm:text-4xl"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ✨
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-6 sm:right-10 text-white/50 text-2xl sm:text-3xl"
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        ☁️
      </motion.div>

      {/* Teks Romantis */}
      <motion.h2 
        className="font-script text-white text-3xl sm:text-5xl md:text-6xl text-center drop-shadow-xl leading-relaxed mt-4 sm:mt-10 max-w-[90vw]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        Hari lahirnya bidadari ke dunia 🤍
      </motion.h2>

      {/* Kalender Premium */}
      <motion.div 
        className="relative bg-[#fafaf9] rounded-2xl p-4 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border-2 border-white/80 w-full max-w-[95%] sm:max-w-sm mb-8"
        style={{
          // Paper texture subtle
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")"
        }}
        initial={{ opacity: 0, y: 50, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 1.5, delay: 0.5, type: "spring", bounce: 0.5 }}
      >
        {/* Washi Tape */}
        <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-8 sm:h-10 bg-white/40 backdrop-blur-md shadow-sm border border-white/30 rotate-2 z-20" />
        
        {/* Folded Corner Bottom Right */}
        <div 
          className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-tl-xl shadow-[-4px_-4px_10px_rgba(0,0,0,0.1)] z-10 origin-bottom-right"
          style={{ background: "linear-gradient(225deg, transparent 50%, #f0fdfa 50%)" }}
        />

        {/* Header Bulan */}
        <div className="text-center mt-2 mb-4 sm:mb-6 relative">
          <div className="inline-block bg-sky-200/80 px-6 py-1.5 sm:px-8 sm:py-2 rounded-xl shadow-inner border border-sky-300 backdrop-blur-sm transform -rotate-1">
            <h3 className="text-lg sm:text-2xl font-black text-sky-700 tracking-[0.2em] uppercase drop-shadow-sm">September</h3>
          </div>
        </div>

        {/* Header Hari */}
        <div className="grid grid-cols-7 gap-y-3 sm:gap-y-4 gap-x-1 sm:gap-x-2 text-center text-[0.65rem] sm:text-[0.75rem] font-black text-slate-400 mb-2 uppercase tracking-tight sm:tracking-widest">
          <div className="text-rose-400">Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div className="text-rose-400">Sa</div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-200 mb-3 sm:mb-4 rounded-full" />

        {/* Tanggal */}
        <div className="grid grid-cols-7 gap-y-2 sm:gap-y-3 gap-x-1 sm:gap-x-2 text-center text-xs sm:text-sm font-bold text-slate-600">
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {days.map(day => {
            const isBirthday = day === 11;
            // Highlight index for styling (0 = Sunday, 6 = Saturday)
            const dayOfWeek = (day + startDayOffset - 1) % 7;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
              <div key={day} className="relative flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 mx-auto">
                {isBirthday ? (
                  <>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center text-sky-400"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.4, 1.1], opacity: 1, rotate: [0, -10, 0] }}
                      transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-lg">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </motion.div>
                    <motion.span 
                      className="relative z-10 font-black text-lg sm:text-xl drop-shadow-md"
                      initial={{ color: "#475569" }}
                      animate={{ color: "#0c4a6e" }}
                      transition={{ delay: 2.4, duration: 0.5 }}
                    >
                      {day}
                    </motion.span>
                  </>
                ) : (
                  <span className={`hover:scale-150 hover:-translate-y-1 transition-all duration-300 cursor-default flex items-center justify-center w-full h-full ${isWeekend ? 'text-rose-400' : 'text-slate-600'}`}>
                    {day}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
