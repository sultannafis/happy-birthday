'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Star, Send, RefreshCw, Heart } from 'lucide-react';
import dynamic from 'next/dynamic';
import { SadSticker, NeutralSticker, HappySticker } from '@/components/ui/AnimatedStickers';

// Lazy load confetti
const Confetti = dynamic(() => import('@/components/ui/Confetti'), { ssr: false });

export default function ReplyPage() {
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<{ q: string, a: string }[]>([]);

  // Post-Reply States
  const [isFinished, setIsFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReplayButton, setShowReplayButton] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('birthday_answers');
    if (stored) {
      setAnswers(JSON.parse(stored));
    }
  }, []);

  // Finishing sequence effect
  useEffect(() => {
    if (!isFinished) return;

    // Once finished, instantly trigger confetti
    setShowConfetti(true);

    // Show replay button shortly after
    const timer = setTimeout(() => {
      setShowReplayButton(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isFinished]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert('Pilih rating bintang dulu ya!');

    try {
      const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "6289654557984";

      // Susun pesan untuk dikirim ke WhatsApp
      let text = `halo sayangkuuu! aku udah isi balasannya nih:\n\n`;
      text += `*🌟 rating kebahagiaan:* ${rating} dari 5 bintang\n\n`;
      text += `*📝 jawaban pertanyaan:*\n`;

      if (answers && Array.isArray(answers)) {
        answers.forEach((ans, index) => {
          text += `${index + 1}. ${ans.q} : *${ans.a}*\n`;
        });
      }

      text += `\n*💭 Pesan Spesial:*\n"${message}"\n\n`;
      text += `terimaaa kasih yaaaa sayangg`;

      const encodedText = encodeURIComponent(text);
      const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

      // Buka link WA secara langsung (synchronous) untuk menghindari delay atau popup blocker
      window.location.href = waUrl;

      // Setelah redirect jalan, kita tampilkan layar penutup
      // Timer ditambahkan karena `window.location.href` ke "wa.me" (app eksternal)
      // biasanya membuat browser tetap di halaman ini secara visual,
      // sehingga pengguna tetap bisa melihat halaman penutup ini.
      setTimeout(() => {
        setIsFinished(true);
      }, 500);

    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat memproses balasan.');
    }
  };

  const currentRating = hoverRating || rating;
  let StickerComponent = null;
  let ratingText = "pilih rating kebahagiaannn kamuuuu!";

  if (currentRating > 0) {
    if (currentRating <= 2) {
      StickerComponent = SadSticker;
      ratingText = "yahhhh, akuuu bikin kamuuu sedihhh yaaaa? 😢";
    } else if (currentRating === 3) {
      StickerComponent = NeutralSticker;
      ratingText = "lumayannnn, tapi bisa lebih baik lagiii! 😌";
    } else {
      StickerComponent = HappySticker;
      ratingText = currentRating === 5 ? "happyyy bangettt!!! 🥰" : "senengggggg! 😍";
    }
  }

  // Jika sudah submit, render tampilan terima kasih akhir
  if (isFinished) {
    return (
      <main className="min-h-[100dvh] bg-gradient-to-b from-sky-200 via-pink-100 to-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <motion.div animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/4 left-10 text-pink-400 blur-sm">
            <Heart size={64} />
          </motion.div>
          <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-1/4 right-10 text-amber-300 blur-[2px]">
            <Star size={48} />
          </motion.div>
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-full flex flex-col items-center justify-center text-center px-4 relative z-10"
          >
            <HappySticker />
            <h2 className="text-4xl md:text-5xl font-script text-[#234E70] font-bold mt-6 mb-4 drop-shadow-sm">
              untuk kamu, sayangggg 💙
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-md font-handwriting leading-relaxed mb-10">
              terima kasih sudah meluangkan waktu membuka hadiah kecil ini. semoga setiap senyum yang kamu berikan hari ini menjadi kenangan yang tidak akan pernah kita lupakannnn hihihi.
            </p>
          </motion.div>

          <AnimatePresence>
            {showReplayButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="z-20 flex flex-col items-center gap-4"
              >
                <button
                  onClick={() => window.location.href = '/'}
                  className="group relative px-8 py-4 bg-white/70 backdrop-blur-md rounded-full border border-pink-200 text-pink-600 font-semibold tracking-wide hover:bg-white hover:border-pink-400 flex items-center gap-3 shadow-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-100/0 via-pink-100/50 to-pink-100/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500 text-pink-500" />
                  ✨ liatt kenangannn sekali lagiiii
                </button>
                <p className="text-sm font-medium text-slate-400 mt-2">dibuat dengan penuh cintaaa dari akuuuu hihihi</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showConfetti && <Confetti />}
      </main>
    );
  }

  // Tampilan Default (Form Rating & Pesan)
  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-pink-50 via-white to-sky-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-pink-100/50 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-pink-100 p-6 md:p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-script text-slate-800 drop-shadow-sm mb-2">kasihh rating duluuu yaaa!</h1>
          <p className="text-slate-500 text-sm">sejauhhh manaaa hadiahhh ini bikin kamuuu senengggg?</p>
        </div>

        {/* Sticker Area */}
        <div className="h-32 flex items-center justify-center mb-4 transition-all duration-300">
          <AnimatePresence mode="wait">
            {StickerComponent ? (
              <motion.div
                key={currentRating > 3 ? 'happy' : currentRating > 2 ? 'neutral' : 'sad'}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <StickerComponent />
              </motion.div>
            ) : (
              <div className="text-4xl opacity-50 animate-bounce">🤔</div>
            )}
          </AnimatePresence>
        </div>

        {/* Rating Text */}
        <p className="text-center font-handwriting text-xl text-pink-500 mb-4 min-h-[3rem] sm:min-h-[2rem] transition-all duration-300">
          {ratingText}
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-10" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transform transition-transform hover:scale-110 active:scale-95"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
            >
              <Star
                className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-200 ${star <= (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-500 drop-shadow-[0_2px_10px_rgba(250,204,21,0.4)]'
                    : 'fill-transparent text-slate-300'
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-600">ada pesan tambahan buat akuuu?</label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="ketik balasan kamuuu di siniiii..."
              className="w-full resize-none rounded-xl border border-pink-200 bg-pink-50/50 p-4 text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="group relative w-full flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-pink-500 px-6 py-4 font-semibold text-white shadow-lg transition-all hover:bg-pink-600 hover:shadow-pink-300/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative">{isSubmitting ? 'Memproses...' : 'kirim balasan ke waa akuu'}</span>
            {!isSubmitting && <Send className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
