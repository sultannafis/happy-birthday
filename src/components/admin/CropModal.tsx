"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Loader2, X, Check } from "lucide-react";
import { type Point, type Area } from "react-easy-crop";

interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onSave: (cropParams: string) => Promise<void>;
}

export default function CropModal({ isOpen, onClose, imageUrl, onSave }: CropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    setIsSaving(true);
    // Format = "x,y,w,h"
    const params = `${Math.round(croppedAreaPixels.x)},${Math.round(croppedAreaPixels.y)},${Math.round(croppedAreaPixels.width)},${Math.round(croppedAreaPixels.height)}`;
    try {
       await onSave(params);
       onClose();
    } catch {
       alert("Gagal menyimpan crop!");
    } finally {
       setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10">
       <button onClick={onClose} disabled={isSaving} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10 disabled:opacity-50">
          <X className="w-6 h-6" />
       </button>
       <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative w-full h-full max-w-4xl border border-white/10 flex flex-col">
          <div className="text-center p-4 border-b border-white/10 bg-slate-800">
             <h2 className="text-xl font-bold text-white">Sesuaikan Potongan Foto</h2>
             <p className="text-slate-400 text-sm">Geser dan perbesar untuk mengatur titik fokus di layar. (Rasio 4:3 untuk Photobooth)</p>
          </div>
          
          <div className="relative flex-1 bg-black/50">
             <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
             />
          </div>

          <div className="p-4 md:p-6 bg-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10">
             <div className="flex items-center gap-4 w-full max-w-xs">
                <span className="text-white/70 text-sm font-medium">Zoom</span>
                <input 
                   type="range"
                   value={zoom}
                   min={1}
                   max={3}
                   step={0.1}
                   onChange={(e) => setZoom(Number(e.target.value))}
                   className="flex-1 accent-blue-500"
                />
             </div>
             
             <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
             >
                {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Check className="w-5 h-5 mr-2" />}
                Simpan Crop
             </button>
          </div>
       </div>
    </div>
  );
}
