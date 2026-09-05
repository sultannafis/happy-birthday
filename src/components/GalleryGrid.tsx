"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), { ssr: false });

export type MediaItem = {
  public_id: string;
  secure_url: string;
  resource_type: string;
  width: number;
  height: number;
  crop?: string | null;
};

export default function GalleryGrid({ items }: { items: MediaItem[] }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const selectedItem = selectedIdx !== null ? items[selectedIdx] : null;
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/photobooth");
  }, [router]);

  const nextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % items.length);
  };

  const prevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + items.length) % items.length);
  };

  const getCroppedUrl = (url: string, cropStr?: string | null) => {
    if (!cropStr || typeof cropStr !== 'string') return url;
    const [x, y, w, h] = cropStr.split(',');
    if (x == null || y == null || w == null || h == null) return url;
    return url.replace('/upload/', `/upload/c_crop,x_${x},y_${y},w_${w},h_${h}/`);
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8 pb-8 px-2 md:px-0">
        {items.map((item, idx) => {
          const compliments = [
            "Cantik paripurna", "My favorite PAP ❤️", "Cantik banget astaga..", "Gemes bangettt", 
            "Lucunya pacarku", "Sweetest smile 😊", "Suka banget yang ini!", "Bidadariku", 
            "Tatapannya itu lho..", "Aaa sayang banget", "Always pretty!", "MasyaAllah cantiknya", 
            "My beautiful girl", "Bikin kangen terus", "Kesayanganku", "Kiyiyiiw ✨", "Paling manis sejagat"
          ];
          const complimentText = compliments[(idx * 7 + 3) % compliments.length];
          const randomRotations = [-2, 1, -1.5, 2, -1, 1.5, -0.5, 0.5];
          const rotation = randomRotations[idx % randomRotations.length];
          
          const variant = idx % 32; // 32 TEMA UNIK (Lebih dari 31 foto disupport tanpa ulang)
          const imageClassName = "w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out";
          const mediaUrl = item.resource_type === "video" ? item.secure_url.replace(/\.[^/.]+$/, ".jpg") : getCroppedUrl(item.secure_url, item.crop);

          const renderMedia = (className = imageClassName) => (
            <>
              <Image
                src={mediaUrl}
                alt="Kenangan kita"
                width={item.width}
                height={item.height}
                className={className}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUi IGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
                unoptimized={!!item.crop}
                loading="lazy"
              />
              {item.resource_type === "video" && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-500">
                   <PlayCircle className="w-14 h-14 text-white/90 drop-shadow-lg scale-90 group-hover:scale-110 transition-transform duration-500" />
                 </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay z-10"></div>
            </>
          );

          let CardVariant;

          switch(variant) {
            case 0:
              CardVariant = (
                <div className="bg-white p-3 sm:p-4 rounded-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-amber-200/60 backdrop-blur-md -rotate-3 z-20 shadow-sm rounded-sm pointer-events-none" />
                  <div className="relative overflow-hidden rounded-sm">{renderMedia()}</div>
                  <div className="h-10 w-full bg-white flex items-end justify-center mt-3 pb-1 relative">
                    <span className="font-caveat text-slate-700 text-2xl md:text-3xl font-semibold drop-shadow-sm">{complimentText}</span>
                  </div>
                </div>
              ); break;
            case 1:
              CardVariant = (
                <div className="bg-zinc-950 p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden rounded-sm ring-1 ring-zinc-800">
                  <div className="absolute top-0 bottom-0 left-0 w-2 flex flex-col justify-between py-2 items-center opacity-30">
                    {Array.from({length: 8}).map((_, i) => <div key={i} className="w-1 h-1.5 bg-white rounded-sm"></div>)}
                  </div>
                  <div className="absolute top-0 bottom-0 right-0 w-2 flex flex-col justify-between py-2 items-center opacity-30">
                    {Array.from({length: 8}).map((_, i) => <div key={i} className="w-1 h-1.5 bg-white rounded-sm"></div>)}
                  </div>
                  <div className="relative overflow-hidden rounded-sm mx-1 ring-1 ring-white/10 contrast-[1.1] saturate-[1.1]">{renderMedia()}</div>
                  <div className="w-full flex items-center justify-center mt-3 mb-1">
                    <span className="font-mono text-zinc-300 text-xs md:text-sm tracking-[0.1em] font-medium opacity-80 group-hover:opacity-100 transition-opacity uppercase">
                      {complimentText}
                    </span>
                  </div>
                </div>
              ); break;
            case 2:
              CardVariant = (
                <div className="rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] transition-shadow duration-300 relative group overflow-hidden border border-white/10">
                  <div className="absolute -top-4 -right-4 text-4xl z-20 drop-shadow-lg rotate-12 pointer-events-none opacity-80">🌸</div>
                  <div className="relative overflow-hidden w-full h-full brightness-[1.05]">{renderMedia(imageClassName + " rounded-2xl")}</div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 flex items-end">
                    <span className="font-serif italic text-white/90 text-lg md:text-xl drop-shadow-md">{complimentText}</span>
                  </div>
                </div>
              ); break;
            case 3:
              CardVariant = (
                <div className="bg-[#fffcf5] p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden border border-[#d4af37]/40">
                  <div className="ring-1 ring-[#d4af37]/50 ring-offset-2 ring-offset-[#fffcf5] rounded-sm p-1 shadow-inner">
                     <div className="relative overflow-hidden rounded-sm sepia-[.15] brightness-105">{renderMedia()}</div>
                  </div>
                  <div className="w-full flex justify-center mt-5 mb-2 relative">
                    <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-[#d4af37]/20 -translate-y-1/2"></div>
                    <span className="font-serif bg-[#fffcf5] px-4 text-[#8a6a24] text-sm md:text-base italic z-10 font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%] drop-shadow-sm">
                      {complimentText}
                    </span>
                  </div>
                </div>
              ); break;
            case 4:
              CardVariant = (
                <div className="bg-[#f5ebd9] p-3 shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.5)] z-30 pointer-events-none before:absolute before:w-1 before:h-1 before:bg-white/60 before:rounded-full before:top-0.5 before:left-0.5" />
                  <div className="border-[1.5px] border-dashed border-[#b89f81] p-2 mt-2">
                     <div className="relative overflow-hidden rounded-sm rotate-1 group-hover:rotate-0 transition-transform duration-500 bg-white p-1 pb-4 shadow-sm border border-black/5">
                        {renderMedia()}
                        <div className="text-center mt-2 font-handwriting text-[#5e4b3c] text-[1.4rem] leading-none mb-1">{complimentText}</div>
                     </div>
                  </div>
                </div>
              ); break;
            case 5:
              CardVariant = (
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl shadow-xl hover:shadow-2xl border border-white/50 relative group overflow-hidden">
                  <div className="relative overflow-hidden rounded-lg shadow-inner">{renderMedia(imageClassName + " rounded-lg")}</div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-white/70 backdrop-blur text-center py-1.5 rounded-full border border-white border-opacity-50 text-slate-800 font-medium text-sm drop-shadow-sm pointer-events-none">
                    {complimentText}
                  </div>
                </div>
              ); break;
            case 6:
              CardVariant = (
                 <div className="bg-[#EEE7DB] p-4 shadow-lg hover:shadow-2xl relative group overflow-hidden border border-[#D5CBB9]">
                   <div className="absolute top-3 right-3 border border-red-500/30 rounded-sm w-8 h-10 flex items-center justify-center opacity-40">
                     <span className="text-[10px] text-red-500 font-bold uppercase rotate-12">Post</span>
                   </div>
                   <div className="relative overflow-hidden p-1 bg-[#F9F6F0] shadow-sm ring-1 ring-black/5 mb-3">{renderMedia(imageClassName + " sepia-[.2] contrast-[0.95]")}</div>
                   <div className="flex justify-center items-end border-t-2 border-dotted border-[#D5CBB9] pt-2">
                      <span className="font-handwriting text-[#6B5A46] text-xl text-center w-full">{complimentText}</span>
                   </div>
                 </div>
              ); break;
            case 7:
              CardVariant = (
                 <div className="bg-[#2A2321] p-3 shadow-2xl relative group overflow-hidden ring-4 ring-[#4A3F3A]">
                   <div className="absolute inset-0 bg-[#000] opacity-10 pointer-events-none"></div>
                   <div className="border border-[#7D6B5D] p-2">
                     <div className="relative overflow-hidden contrast-125 saturate-50">{renderMedia()}</div>
                     <div className="text-center mt-3 mb-1">
                        <span className="font-serif text-[#C4B29E] text-sm uppercase tracking-[0.2em]">{complimentText}</span>
                     </div>
                   </div>
                 </div>
              ); break;
            case 8:
              CardVariant = (
                <div className="bg-black p-1 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-shadow duration-500 relative group rounded-md">
                   <div className="bg-slate-900 p-2 border border-pink-500/50 rounded-sm">
                      <div className="relative overflow-hidden rounded-sm saturated-150 contrast-125 tint-blue">{renderMedia()}</div>
                      <div className="mt-3 text-center">
                         <span className="font-mono text-cyan-400 text-xs tracking-widest uppercase text-shadow-neon">{complimentText}</span>
                      </div>
                   </div>
                </div>
              ); break;
            case 9:
              CardVariant = (
                <div className="bg-pink-50 p-2 sm:p-3 shadow-lg rounded-2xl relative group border-2 border-pink-200">
                   <div className="absolute -top-3 -left-3 text-3xl rotate-[-20deg] z-20">🎀</div>
                   <div className="relative overflow-hidden rounded-xl border border-pink-100">{renderMedia(imageClassName + " rounded-xl")}</div>
                   <div className="mt-2 flex justify-center">
                      <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-pink-200">
                         {complimentText}
                      </span>
                   </div>
                </div>
              ); break;
            case 10:
              CardVariant = (
                 <div className="bg-white p-5 shadow-[5px_5px_15px_rgba(0,0,0,0.15)] relative group border-l-4 border-b-4 border-slate-200">
                   <div className="relative overflow-hidden shadow-inner">{renderMedia()}</div>
                   <div className="mt-4 flex justify-center border-l-2 border-slate-300 pl-3">
                      <span className="font-sans font-bold text-slate-800 text-sm tracking-wide">{complimentText}</span>
                   </div>
                 </div>
              ); break;
            case 11:
              CardVariant = (
                 <div className="bg-[#C0C0C0] p-[2px] shadow-sm relative group border-t-2 border-l-2 border-t-white border-l-white border-b-2 border-r-2 border-b-black border-r-black">
                   <div className="bg-blue-800 flex justify-between items-center px-1 py-0.5">
                      <span className="text-white text-[10px] font-bold font-mono tracking-tight">{complimentText.substring(0, 15)}...</span>
                      <div className="flex gap-0.5">
                         <div className="w-3 h-3 bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black shadow-inner flex items-center justify-center"><span className="text-[8px] font-medium leading-none">?</span></div>
                         <div className="w-3 h-3 bg-[#C0C0C0] border-t border-l border-white border-b border-r border-black shadow-inner flex items-center justify-center"><span className="text-[8px] font-medium leading-none">X</span></div>
                      </div>
                   </div>
                   <div className="p-1 border-t-2 border-l-2 border-black/50 border-b-white border-r-white bg-white">
                     <div className="relative overflow-hidden pixelated brightness-110">{renderMedia()}</div>
                   </div>
                 </div>
              ); break;
            case 12:
              CardVariant = (
                 <div className="bg-slate-900 p-4 shadow-2xl relative group rounded-md border border-slate-700">
                   <div className="relative overflow-hidden rounded-sm ring-2 ring-slate-800">{renderMedia(imageClassName + " grayscale-[15%] contrast-125")}</div>
                   <div className="mt-4 text-center border-t border-slate-700 pt-3">
                      <span className="font-serif text-slate-300 text-sm tracking-widest font-light">{complimentText}</span>
                   </div>
                 </div>
              ); break;
            case 13:
              CardVariant = (
                 <div className="p-1 rounded-xl shadow-lg relative group overflow-hidden bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 shrink">
                   <div className="bg-white/95 backdrop-blur-md p-2 rounded-lg h-full">
                     <div className="relative overflow-hidden rounded-md">{renderMedia(imageClassName + " rounded-md")}</div>
                     <div className="mt-2 text-center">
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600 text-sm">{complimentText}</span>
                     </div>
                   </div>
                 </div>
              ); break;
            case 14:
               CardVariant = (
                 <div className="bg-white p-2 shadow-xl border-4 border-black relative group">
                    <div className="border border-black p-1">
                      <div className="relative overflow-hidden saturate-0 contrast-125 group-hover:saturate-100 transition-all duration-700">{renderMedia()}</div>
                    </div>
                    <div className="mt-2 text-center bg-black text-white py-1">
                       <span className="font-serif text-xs uppercase tracking-widest">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 15:
               CardVariant = (
                 <div className="bg-[#D2B48C] p-4 shadow-[0_15px_30px_rgb(0,0,0,0.3)] relative group rounded-sm border border-[#C19A6B]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E\")" }}>
                    <div className="absolute top-2 left-0 w-full h-[2px] border-t-2 border-dashed border-[#8B4513] opacity-60"></div>
                    <div className="relative overflow-hidden border-2 border-[#8B4513]/20 bg-white p-1 pb-6 mt-1 shadow-inner">
                       {renderMedia()}
                       <div className="absolute bottom-1 right-2 font-handwriting text-[#8B4513] text-lg font-bold rotate-[-3deg] opacity-80">{complimentText}</div>
                    </div>
                 </div>
               ); break;
            case 16:
               CardVariant = (
                 <div className="relative bg-white shadow-2xl group overflow-hidden border border-gray-200">
                    <div className="relative overflow-hidden w-full h-full">{renderMedia()}</div>
                    <div className="absolute top-2 right-2 px-2 bg-red-600 text-white font-black text-xs uppercase tracking-widest shadow-md">EXCLUSIVE</div>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col justify-end h-1/2">
                       <span className="text-white font-serif font-black text-3xl leading-none drop-shadow-md">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 17:
               CardVariant = (
                 <div className="p-[3px] rounded-2xl shadow-xl relative group bg-gradient-to-tr from-[#ff9a9e] via-[#fecfef] to-[#a1c4fd]">
                    <div className="bg-white/60 backdrop-blur-xl p-3 rounded-xl border border-white/80">
                       <div className="relative overflow-hidden rounded-lg shadow-inner brightness-105">{renderMedia(imageClassName + " rounded-lg")}</div>
                       <div className="mt-3 text-center flex justify-center">
                          <span className="font-bold text-slate-700 bg-white/50 px-4 py-1 rounded-full text-xs shadow-sm shadow-[#a1c4fd]/40">{complimentText}</span>
                       </div>
                    </div>
                 </div>
               ); break;
            case 18:
               CardVariant = (
                 <div className="bg-[#E6D4B8] p-2 shadow-2xl relative group border-t-4 border-l-2 border-r-4 border-b-8 border-[#5C4033] rounded-sm">
                    <div className="relative overflow-hidden sepia-[0.3] contrast-125 border border-[#8B4513]/30">{renderMedia()}</div>
                    <div className="w-full text-center bg-[#5C4033] py-1 mt-1">
                       <span className="font-serif text-[#E6D4B8] text-xs uppercase tracking-widest">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 19:
               CardVariant = (
                 <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)] transition-shadow duration-300 relative group rounded-xl pb-3 border border-slate-100">
                    <div className="relative overflow-hidden rounded-t-xl mb-3">{renderMedia(imageClassName + " rounded-t-xl")}</div>
                    <div className="w-full flex justify-center items-center px-4">
                       <span className="font-sans text-slate-800 text-sm font-semibold">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 20: // Soft Pastel Blob
               CardVariant = (
                 <div className="bg-indigo-50 p-3 shadow-md rounded-[30px] rounded-br-[10px] relative group border border-indigo-100">
                    <div className="relative overflow-hidden rounded-[25px] rounded-br-[5px] ring-4 ring-white">{renderMedia(imageClassName + " rounded-[25px] rounded-br-[5px]")}</div>
                    <div className="mt-2 text-center">
                       <span className="font-handwriting text-indigo-400 text-xl">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 21: // Golden Ticket
               CardVariant = (
                 <div className="bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 p-2 shadow-xl relative group">
                    <div className="border border-dashed border-yellow-700/50 p-2 h-full">
                       <div className="relative overflow-hidden ring-2 ring-yellow-600/30">{renderMedia()}</div>
                       <div className="text-center mt-2 flex justify-center">
                          <span className="bg-yellow-900 text-yellow-100 px-3 py-1 rounded text-[10px] font-black uppercase tracking-[0.2em]">{complimentText}</span>
                       </div>
                    </div>
                 </div>
               ); break;
            case 22: // Dreamy Cloud
               CardVariant = (
                 <div className="bg-sky-50 shadow-[0_0_30px_rgba(255,255,255,0.8)] relative group p-4 rounded-[40px] border border-sky-100">
                    <div className="relative overflow-hidden rounded-[30px] mb-2">{renderMedia(imageClassName + " rounded-[30px]")}</div>
                    <div className="text-center">
                       <span className="font-sans text-sky-400 font-bold opacity-80 text-sm">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 23: // VHS Glitch
               CardVariant = (
                 <div className="bg-zinc-900 p-2 relative group border-t border-b border-zinc-700">
                    <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/20 z-20 mix-blend-overlay"></div>
                    <div className="absolute top-2/3 left-0 w-full h-[2px] bg-black/20 z-20"></div>
                    <div className="relative overflow-hidden drop-shadow-[2px_0_0_rgba(255,0,0,0.5)] [-webkit-filter:drop-shadow(-2px_0_0_rgba(0,255,255,0.5))] saturate-150 contrast-125 brightness-90">
                       {renderMedia()}
                    </div>
                    <div className="mt-2 px-1">
                       <span className="font-mono text-xs text-green-400 uppercase tracking-widest block animate-pulse">PLAY ►</span>
                       <span className="font-mono text-[9px] text-zinc-400 block mt-1">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 24: // Love Letter
               CardVariant = (
                 <div className="bg-red-50 p-4 shadow-[0_5px_15px_rgba(225,29,72,0.15)] relative group border border-red-100 rounded-sm">
                    <div className="absolute top-2 right-2 text-2xl rotate-12 opacity-80 z-20 drop-shadow-md">💋</div>
                    <div className="relative overflow-hidden rounded-sm ring-1 ring-red-100">{renderMedia()}</div>
                    <div className="mt-3 flex flex-col gap-1 w-full bg-[linear-gradient(transparent_19px,#fbcfe8_20px)] bg-[length:100%_20px]">
                       <span className="font-caveat text-red-700 text-xl px-1 pt-1">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 25: // Modern Swiss
               CardVariant = (
                 <div className="bg-white p-3 shadow-md border-2 border-red-600 relative group">
                    <div className="relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 border-b-4 border-black">{renderMedia()}</div>
                    <div className="w-full flex justify-between bg-red-600 text-white mt-2 p-1">
                       <span className="font-sans font-black text-xs uppercase tracking-tighter">{complimentText.toUpperCase()}</span>
                       <span className="font-sans font-black text-xs">+</span>
                    </div>
                 </div>
               ); break;
            case 26: // Cyber Frame
               CardVariant = (
                 <div className="bg-slate-900 p-2 shadow-2xl relative group">
                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
                    
                    <div className="relative overflow-hidden border border-slate-700 m-1">{renderMedia()}</div>
                    <div className="text-center mt-1">
                       <span className="font-mono text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 uppercase tracking-widest">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 27: // Retro Sun
               CardVariant = (
                 <div className="bg-[#1A1A1A] p-3 relative group overflow-hidden border border-white/10 rounded-t-full">
                    {/* Retro sun background */}
                    <div className="absolute inset-x-0 top-10 aspect-square rounded-full bg-gradient-to-b from-[#ff355e] via-[#fd5b21] to-[#ff9933] mx-4 pointer-events-none opacity-60"></div>
                    <div className="relative overflow-hidden mix-blend-screen rounded-t-full mt-4 brightness-125 sepia-[0.2]">{renderMedia(imageClassName + " rounded-t-full")}</div>
                    <div className="text-center mt-3 z-10 relative">
                       <span className="font-sans font-black italic tracking-tighter text-[#ff9933] text-lg uppercase">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 28: // Checkerboard Note
               CardVariant = (
                 <div className="bg-white p-2 shadow-xl relative group">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)", backgroundPosition: "0 0, 10px 10px", backgroundSize: "20px 20px" }}></div>
                    <div className="relative overflow-hidden border-2 border-black/10 shadow-inner">{renderMedia()}</div>
                    <div className="mt-2 text-center bg-teal-400 text-white font-bold py-1 w-[80%] mx-auto -rotate-2 rounded shadow-sm border border-black/5">
                       <span className="font-sans text-xs">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 29: // Floral Edge
               CardVariant = (
                 <div className="bg-[#FDFBF7] p-2 shadow-lg relative group rounded-md border border-[#E9E4D4]">
                    <div className="absolute -top-3 -right-3 text-4xl opacity-50 rotate-[30deg]">🌸</div>
                     <div className="absolute -bottom-3 -left-3 text-4xl opacity-50 rotate-[-15deg]">🌺</div>
                    <div className="relative overflow-hidden rounded-sm ring-1 ring-rose-900/10 m-2">{renderMedia()}</div>
                    <div className="w-full text-center pb-1">
                       <span className="font-serif italic text-rose-900/70 text-sm">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 30: // Blueprint
               CardVariant = (
                 <div className="bg-[#10377A] p-3 shadow-lg relative group border border-[#10377A]">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "15px 15px" }}></div>
                    <div className="relative overflow-hidden border border-white/50 p-1 bg-[#10377A] saturate-50 contrast-125 sepia-[0.3] hue-rotate-[190deg]">{renderMedia()}</div>
                    <div className="mt-2 flex justify-between border-b border-t border-white/30 py-1">
                       <span className="font-mono text-white/80 text-[9px] uppercase tracking-widest">{complimentText}</span>
                    </div>
                 </div>
               ); break;
            case 31: // Soft Film Strip
               CardVariant = (
                 <div className="bg-black/95 p-1 pb-4 shadow-2xl relative group rounded-[4px]">
                    <div className="flex justify-around py-1">
                       {[...Array(6)].map((_, i) => <div key={i} className="w-2 h-1 bg-white/20 rounded-sm"></div>)}
                    </div>
                    <div className="relative overflow-hidden mx-1">{renderMedia()}</div>
                    <div className="flex justify-around py-1 mb-2">
                       {[...Array(6)].map((_, i) => <div key={i} className="w-2 h-1 bg-white/20 rounded-sm"></div>)}
                    </div>
                    <div className="w-full text-center">
                       <span className="font-sans text-white/50 text-[10px] tracking-widest uppercase">{complimentText}</span>
                    </div>
                 </div>
               ); break;
          }
          
          return (
            <motion.div
              key={item.public_id}
              initial={{ opacity: 0, scale: 0.95, y: 30, rotate: rotation }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx % 10 * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02, rotate: 0, zIndex: 10, transition: { duration: 0.2 } }}
              className="break-inside-avoid relative cursor-pointer group mb-6 md:mb-8"
              onClick={() => setSelectedIdx(idx)}
            >
              {CardVariant}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <GalleryLightbox
            items={items}
            selectedIdx={selectedIdx!}
            setSelectedIdx={setSelectedIdx}
            nextItem={nextItem}
            prevItem={prevItem}
          />
        )}
      </AnimatePresence>

      <div className="mt-16 text-center relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4">
         <Link 
            href="/envelope"
            className="inline-block px-8 py-3 rounded-full bg-slate-800/30 hover:bg-slate-800/50 text-slate-300 font-medium backdrop-blur-md transition-all border border-slate-700/50"
         >
            kembali ke surat
         </Link>
         <Link 
            href="/photobooth"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
         >
            lanjut ke photobooth
         </Link>
      </div>
    </>
  );
}
