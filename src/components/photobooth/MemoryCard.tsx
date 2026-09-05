"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MediaItem } from "../GalleryGrid";
import { PlayCircle } from "lucide-react";
import * as Doodles from "./Doodles";
import React from "react";

export type MemoryCardProps = {
  items: MediaItem[];
  template: 'FILM' | 'FLORAL' | 'POLAROID' | 'CHECKERED' | 'VINTAGE' | 'MINIMAL' | 'NEON' | 'HEARTS' | 'TICKET' | 'NOTEBOOK' | 'POPART' | 'HOLOGRAPHIC' | 'Y2K' | 'KRAFT' | 'MONOCHROME' | 'BLUEPRINT';
  index: number;
};

const getCroppedUrl = (url: string, cropStr?: string | null) => {
  if (!cropStr || typeof cropStr !== 'string') return url;
  const [x, y, w, h] = cropStr.split(',');
  if (x == null || y == null || w == null || h == null) return url;
  return url.replace('/upload/', `/upload/c_crop,x_${x},y_${y},w_${w},h_${h}/`);
};

const RenderMedia = ({ item, aspect = "aspect-[3/4]", className = "", overlay = null }: { item: MediaItem, aspect?: string, className?: string, overlay?: React.ReactNode }) => {
  return (
    <div className={`relative ${aspect} w-full overflow-hidden bg-neutral-200 group/photo ${className}`}>
      {item.resource_type === "video" ? (
        <div className="relative w-full h-full">
          <Image
            src={item.secure_url.replace(/\.[^/.]+$/, ".jpg")}
            alt="Video thumbnail"
            fill
            className="object-cover transform group-hover/photo:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 320px"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover/photo:bg-black/20 transition-colors">
            <PlayCircle className="w-10 h-10 text-white/90 drop-shadow-md" />
          </div>
          {overlay}
        </div>
      ) : (
        <>
          <Image
            src={getCroppedUrl(item.secure_url, item.crop)}
            alt="Memori"
            fill
            className="object-cover transform group-hover/photo:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 320px"
            unoptimized={!!item.crop}
          />
          {overlay}
        </>
      )}
    </div>
  );
};

