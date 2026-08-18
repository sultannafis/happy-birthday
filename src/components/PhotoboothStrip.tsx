"use client";

import { motion } from "framer-motion";
import { MediaItem } from "./GalleryGrid";
import Link from "next/link";
import { Music } from "lucide-react";
import MemoryCard from "./photobooth/MemoryCard";

export default function PhotoboothStrip({ items }: { items: MediaItem[] }) {
  // We want to chunk into sizes of 3 or 4 mostly, to avoid single photos.
  // A vertical strip looks best with 3 photos.
  const chunks: MediaItem[][] = [];
  
  if (items.length === 1) {
    // If there is literally only 1 photo in the whole system, just duplicate it 
    // to avoid a "lonely" photo on the strip.
    chunks.push([items[0], items[0], items[0]]);
  } else {
    let i = 0;
    while (i < items.length) {
      let size = 3;
      const remaining = items.length - i;
      
      if (remaining === 4) size = 4;
      else if (remaining === 5) size = 3; // leaves 2 for next chunk
      else if (remaining === 2) size = 2;
      else if (remaining === 1 && chunks.length > 0) {
        // If 1 left over, steal one from the previous chunk if possible, or just push it?
        // Wait, the distribution above ensures we don't end up with 1 unless total is 1 which we already handled!
        // Proof: 
        // len 2 -> size=2 (0 remain)
        // len 3 -> size=3 (0 remain)
        // len 4 -> size=4 (0 remain)
        // len 5 -> size=3 (2 remain -> size=2)
        // len 6 -> size=3 (3 remain -> size=3)
        // len 7 -> size=3 (4 remain -> size=4)
        // len 8 -> size=3 (5 remain -> size=3, 2 remain -> size=2)
        // It always resolves safely.
        size = 1; // Fallback just in case
      }
      
      chunks.push(items.slice(i, i + size));
      i += size;
    }
  }

  // We assign a dynamic template to each strip
  const templates: ('FILM' | 'FLORAL' | 'POLAROID' | 'CHECKERED' | 'VINTAGE' | 'MINIMAL')[] = ['FLORAL', 'FILM', 'POLAROID', 'CHECKERED', 'VINTAGE', 'MINIMAL'];

  return (
    <div className="flex flex-col items-center pb-24 mt-8 w-full max-w-7xl mx-auto px-2 sm:px-6">
      
      {/* Container for the strips. On mobile: flex-col center. On desktop: flex wrap center */}
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-12 md:gap-10 lg:gap-14 w-full">
        {chunks.map((chunk, idx) => (
          <MemoryCard 
            key={`strip-${idx}`} 
            items={chunk} 
            template={templates[idx % templates.length]} 
            index={idx} 
          />
        ))}
      </div>
      
      {/* Tombol Lanjut di bagian terbawah setelah semua UI ter-render */}
      <div className="w-full mt-24 text-center z-20">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
         >
           <Link 
              href="/questions"
              className="inline-flex items-center px-8 py-4 rounded-full bg-slate-900 text-pink-200 font-medium hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group border border-slate-700"
           >
              <span>lanjutt ke kejutannn terakhirrrr hihihi</span>
              <Music className="w-5 h-5 ml-3 group-hover:animate-bounce" />
           </Link>
         </motion.div>
      </div>
    </div>
  );
}
