"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import Cloud from "@/components/ui/Cloud";
import Balloon from "@/components/ui/Balloon";
import Flower from "@/components/ui/Flower";
import BirthdayCake from "@/components/ui/BirthdayCake";
import CalendarReveal from "@/components/ui/CalendarReveal";

export default function TransitionPage() {
  const router = useRouter();
  const [stage, setStage] = useState<'calendar' | 'cake'>('calendar');
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    // Stage 1 -> Stage 2 (Ganti dari Kalender ke Kue pada detik ke-5)
    const stageTimer = setTimeout(() => {
      setStage('cake');
    }, 5500);

    // Confetti saat kue ulang tahun muncul (sekitar detik ke 7.5)
    const confettiTimer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#f472b6"],
        disableForReducedMotion: true,
        zIndex: 50,
      });
      // Ledakan kedua sedikit delay biar meriah
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6, x: 0.3 },
          colors: ["#ffffff", "#FF9AA2", "#FFDAC1"],
          disableForReducedMotion: true,
          zIndex: 50,
        });
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6, x: 0.7 },
          colors: ["#ffffff", "#f472b6", "#E2F0CB"],
          disableForReducedMotion: true,
          zIndex: 50,
        });
      }, 300);
    }, 7500);

    // Show the "Lanjut" button
    const nextBtnTimer = setTimeout(() => {
      setShowNextButton(true);
    }, 11000);

    return () => {
      clearTimeout(stageTimer);
      clearTimeout(confettiTimer);
      clearTimeout(nextBtnTimer);
    };
  }, []);

  const handleNext = () => {
    router.push("/envelope"); // Lanjut ke Tahap 5
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-t from-sky-200 via-sky-400 to-[#87ceeb]">
      {/* Clouds - Parallax Effect */}
      <Cloud className="top-[5%]" delay={0} duration={40} width={250} opacity={0.6} />
      <Cloud className="top-[20%]" delay={15} duration={50} width={300} opacity={0.4} />
      <Cloud className="top-[45%]" delay={5} duration={35} width={180} opacity={0.7} />
      <Cloud className="bottom-[30%]" delay={25} duration={45} width={220} opacity={0.5} />
      <Cloud className="bottom-[10%]" delay={10} duration={30} width={150} opacity={0.8} />

      {/* Balloons Flying Up */}
      <Balloon left="15%" delay={1} duration={25} color="#FF9AA2" />
      <Balloon left="35%" delay={8} duration={20} color="#FFB7B2" />
      <Balloon left="60%" delay={3} duration={28} color="#FFDAC1" />
      <Balloon left="80%" delay={12} duration={22} color="#E2F0CB" />
      
      <Balloon left="25%" delay={16} duration={18} color="#B5EAD7" className="scale-75" />
      <Balloon left="75%" delay={5} duration={24} color="#C7CEEA" className="scale-90" />

      {/* Flowers Falling/Blooming */}
      <Flower left="20%" delay={2} duration={12} size={30} />
      <Flower left="40%" delay={7} duration={15} size={25} />
      <Flower left="65%" delay={0} duration={10} size={40} />
      <Flower left="85%" delay={5} duration={14} size={20} />
      
      <Flower left="10%" delay={10} duration={18} size={35} />
      <Flower left="55%" delay={12} duration={11} size={25} />
      <Flower left="90%" delay={15} duration={17} size={30} />

      {/* Main Content Area (Calendar & Cake) */}
      <AnimatePresence mode="wait">
        {stage === 'calendar' ? (
          <motion.div 
            key="calendar" 
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            transition={{ duration: 0.8 }} 
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <CalendarReveal />
          </motion.div>
        ) : (
          <motion.div 
            key="cake" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }} 
            className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none gap-6"
          >
            <BirthdayCake />
            <motion.h1 
              className="font-script text-white text-5xl md:text-7xl text-center drop-shadow-md leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut", delay: 1 }}
            >
              happyy birthdayyy<br/>sayanggggkuu
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      <motion.div 
        className="absolute bottom-12 left-0 right-0 flex justify-center z-40"
        initial={{ opacity: 0, y: 30 }}
        animate={showNextButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1 }}
      >
        <button
          onClick={handleNext}
          className="py-3 px-8 rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white font-semibold text-lg hover:bg-white/30 hover:scale-105 active:scale-95 transition-all shadow-lg"
          style={{ pointerEvents: showNextButton ? 'auto' : 'none' }}
        >
          lanjuttt ke hadiahh 💌
        </button>
      </motion.div>
    </main>
  );
}
