"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import Cloud from "@/components/ui/Cloud";

export default function Home() {
  const router = useRouter();

  const handleOpenGift = () => {
    // Hapus session lama jika user mulai ulang dari awal halaman utama
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/password");
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-100 to-white">
      {/* Background Clouds */}
      <Cloud className="top-[10%] left-[-10%]" delay={0} duration={25} width={150} opacity={0.6} />
      <Cloud className="top-[25%] left-[-20%]" delay={10} duration={35} width={200} opacity={0.4} />
      <Cloud className="top-[15%] left-[60%]" delay={5} duration={30} width={120} opacity={0.7} />
      <Cloud className="top-[40%] left-[80%]" delay={15} duration={40} width={180} opacity={0.5} />
      <Cloud className="bottom-[20%] left-[-5%]" delay={8} duration={20} width={100} opacity={0.6} />

      {/* Main Content */}
      <motion.div 
        className="card-premium relative z-10 max-w-sm w-full p-8 text-center flex flex-col items-center shadow-soft"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
        >
          <Gift className="w-16 h-16 mb-4 text-[#87ceeb] drop-shadow-sm" strokeWidth={1.5} />
        </motion.div>

        <h1 className="font-script text-gradient text-4xl sm:text-5xl mb-3 pb-2 leading-relaxed break-words px-2 sm:px-0">
          happyy birthdayyy sayanggggkuuuu
        </h1>
        
        <p className="text-[#234E70] text-sm mb-8 font-medium">
          akuuu punyaaa sesuatu nihh buat kamu hihihi
        </p>

        <motion.button
          onClick={handleOpenGift}
          className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#87ceeb] to-[#ffd6e7] text-[#234E70] font-semibold text-lg shadow-md transition-all flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          buka hadiahnya
        </motion.button>
      </motion.div>
    </main>
  );
}