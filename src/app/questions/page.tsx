'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { HelpCircle, Heart, Star } from 'lucide-react';
import { HappySticker } from '@/components/ui/AnimatedStickers';

const closingMessages = [
  "happyy birthdayyy sayanggggkuuuu 🎂",
  "semogaaa hariii inii jadi awal dari tahun yang luar biasa buat kamuuuu.",
  "terima kasih sudah jadi bagian terbaik dalam hidup akuuuuu.",
  "i love you more than words can sayyy. 🤍",
];

const QUESTIONS = [
  { text: "kamuuu sayangggg akuu nggaaaa?", expectedAnswer: "iyaaa", evadeType: "teleport" },
  { text: "kamuuu cintaa aku nggaaa?", expectedAnswer: "iyaaa", evadeType: "runaway" },
  { text: "bahagia ngga sama akuuu?", expectedAnswer: "iyaaa", evadeType: "shrink" },
  { text: "akuu ngeselinn nggaaa?", expectedAnswer: "nggaaa", evadeType: "drop" },
  { text: "kamuuu sukaaa ngga sama akuu?", expectedAnswer: "iyaaa", evadeType: "swap" }
];

export default function QuestionsPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ q: string, a: string }[]>([]);

  // Closing sequence states
  const [showClosing, setShowClosing] = useState(true);
  const [currentClosingIndex, setCurrentClosingIndex] = useState(0);

  // States for the evading (wrong) button
  const [wrongPos, setWrongPos] = useState({ x: 0, y: 0 });
  const [wrongScale, setWrongScale] = useState(1);
  const [wrongRotation, setWrongRotation] = useState(0);
  const [isSwapped, setIsSwapped] = useState(false); // for 'swap' evade type

  const [escapeCount, setEscapeCount] = useState(0);
  const [showHappy, setShowHappy] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentQ = QUESTIONS[currentIndex] || QUESTIONS[0];

  const correctLabel = currentQ?.expectedAnswer === "iyaaa" ? "iyaaa!" : "nggaaa";
  const originalWrongLabel = currentQ?.expectedAnswer === "iyaaa" ? "nggaaa" : "iyaaa!";
  const wrongLabel = isSwapped ? correctLabel : originalWrongLabel;

  // Closing sequence timer
  useEffect(() => {
    if (!showClosing) return;
    let timer: NodeJS.Timeout;
    if (currentClosingIndex < closingMessages.length - 1) {
      timer = setTimeout(() => {
        setCurrentClosingIndex((prev) => prev + 1);
      }, 4000);
    } else {
      timer = setTimeout(() => {
        setShowClosing(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showClosing, currentClosingIndex]);

  const handleEvade = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnWidth = 120;
    const btnHeight = 50;

    const maxX = (containerRect.width / 2) - btnWidth;
    const maxY = (containerRect.height / 2) - btnHeight;

    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;
    let targetRotation = 0;

    switch (currentQ.evadeType) {
      case "teleport":
        targetX = (Math.random() * maxX * 2) - maxX;
        targetY = (Math.random() * maxY * 2) - maxY;
        break;
      case "runaway":
        targetX = Math.random() > 0.5 ? maxX : -maxX;
        targetY = Math.random() > 0.5 ? maxY : -maxY;
        break;
      case "shrink":
        targetX = (Math.random() * maxX * 2) - maxX;
        targetY = (Math.random() * maxY * 2) - maxY;
        targetScale = Math.max(0.3, 1 - (escapeCount * 0.15));
        break;
      case "drop":
        targetY = maxY + 200;
        targetX = (Math.random() * 100) - 50;
        targetRotation = (Math.random() * 90) - 45;
        break;
      case "swap":
        targetX = (Math.random() * maxX * 2) - maxX;
        targetY = (Math.random() * maxY * 2) - maxY;
        setIsSwapped(true);
        break;
      default:
        targetX = (Math.random() * maxX * 2) - maxX;
        targetY = (Math.random() * maxY * 2) - maxY;
    }

    setWrongPos({ x: targetX, y: targetY });
    setWrongScale(targetScale);
    setWrongRotation(targetRotation);
    setEscapeCount(prev => prev + 1);
  };

  const handleCorrect = () => {
    setShowHappy(true);
    setTimeout(() => {
      setShowHappy(false);
      proceedToNext(correctLabel);
    }, 1500);
  };

  const handleWrongButClicked = (e: React.MouseEvent | React.TouchEvent) => {
    // If it's not swapped (masquerading as correct), DO NOT let them click it!
    if (!isSwapped) {
      e.preventDefault();
      e.stopPropagation();
      handleEvade();
      return;
    }

    // If it is swapped to look identical to correct button, they win.
    setShowHappy(true);
    setTimeout(() => {
      setShowHappy(false);
      proceedToNext(correctLabel);
    }, 1500);
  };

  const proceedToNext = (givenAnswer: string) => {
    const newAnswers = [...answers, { q: currentQ.text, a: givenAnswer }];

    if (currentIndex < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(prev => prev + 1);
      setWrongPos({ x: 0, y: 0 });
      setWrongScale(1);
      setWrongRotation(0);
      setEscapeCount(0);
      setIsSwapped(false);
    } else {
      sessionStorage.setItem('birthday_answers', JSON.stringify(newAnswers));
      router.push('/reply');
    }
  };

  const yesStyle = "bg-pink-500 text-white shadow-lg border-2 border-pink-400 hover:bg-pink-600 hover:shadow-pink-300/50 hover:shadow-xl";
  const noStyle = "bg-slate-200 text-slate-600 shadow-md border-2 border-slate-300 hover:bg-slate-300";

  const getStyle = (label: string) => {
    return label === "iyaaa!" || label === "iyaaa" ? yesStyle : noStyle;
  };

  if (showClosing) {
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
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div key={currentClosingIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }} className="w-full flex items-center justify-center text-center px-4 absolute">
              <p className="text-3xl md:text-4xl font-serif text-slate-800 leading-snug drop-shadow-sm font-medium">
                {closingMessages[currentClosingIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-gradient-to-b from-sky-50 to-pink-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div
        ref={containerRef}
        className="w-full max-w-2xl h-[60vh] md:h-[50vh] flex flex-col items-center justify-center relative"
      >
        <div className="absolute top-0 text-center w-full">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 font-medium text-sm mb-6 border border-pink-200 shadow-sm">
            pertaniyaaaan {currentIndex + 1} dari {QUESTIONS.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {showHappy ? (
            <motion.div
              key="happy-feedback"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-50"
            >
              <HappySticker />
              <p className="mt-4 font-script text-3xl text-pink-500 font-bold">yeayyyyyyy! 🥰</p>
            </motion.div>
          ) : (
            <motion.div
              key={`q-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center w-full relative z-10 px-4"
            >
              <h2 className="text-3xl md:text-5xl font-script text-slate-800 leading-snug drop-shadow-sm font-bold mb-12">
                "{currentQ?.text || ''}"
              </h2>

              <div className="flex flex-row justify-center items-center gap-6 md:gap-12 mt-12 relative min-h-[100px]">
                {/* Tombol SALAH (Evading Button) */}
                <motion.button
                  onClick={handleWrongButClicked}
                  animate={{ x: wrongPos.x, y: wrongPos.y, scale: wrongScale, rotate: wrongRotation }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  onMouseEnter={handleEvade}
                  onTouchStart={(e) => { e.preventDefault(); handleEvade(); }}
                  className={`absolute px-8 py-3 rounded-full font-semibold pointer-events-auto transition-colors ${getStyle(wrongLabel)}`}
                  style={{ zIndex: 30, right: '55%' }}
                >
                  {wrongLabel}
                </motion.button>

                {/* Tombol BENAR (Correct Button) */}
                <motion.button
                  onClick={handleCorrect}
                  animate={{ scale: 1 + (escapeCount * 0.15) }}
                  className={`absolute px-8 py-3 rounded-full font-bold transition-colors origin-center ${getStyle(correctLabel)}`}
                  style={{ zIndex: 40, left: '55%' }}
                >
                  {correctLabel}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-0 pointer-events-none p-4 opacity-30 text-center flex justify-center">
        <HelpCircle className="w-64 h-64 text-sky-200 -mb-16 -mr-16" />
      </div>
    </main>
  );
}
