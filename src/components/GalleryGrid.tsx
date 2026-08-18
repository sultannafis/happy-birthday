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
          // Kumpulan pujian untuk PAP/fotonya
          const compliments = [
            "Cantik paripurna",
            "My favorite PAP ❤️",
            "Cantik banget astaga..",
            "Gemes bangettt",
            "Lucunya pacarku",
            "Sweetest smile 😊",
            "Suka banget yang ini!",
            "Bidadariku",
            "Tatapannya itu lho..",
            "Aaa sayang banget",
            "Always pretty!",
            "MasyaAllah cantiknya",
            "My beautiful girl",
            "Bikin kangen terus",
            "Kesayanganku",
            "Kiyiyiiw ✨",
            "Paling manis sejagat"
          ];
          // Pakai variasi urutan supaya lebih terasa natural (gak teratur urutannya)
          const complimentText = compliments[(idx * 7 + 3) % compliments.length];

          // Rotasi dasar untuk layout asimetris
          const randomRotations = [-2, 1, -1.5, 2, -1, 1.5, -0.5, 0.5];
          const rotation = randomRotations[idx % randomRotations.length];
          
          const variant = idx % 5;
          const imageClassName = "w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out";
          const mediaUrl = item.resource_type === "video" ? item.secure_url.replace(/\.[^/.]+$/, ".jpg") : getCroppedUrl(item.secure_url, item.crop);

          // Render Media Element
          const renderMedia = (className = imageClassName) => (
            <>
              <Image
                src={mediaUrl}
                alt={`Kenangan ${idx + 1}`}
                width={item.width}
                height={item.height}
                className={className}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
                unoptimized={!!item.crop}
                loading="lazy"
              />
              {item.resource_type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-500">
                  <PlayCircle className="w-14 h-14 text-white/90 drop-shadow-lg scale-90 group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}
              {/* Glossy shine overlay universal */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay z-10"></div>
            </>
          );

          let CardVariant;

          // Variant 0: Classic Polaroid (White frame, washi tape, handwriting text)
          if (variant === 0) {
            CardVariant = (
              <div className="bg-white p-3 sm:p-4 rounded-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 bg-amber-200/60 backdrop-blur-md -rotate-3 z-20 shadow-sm rounded-sm pointer-events-none" />
                <div className="relative overflow-hidden rounded-sm">{renderMedia()}</div>
                <div className="h-10 w-full bg-white flex items-end justify-center mt-3 pb-1 relative">
                  <span className="font-caveat text-slate-700 text-2xl md:text-3xl font-semibold drop-shadow-sm">{complimentText}</span>
                </div>
              </div>
            );
          }
          // Variant 1: Cinematic Film (Dark frame, side dots, glowing text)
          else if (variant === 1) {
            CardVariant = (
              <div className="bg-zinc-950 p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden rounded-sm ring-1 ring-zinc-800">
                 {/* Decorative film holes */}
                <div className="absolute top-0 bottom-0 left-0 w-2 flex flex-col justify-between py-2 items-center opacity-30">
                  {Array.from({length: 8}).map((_, i) => <div key={i} className="w-1 h-1.5 bg-white rounded-sm"></div>)}
                </div>
                <div className="absolute top-0 bottom-0 right-0 w-2 flex flex-col justify-between py-2 items-center opacity-30">
                  {Array.from({length: 8}).map((_, i) => <div key={i} className="w-1 h-1.5 bg-white rounded-sm"></div>)}
                </div>
                
                <div className="relative overflow-hidden rounded-sm mx-1 ring-1 ring-white/10 contrast-[1.1] saturate-[1.1]">{renderMedia()}</div>
                
                <div className="w-full flex items-center justify-center mt-3 mb-1">
                  <span className="font-mono text-zinc-300 text-xs md:text-sm tracking-[0.1em] font-medium opacity-80 group-hover:opacity-100 transition-opacity uppercase">
                    {idx + 1} • {complimentText}
                  </span>
                </div>
              </div>
            );
          }
          // Variant 2: Elegant Float (Shadow prominent, rounded no-padding, overlay text)
          else if (variant === 2) {
            CardVariant = (
              <div className="rounded-2xl shadow-2xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-shadow duration-300 relative group overflow-hidden">
                <div className="absolute -top-4 -right-4 text-4xl z-20 drop-shadow-lg rotate-12 pointer-events-none opacity-80">🌸</div>
                <div className="relative overflow-hidden w-full h-full brightness-[1.05]">{renderMedia(imageClassName + " rounded-2xl")}</div>
                {/* Floating romantic text overlay inside image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end">
                  <span className="font-serif italic text-white/90 text-lg md:text-xl drop-shadow-md">{complimentText}</span>
                </div>
              </div>
            );
          }
          // Variant 3: Romantic Gold (Cream bg, gold double borders, elegant font)
          else if (variant === 3) {
            CardVariant = (
              <div className="bg-[#fffcf5] p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden border border-[#d4af37]/30">
                <div className="ring-1 ring-[#d4af37]/50 ring-offset-2 ring-offset-[#fffcf5] rounded-sm p-1">
                   <div className="relative overflow-hidden rounded-sm sepia-[.15]">{renderMedia()}</div>
                </div>
                <div className="w-full flex justify-center mt-5 mb-2 relative">
                  <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-[#d4af37]/20 -translate-y-1/2"></div>
                  <span className="font-serif bg-[#fffcf5] px-4 text-[#8a6a24] text-sm md:text-base italic z-10 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[90%]">
                    {complimentText}
                  </span>
                </div>
              </div>
            );
          }
          // Variant 4: Scrapbook Stitched (Textured bg, dashed lines, pin)
          else {
            CardVariant = (
              <div className="bg-[#f5ebd9] p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group overflow-hidden">
                {/* Scrapbook pin */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4)] z-30 pointer-events-none before:absolute before:w-1 before:h-1 before:bg-white/50 before:rounded-full before:top-0.5 before:left-0.5" />
                
                <div className="border border-dashed border-[#b89f81] p-2 mt-2">
                   <div className="relative overflow-hidden rounded-sm rotate-1 scale-[0.98] group-hover:rotate-0 group-hover:scale-100 transition-all duration-500 bg-white p-1 pb-4 shadow-sm">
                      {renderMedia()}
                      <div className="text-center mt-2 font-handwriting text-[#5e4b3c] text-[1.35rem] leading-none mb-1">{complimentText}</div>
                   </div>
                </div>
              </div>
            );
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
