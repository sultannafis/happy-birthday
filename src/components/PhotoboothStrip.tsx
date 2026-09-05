"use client";

import { motion } from "framer-motion";
import { MediaItem } from "./GalleryGrid";
import Link from "next/link";
import { Music } from "lucide-react";
import MemoryCard from "./photobooth/MemoryCard";

export default function PhotoboothStrip({ items }: { items: MediaItem[] }) {
  const chunks: MediaItem[][] = [];
  
  if (items.length === 1) {
    chunks.push([items[0], items[0], items[0]]);
  } else {
    let i = 0;
    while (i < items.length) {
      let size = 3;
      const remaining = items.length - i;
      
      if (remaining === 4) size = 4;
      else if (remaining === 5) size = 3;
      else if (remaining === 2) size = 2;
      else if (remaining === 1 && chunks.length > 0) {
        size = 1;
      }
      
      chunks.push(items.slice(i, i + size));
      i += size;
    }
  }

  const templates: ('FILM' | 'FLORAL' | 'POLAROID' | 'CHECKERED' | 'VINTAGE' | 'MINIMAL' | 'NEON' | 'HEARTS' | 'TICKET' | 'NOTEBOOK' | 'POPART' | 'HOLOGRAPHIC' | 'Y2K' | 'KRAFT' | 'MONOCHROME' | 'BLUEPRINT')[] = [
    'FLORAL', 'FILM', 'TICKET', 'HEARTS', 'POLAROID', 'NEON', 
    'CHECKERED', 'NOTEBOOK', 'VINTAGE', 'HOLOGRAPHIC', 'MINIMAL', 
    'POPART', 'Y2K', 'KRAFT', 'MONOCHROME', 'BLUEPRINT'
  ];

  return (
    <div className="flex flex-col items-center pb-24 mt-8 w-full max-w-7xl mx-auto px-2 sm:px-6">
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
