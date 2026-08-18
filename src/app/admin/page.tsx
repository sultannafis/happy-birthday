"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Film, Loader2, Image as ImageIcon, PlusCircle, Check, Crop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CropModal from "@/components/admin/CropModal";

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  resource_type: string;
  created_at: string;
  order: number;
};

export default function AdminDashboardPage() {
  const [galeri, setGaleri] = useState<CloudinaryResource[]>([]);
  const [photobooth, setPhotobooth] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"galeri" | "photobooth">("galeri");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [tempOrders, setTempOrders] = useState<Record<string, number>>({});
  const [croppingMedia, setCroppingMedia] = useState<CloudinaryResource | null>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/media?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (res.ok) {
        setGaleri(data.galeri || []);
        setPhotobooth(data.photobooth || []);
      }
    } catch (err) {
      console.error("Gagal fetch media", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = async (public_id: string, resourceType: string) => {
    if (!confirm("Yakin ingin menghapus media ini? Tindakan ini tidak bisa dibatalkan.")) return;
    
    setDeletingId(public_id);
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id, resourceType }),
      });
      if (res.ok) {
        // Hapus dari state agar UI instan
        if (activeTab === "galeri") {
          setGaleri(galeri.filter(g => g.public_id !== public_id));
        } else {
          setPhotobooth(photobooth.filter(p => p.public_id !== public_id));
        }
      } else {
        alert("Gagal menghapus media.");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateOrder = async (public_id: string, resourceType: string, newOrder: number) => {
    setUpdatingOrder(public_id);
    try {
      const res = await fetch("/api/admin/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id, resourceType, order: newOrder }),
      });
      if (res.ok) {
        fetchMedia(); // Refresh untuk mendapatkan urutan array terbaru
        // Hapus temp state agar UI kembali pakai media.order
        const newTemps = { ...tempOrders };
        delete newTemps[public_id];
        setTempOrders(newTemps);
      } else {
        alert("Gagal update urutan.");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem saat update urutan.");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const currentMedia = activeTab === "galeri" ? galeri : photobooth;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-8 font-sans pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
            <p className="text-slate-400">Kelola galeri foto dan photobooth di sini.</p>
          </div>
          <Link href="/admin/upload" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 flex items-center justify-center rounded-xl transition-colors font-medium w-max shadow-lg shadow-blue-500/25">
            <PlusCircle className="w-5 h-5 mr-2" />
            Upload Media Baru
          </Link>
        </div>
        
        {/* Tabs */}
        <div className="flex p-1 bg-slate-800 rounded-xl mb-6 w-max border border-slate-700">
          <button
            onClick={() => setActiveTab("galeri")}
            className={`px-6 py-2.5 rounded-lg flex items-center transition-all ${activeTab === "galeri" ? "bg-blue-600 text-white font-medium" : "text-slate-400 hover:text-white"}`}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Galeri ({galeri.length})
          </button>
          <button
            onClick={() => setActiveTab("photobooth")}
            className={`px-6 py-2.5 rounded-lg flex items-center transition-all ${activeTab === "photobooth" ? "bg-purple-600 text-white font-medium" : "text-slate-400 hover:text-white"}`}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Photobooth ({photobooth.length})
          </button>
        </div>

        {/* Media Grid */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 min-h-[50vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
              <p>Memuat media dari Cloudinary...</p>
            </div>
          ) : currentMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[40vh] text-slate-400">
              <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg mb-2 text-slate-300">Belum ada media di kategori ini</p>
              <p className="text-sm">Klik Upload Media Baru untuk menambah kumpulan memori.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence>
                {currentMedia.map((media) => (
                  <motion.div
                    key={media.public_id}
                    layout // Animate sorting / ordering automatically when item is deleted
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-700 group"
                  >
                    {media.resource_type === 'video' ? (
                      <div className="w-full h-full relative object-cover bg-slate-950">
                        {/* We use standard HTML5 video tag here for preview.  */}
                        <video src={media.secure_url} className="w-full h-full object-cover opacity-70" preload="metadata" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                          <Film className="w-8 h-8 text-white/90 drop-shadow-md" />
                        </div>
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={media.secure_url} alt={media.public_id} loading="lazy" className="w-full h-full object-cover" />
                    )}

                    {/* Overlay Action */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 pb-3">
                       <div className="flex gap-2 self-end">
                         {media.resource_type === 'image' && (
                           <button
                             onClick={() => setCroppingMedia(media)}
                             className="bg-blue-500/90 hover:bg-blue-500 text-white p-2 rounded-lg backdrop-blur-sm shadow-xl transition-all"
                             title="Titik Fokus / Crop Foto"
                           >
                             <Crop className="w-4 h-4" />
                           </button>
                         )}
                         <button
                           onClick={() => handleDelete(media.public_id, media.resource_type)}
                           disabled={deletingId === media.public_id}
                           className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-lg backdrop-blur-sm shadow-xl transition-all disabled:opacity-50"
                           title="Hapus media"
                         >
                           {deletingId === media.public_id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                         </button>
                       </div>

                       <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-lg border border-white/20 self-center shadow-lg w-full max-w-[120px] translate-y-2 group-hover:translate-y-0 transition-all">
                          <span className="text-[10px] text-white/80 font-medium pl-1">No:</span>
                          <input 
                             type="number"
                             value={tempOrders[media.public_id] ?? media.order}
                             onChange={(e) => setTempOrders({ ...tempOrders, [media.public_id]: parseInt(e.target.value) || 0 })}
                             className="w-full min-w-[20px] bg-transparent text-white text-xs font-bold text-center focus:outline-none border-x border-white/10 px-1 mx-1"
                          />
                          <button
                             onClick={() => handleUpdateOrder(media.public_id, media.resource_type, tempOrders[media.public_id] ?? media.order)}
                             disabled={updatingOrder === media.public_id || ((tempOrders[media.public_id] === undefined || tempOrders[media.public_id] === media.order))}
                             className="bg-emerald-500/90 hover:bg-emerald-500 text-white p-1 rounded-md transition-all disabled:opacity-20 disabled:scale-95 shadow"
                             title="Simpan Urutan"
                          >
                             {updatingOrder === media.public_id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      
      {croppingMedia && (
        <CropModal 
          isOpen={croppingMedia !== null}
          imageUrl={croppingMedia.secure_url}
          onClose={() => setCroppingMedia(null)}
          onSave={async (cropParams) => {
             const res = await fetch("/api/admin/media", {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ public_id: croppingMedia.public_id, resourceType: croppingMedia.resource_type, crop: cropParams }),
             });
             if (!res.ok) throw new Error("Gagal menyimpan metadata crop");
             fetchMedia();
          }}
        />
      )}
    </div>
  );
}
