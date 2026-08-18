"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "@/components/GalleryGrid";

interface GalleryLightboxProps {
  items: MediaItem[];
  selectedIdx: number;
  setSelectedIdx: (idx: number | null) => void;
  nextItem: (e: React.MouseEvent) => void;
  prevItem: (e: React.MouseEvent) => void;
}

export default function GalleryLightbox({
  items,
  selectedIdx,
  setSelectedIdx,
  nextItem,
  prevItem,
}: GalleryLightboxProps) {
  const selectedItem = items[selectedIdx];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={() => setSelectedIdx(null)}
    >
      <button
        onClick={() => setSelectedIdx(null)}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={prevItem}
            className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextItem}
            className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full max-h-[85vh] mx-4 md:mx-24 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {selectedItem.resource_type === "video" ? (
          <video
            src={selectedItem.secure_url}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl ring-1 ring-white/20"
          />
        ) : (
          <Image
            src={selectedItem.secure_url}
            alt="Kenangan (Diperbesar)"
            width={selectedItem.width}
            height={selectedItem.height}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/20"
            quality={90}
            priority
          />
        )}
      </motion.div>
    </motion.div>
  );
}
