"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Envelope from "@/components/ui/Envelope";

export default function EnvelopePage() {
  const router = useRouter();
  const [showLetter, setShowLetter] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Prefetch next page for performance optimization
  useEffect(() => {
    router.prefetch("/gallery");
  }, [router]);

  const handleOpen = () => {
    setShowLetter(true);
  };

  const handleNext = () => {
    router.push("/gallery"); // Tahap 6
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#ffecf2] overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffb7b2 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>
      
      <AnimatePresence>
        {!showLetter ? (
          <motion.div
             key="envelope-container"
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={isMobile ? { y: "100vh", opacity: 0 } : { scale: 1.5, opacity: 0 }}
             transition={{ duration: 0.8 }}
             className="z-10"
          >
            <Envelope onOpen={handleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="letter-container"
            className="z-20 w-full max-w-2xl bg-[#fffcfa] rounded-sm shadow-2xl relative overflow-hidden flex flex-col min-h-[60vh] sm:min-h-[70vh]"
            initial={{ y: "100vh", opacity: 0, rotate: -2 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
            style={{ 
               backgroundImage: "linear-gradient(90deg, transparent 40px, rgba(255, 150, 150, 0.4) 40px, rgba(255, 150, 150, 0.4) 42px, transparent 42px), repeating-linear-gradient(transparent, transparent 31px, #e5e5e5 31px, #e5e5e5 32px)",
               backgroundPositionY: "0px, 40px"
            }}
          >
            {/* Letter Content */}
            <div className="font-handwriting text-[#2c3e50] text-xl sm:text-2xl leading-[32px] pt-[45px] pb-12 pl-[56px] pr-4 sm:pl-[70px] sm:pr-10 text-left w-full h-full" style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.02)' }}>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mb-[32px]"
              >
                haiiii sayangggkuuuu,
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mb-[32px]"
              >
                happyy birthdayy yaa cantikk! jujur akuu bingung mau ngasih kado apa yang bener-bener spesial buat kamu. jadi karena aku suka bikin-bikin website, aku bikin hadiah kecil ini khusus buat kamuuu hihihi.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="mb-[32px]"
              >
                semogaa di usia yang baru ini, kamuu semakin bahagiaaa, sehatttt selaluuu, rezekinyaaa lancarrr, tambahhh pinterrr, makinnnn cantikkkkk, dan semua yang kamu impiakan dan harapkan bisa segera terwujud aamiin. terimaaa kasihhh yaaa sayanggg udah selalu adaa dan jadi bagian cerita yang indah di hidup akuuuu.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 2.4, duration: 0.8 }}
                className="mb-[32px]"
              >
                maaffff yaa sayangg kalau cuma sederhanaa, tapi percayaaa dehh ini dibikin pake hatiiii. jangannnn lupa senyummm yaa karenaa senyuman kamuu sangattt indahhh! i loveeeee youuu sayanggkuuuuu.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 3.0, duration: 1 }}
                className="text-right pr-4"
              >
                fromm mee,<br/>
                <span className="font-script text-3xl text-pink-500 mt-2 block rotate-[-2deg] mr-2">yourr boyfrienddd hihihi</span>
              </motion.p>
            </div>

            <motion.div 
               className="mt-12 flex justify-center"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 3.8 }}
            >
              <button
                onClick={handleNext}
                className="py-3 px-8 rounded-full bg-pink-400 text-white font-medium shadow-md hover:bg-pink-500 hover:shadow-lg transition-all active:scale-95 flex gap-2 items-center"
              >
                lanjut bukaaa kadonyaaa 📸
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
