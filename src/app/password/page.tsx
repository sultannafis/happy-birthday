"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Unlock, Loader2 } from "lucide-react";
import Cloud from "@/components/ui/Cloud";

export default function PasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        // Play success animation then redirect
        setTimeout(() => {
          router.push("/transition"); // Next stage (Tahap 4)
        }, 1200);
      } else {
        setError(data.message || "password salah!");
        triggerShake();
      }
    } catch (err) {
      setError("terjadi kesalahan jaringan");
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // Shake duration is 500ms
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-100 to-white">
      {/* Background Clouds */}
      <Cloud className="top-[15%] left-[-10%]" delay={0} duration={25} width={150} opacity={0.6} />
      <Cloud className="top-[45%] left-[-20%]" delay={15} duration={35} width={200} opacity={0.4} />
      <Cloud className="top-[25%] left-[80%]" delay={5} duration={30} width={120} opacity={0.7} />
      <Cloud className="bottom-[10%] left-[60%]" delay={8} duration={20} width={100} opacity={0.6} />

      <motion.div
        className="card-premium relative z-10 w-full max-w-sm p-8 text-center shadow-soft"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={false}
            animate={{ 
              scale: isSuccess ? [1, 1.2, 1] : 1,
              rotate: isSuccess ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-full ${isSuccess ? 'bg-pink-100/50' : 'bg-sky-100/50'}`}
          >
            {isSuccess ? (
              <Unlock className="w-10 h-10 text-pink-400" />
            ) : (
              <Lock className="w-10 h-10 text-[#87ceeb]" />
            )}
          </motion.div>
        </div>

        <h1 className="font-sans font-bold text-2xl mb-2 text-[#234E70]">
          area rahasia hihi
        </h1>
        <p className="text-sm text-[#234E70]/80 mb-6 font-medium">
          masukkan kata sandi untuk lanjut
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, -5, 5, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="password"
              placeholder="Ketik rahasianya..."
              value={password}
              onChange={(e) => {
                 setPassword(e.target.value);
                 if(error) setError(""); // Clear error on typing
              }}
              className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 transition-all outline-none text-center font-medium text-[#234E70] backdrop-blur-sm
                ${error ? 'border-red-300 focus:border-red-400' : 'border-sky-100 focus:border-[#87ceeb]'}`}
              disabled={isLoading || isSuccess}
            />
          </motion.div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs font-semibold -mt-2"
            >
              {error}
            </motion.p>
          )}

          <motion.button
             type="submit"
             disabled={isLoading || !password || isSuccess}
             className="w-full py-3 px-6 rounded-xl bg-[#234E70] text-white font-semibold text-lg shadow-md transition-all flex items-center justify-center gap-2 hover:bg-[#1a3a54] active:scale-95 disabled:opacity-70 disabled:active:scale-100"
             whileHover={(!isLoading && !isSuccess) ? { scale: 1.02 } : {}}
             whileTap={(!isLoading && !isSuccess) ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSuccess ? (
              "yeyyyy, benerrr hihihi! ✨"
            ) : (
              "masuk"
            )}
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}