export default function MemoryCard({ items, template, index }: MemoryCardProps) {
  const safeItem = (i: number) => items[i] || items[0];

  const rotations = [-2, 2, -1, 3, -3, 1, -1.5, 1.5];
  const rot = rotations[index % rotations.length];

  const renderTemplate = () => {
    switch (template) {
      case 'FILM':
        return (
          <div className="flex flex-col bg-zinc-950 px-5 py-8 shadow-2xl relative w-[280px] md:w-[300px] rounded-sm border border-zinc-800">
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] font-mono tracking-widest text-[#d8a865]/60 z-20">KODAK 400</div>
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 rotate-90 text-[8px] font-mono tracking-widest text-[#d8a865]/60 z-20">EXP 36</div>
            <div className="absolute left-[6px] top-4 bottom-4 w-1.5 flex flex-col justify-between opacity-80">
              {[...Array(items.length * 4 + 2)].map((_, i) => (
                <div key={`l-${i}`} className="w-1.5 h-2.5 bg-neutral-200/90 rounded-[1px] shadow-inner" />
              ))}
            </div>
            <div className="absolute right-[6px] top-4 bottom-4 w-1.5 flex flex-col justify-between opacity-80">
              {[...Array(items.length * 4 + 2)].map((_, i) => (
                <div key={`r-${i}`} className="w-1.5 h-2.5 bg-neutral-200/90 rounded-[1px] shadow-inner" />
              ))}
            </div>
            <div className="flex flex-col gap-3 z-10 px-2 mt-2 mb-2">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[4/3]" className="rounded-[1px] opacity-90 sepia-[.1] border-[0.5px] border-white/10" />
               ))}
            </div>
          </div>
        );
      
      case 'FLORAL':
        return (
          <div className="flex flex-col bg-gradient-to-b from-pink-50 to-pink-100 p-4 pt-6 shadow-[0_15px_40px_-10px_rgba(236,72,153,0.2)] relative w-[280px] md:w-[300px] overflow-hidden rounded-t-lg rounded-b-[20px]">
            <Doodles.FlowerDoodle className="absolute top-2 -right-2 rotate-12 opacity-70" color="#f9a8d4" />
            <Doodles.FlowerDoodle className="absolute bottom-20 -left-6 -rotate-12 opacity-60" color="#fbcfe8" />
            <Doodles.WashiTape className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 rotate-2 z-20" color="bg-rose-200/80" />
            <div className="flex flex-col gap-4 mt-2 z-10">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[4/5]" className="rounded-[10px] shadow-sm border-[4px] border-white/80" />
               ))}
            </div>
            <div className="mt-7 mb-2 text-center z-10 relative">
              <span className="font-handwriting text-3xl text-pink-500 drop-shadow-sm -rotate-3 inline-block">Our Story ~</span>
              <Doodles.SparkDoodle className="absolute -top-2 right-12 scale-50" color="#fbbf24" />
            </div>
          </div>
        );

      case 'POLAROID':
        return (
          <div className="flex flex-col bg-white p-3.5 pb-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-neutral-100 relative w-[280px] md:w-[300px]">
            <Doodles.SquigglyLine className="absolute top-1/3 -right-6 rotate-90 opacity-60 z-0" color="#cbd5e1" />
            <Doodles.WashiTape className="absolute -top-2 -left-2 w-16 h-6 -rotate-12 z-20" color="bg-slate-200/70" />
            <div className="flex flex-col gap-3.5 z-10">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[1/1]" className="rounded-sm shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] border border-neutral-100" />
               ))}
            </div>
            <div className="absolute bottom-4 left-0 w-full text-center">
              <span className="font-script text-3xl font-bold text-neutral-800 tracking-wide drop-shadow-sm" style={{ transform: "rotate(-1deg)", display: "inline-block" }}>
                always & forever
              </span>
            </div>
          </div>
        );

      case 'CHECKERED':
        return (
          <div className="flex flex-col p-4 shadow-xl relative w-[280px] md:w-[300px] rounded-lg" style={{
            backgroundColor: '#ffffff',
            backgroundImage: 'repeating-linear-gradient(45deg, #e0f2fe 25%, transparent 25%, transparent 75%, #e0f2fe 75%, #e0f2fe), repeating-linear-gradient(45deg, #e0f2fe 25%, #ffffff 25%, #ffffff 75%, #e0f2fe 75%, #e0f2fe)',
            backgroundPosition: '0 0, 12px 12px',
            backgroundSize: '24px 24px'
          }}>
            <Doodles.SparkDoodle className="absolute top-6 -left-4 z-20 scale-75" color="#fbbf24" />
            <Doodles.SmileDoodle className="absolute bottom-20 -right-2 rotate-12 z-20" color="#fde047" />
            <div className="bg-white/95 p-2 pb-8 rounded-xl shadow-md border-[2px] border-sky-100 flex flex-col gap-3 relative z-10">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[3/4]" className="rounded-lg shadow-sm" />
               ))}
               <div className="absolute -bottom-4 right-4 bg-sky-200 text-sky-800 font-bold px-3 py-1 rounded-full text-sm -rotate-6 shadow-sm border border-sky-100 z-30">
                 FUN!
               </div>
            </div>
          </div>
        );

      case 'VINTAGE':
        return (
          <div className="flex flex-col bg-[#e6d5c3] p-4 pt-5 shadow-xl relative w-[280px] md:w-[300px] border border-[#d2bb9f] sepia-[.2]">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
            }} />
            <Doodles.WashiTape className="absolute -top-3 left-[10%] w-24 h-7 -rotate-2 z-20" color="bg-[#c8b399]" />
            <Doodles.WashiTape className="absolute -bottom-3 right-[10%] w-24 h-7 rotate-3 z-20" color="bg-[#c8b399]" />
            <div className="flex flex-col gap-3 relative z-10">
               {items.map((item, i) => (
                 <RenderMedia 
                   key={item.public_id || i} 
                   item={item} 
                   aspect="aspect-square" 
                   className="rounded-sm border-[6px] border-[#f2eadf] shadow-sm"
                   overlay={<div className="absolute inset-0 bg-[#d4a373] mix-blend-color opacity-20 pointer-events-none" />}
                 />
               ))}
            </div>
            <div className="mt-8 text-center relative z-10">
              <span className="font-serif italic text-xl text-[#6b5035] font-semibold tracking-widest">TIMELINE</span>
            </div>
          </div>
        );

      case 'MINIMAL':
        return (
          <div className="flex flex-col bg-zinc-50 p-6 pb-12 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.08)] relative w-[280px] md:w-[300px] border border-zinc-200">
            <div className="flex flex-col gap-2 relative z-10">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[3/4]" className="grayscale-[0.2] hover:grayscale-0 transition-all duration-500 ease-in-out border border-zinc-200" />
               ))}
            </div>
            <div className="absolute bottom-4 left-6 text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">Captures</span>
            </div>
            <div className="absolute bottom-4 right-6 text-right">
              <span className="font-mono text-xs uppercase text-zinc-400 font-bold">PT. 0{index + 1}</span>
            </div>
          </div>
        );

      case 'NEON':
        return (
          <div className="flex flex-col bg-slate-900 p-4 shadow-[0_0_30px_rgba(236,72,153,0.4)] relative w-[280px] md:w-[300px] border border-pink-500/50 rounded-xl">
            <div className="flex flex-col gap-4 relative z-10">
               {items.map((item, i) => (
                 <RenderMedia 
                    key={item.public_id || i} 
                    item={item} 
                    aspect="aspect-[3/4]" 
                    className="rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.5)] border-2 border-cyan-400/80 brightness-110 contrast-125" 
                 />
               ))}
            </div>
            <div className="mt-6 text-center z-10 pb-2">
              <span className="font-mono text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 font-black animate-pulse drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">NIGHTLIFE</span>
            </div>
          </div>
        );

      case 'HEARTS':
        return (
          <div className="flex flex-col bg-gradient-to-br from-rose-100 to-pink-200 p-5 shadow-xl relative w-[280px] md:w-[300px] rounded-3xl border border-rose-200 overflow-hidden">
            <div className="absolute top-4 left-4 text-rose-300/50 text-4xl -rotate-12">❤️</div>
            <div className="absolute bottom-16 right-4 text-pink-400/40 text-5xl rotate-12">💖</div>
            <div className="flex flex-col gap-3 relative z-10">
               {items.map((item, i) => (
                 <RenderMedia 
                    key={item.public_id || i} 
                    item={item} 
                    aspect="aspect-square" 
                    className="rounded-[20px] shadow-md border-4 border-white/60" 
                 />
               ))}
            </div>
            <div className="mt-5 text-center relative z-10">
              <span className="font-caveat text-4xl text-rose-500 font-bold bg-white/70 px-6 py-1 rounded-full shadow-sm">Love</span>
            </div>
          </div>
        );

      case 'TICKET':
        return (
          <div className="flex flex-col bg-[#FDFBF7] p-2 py-6 shadow-2xl relative w-[280px] md:w-[300px] border border-amber-900/20"
               style={{
                  maskImage: `radial-gradient(circle at 0px 50%, transparent 6px, black 7px), radial-gradient(circle at 100% 50%, transparent 6px, black 7px)`,
                  maskSize: "100% 50px",
                  maskRepeat: "repeat-y"
               }}>
            <div className="border border-dashed border-amber-900/30 p-2 flex flex-col gap-3 h-full rounded-sm">
               <div className="text-center border-b border-dashed border-amber-900/30 pb-2 mb-1">
                 <span className="font-mono font-bold text-amber-900/60 uppercase text-xs tracking-widest">ADMIT ONE</span>
               </div>
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[4/3]" className="rounded-none contrast-[1.1] sepia-[0.1]" />
               ))}
               <div className="mt-2 pt-2 border-t border-dashed border-amber-900/30 text-center">
                 <span className="font-mono text-[10px] text-amber-900/80 font-bold uppercase">{`NO. 000${index + 1}`}</span>
               </div>
            </div>
          </div>
        );

      case 'NOTEBOOK':
        return (
          <div className="flex flex-col bg-yellow-50 pl-10 pr-4 py-8 shadow-xl relative w-[280px] md:w-[300px] rounded-r-xl border border-yellow-200">
            {/* Spiral Rings */}
            <div className="absolute left-1 top-4 bottom-4 flex flex-col justify-between">
              {[...Array(items.length * 3 + 2)].map((_, i) => (
                 <div key={i} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-slate-800/80 shadow-inner z-20"></div>
                 </div>
              ))}
            </div>
            {/* Lined Paper */}
            <div className="absolute inset-0 left-8 border-l-2 border-red-400"
                 style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #60a5fa 31px, #60a5fa 32px)", backgroundPosition: "0 2px" }} />
            
            <div className="flex flex-col gap-6 relative z-10 pt-2">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[3/4]" className="rounded-sm shadow-sm border border-slate-300" />
               ))}
               <div className="text-center pb-2">
                 <span className="font-handwriting text-2xl text-blue-800 -rotate-2 inline-block">Best Day Ever! ☁️</span>
               </div>
            </div>
          </div>
        );

      case 'POPART':
        return (
          <div className="flex flex-col bg-yellow-400 p-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative w-[280px] md:w-[300px] border-4 border-black">
            {/* Comic Dots */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(black 15%, transparent 16%)", backgroundSize: "10px 10px", backgroundPosition: "0 0" }} />
            
            <div className="flex flex-col gap-4 relative z-10">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-square" className="rounded-none border-4 border-black saturate-150 contrast-125" />
               ))}
               <div className="bg-white border-4 border-black p-2 mt-2 transform -rotate-3 text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                 <span className="font-sans font-black text-2xl uppercase tracking-tighter text-red-500">WOW!</span>
               </div>
            </div>
          </div>
        );

      case 'HOLOGRAPHIC':
        return (
          <div className="flex flex-col p-[3px] shadow-2xl relative w-[280px] md:w-[300px] rounded-xl overflow-hidden bg-[linear-gradient(124deg,#ff2400,#e81d1d,#e8b71d,#e3e81d,#1de840,#1ddde8,#2b1de8,#dd00f3,#dd00f3)] bg-[length:400%_400%] animate-gradient">
            <div className="bg-white/90 backdrop-blur-3xl p-3 pb-8 rounded-lg flex flex-col gap-3 h-full">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[4/5]" className="rounded-md border border-white/50 brightness-110 glow-sm" />
               ))}
               <div className="w-full text-center mt-3">
                 <span className="font-serif italic font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">sparkle</span>
               </div>
            </div>
          </div>
        );

      case 'Y2K':
        return (
          <div className="flex flex-col bg-[#C0C0C0] p-1 shadow-[inset_1px_1px_0_#FFF,inset_-1px_-1px_0_#0a0a0a,2px_2px_10px_rgba(0,0,0,0.5)] relative w-[280px] md:w-[300px]">
             {/* Title Bar */}
             <div className="bg-[linear-gradient(90deg,#000080,#1084d0)] flex justify-between items-center px-2 py-1 h-6">
                <span className="font-mono text-white text-[10px] font-bold tracking-tight">PHOTO_ST.EXE</span>
                <div className="flex gap-[1px]">
                  <div className="w-3.5 h-3.5 bg-[#C0C0C0] border border-[#FFF] border-b-[#0a0a0a] border-r-[#0a0a0a] flex items-center justify-center font-black text-[9px] cursor-not-allowed">?</div>
                  <div className="w-3.5 h-3.5 bg-[#C0C0C0] border border-[#FFF] border-b-[#0a0a0a] border-r-[#0a0a0a] flex items-center justify-center font-black text-[9px] cursor-not-allowed">X</div>
                </div>
             </div>
             
             <div className="p-2 border border-[#0a0a0a] border-t-[#FFF] border-l-[#FFF] bg-[#DFDFDF] mt-1 flex flex-col gap-2">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[4/3]" className="border-2 border-[#0a0a0a] border-b-[#FFF] border-r-[#FFF]" />
               ))}
             </div>
          </div>
        );

      case 'KRAFT':
        return (
          <div className="flex flex-col bg-[#C19A6B] p-4 pb-10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative w-[280px] md:w-[300px]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.2'/%3E%3C/svg%3E\")" }}>
            <Doodles.WashiTape className="absolute -top-3 left-[50%] -translate-x-[50%] w-32 h-8 rotate-1 z-20" color="bg-[#8B4513]/20" />
            <div className="flex flex-col gap-4 relative z-10 mt-3">
               {items.map((item, i) => (
                 <div key={item.public_id || i} className="relative z-10">
                   <Doodles.WashiTape className="absolute -top-2 -left-2 w-12 h-4 -rotate-12 z-20" color="bg-[#facc15]/40" />
                   <Doodles.WashiTape className="absolute -bottom-2 -right-2 w-12 h-4 -rotate-12 z-20" color="bg-[#facc15]/40" />
                   <RenderMedia item={item} aspect="aspect-square" className="rounded-sm shadow-md border-2 border-white/50" />
                 </div>
               ))}
            </div>
          </div>
        );

      case 'MONOCHROME':
        return (
          <div className="flex flex-col bg-white p-3 shadow-2xl relative w-[280px] md:w-[300px] border-[6px] border-black pb-8">
            <div className="flex flex-col gap-2 relative z-10 mb-4">
               {items.map((item, i) => (
                 <RenderMedia key={item.public_id || i} item={item} aspect="aspect-[4/3]" className="grayscale contrast-125 border-b-[2px] border-black pb-2" />
               ))}
            </div>
            <div className="w-full text-center">
              <span className="font-sans font-black uppercase text-xl tracking-tighter text-black">SERIES {index + 1}</span>
            </div>
          </div>
        );

      case 'BLUEPRINT':
        return (
          <div className="flex flex-col bg-[#103466] p-4 shadow-xl relative w-[280px] md:w-[300px] border border-blue-400">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
            <div className="flex flex-col gap-3 relative z-10 border border-white/30 p-2">
               {items.map((item, i) => (
                 <RenderMedia 
                    key={item.public_id || i} 
                    item={item} 
                    aspect="aspect-[3/4]" 
                    className="border border-blue-200 saturate-0 sepia hue-rotate-[190deg] contrast-125 opacity-90" 
                 />
               ))}
               <div className="text-left mt-2 border-t border-white/30 pt-2 flex justify-between">
                 <span className="font-mono text-white/80 text-[10px] uppercase">FIG. 0{index + 1}</span>
                 <span className="font-mono text-white/50 text-[10px] uppercase">1:1 SC</span>
               </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: (index % 3) * 0.1 }}
      whileHover={{ scale: 1.02, zIndex: 50, transition: { duration: 0.2 } }}
      className={`relative hover:z-50`}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <div>
        {renderTemplate()}
      </div>
    </motion.div>
  );
}
