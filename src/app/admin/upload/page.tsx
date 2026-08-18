"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle, Image as ImageIcon, Loader2, ArrowLeft, X, Film } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type PreviewData = {
  url: string;
  type: string;
  file: File;
  order: number;
};

export default function AdminUploadPage() {
  const [previews, setPreviews] = useState<PreviewData[]>([]);
  const [folder, setFolder] = useState<"galeri" | "photobooth">("galeri");
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      const newPreviews = newFiles.map((file, idx) => ({
        url: URL.createObjectURL(file),
        type: file.type,
        file: file,
        // Default order: berurutan dari jumlah yang sedang di-preview
        order: previews.length + idx + 1
      }));
      
      setPreviews(prev => [...prev, ...newPreviews]);
      setStatus("idle");
    }
  };

  const removeFile = (indexToRemove: number) => {
    setPreviews(prev => {
      const newPrev = [...prev];
      URL.revokeObjectURL(newPrev[indexToRemove].url);
      newPrev.splice(indexToRemove, 1);
      return newPrev;
    });
  };

  const updateOrder = (index: number, newOrder: number) => {
    setPreviews(prev => {
      const newPrev = [...prev];
      newPrev[index].order = newOrder;
      return newPrev;
    });
  };

  const handleUpload = async () => {
    if (previews.length === 0) return;
    setStatus("uploading");
    setErrorMessage("");

    try {
      // 1. Dapatkan signature dari server untuk setiap file karena context ordenya unik
      const uploadPromises = previews.map(async (preview) => {
        const sigRes = await fetch("/api/admin/cloudinary-sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            folder,
            context: `order=${preview.order}` 
          }),
        });

        if (!sigRes.ok) throw new Error("Gagal mendapatkan signature");
        const { signature, timestamp, cloudName, apiKey, folder: signedFolder } = await sigRes.json();

        const formData = new FormData();
        formData.append("file", preview.file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", signedFolder);
        // Menambahkan context order
        formData.append("context", `order=${preview.order}`);

        // Upload ke endpoint /auto/upload supaya bisa detect otomatis image/video
        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error?.message || `Gagal upload ${preview.file.name}`);
        }
        return uploadData;
      });

      await Promise.all(uploadPromises);

      setStatus("success");
      setPreviews([]);
      
      // Minta server render ulang halaman galeri/photobooth
      await fetch("/api/admin/revalidate", { method: "POST" });
      
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Terjadi kesalahan sistem saat upload");
    }
  };

  const resetForm = () => {
    setPreviews([]);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans pb-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Dashboard
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">Upload Foto & Video</h1>
        <p className="text-slate-400 mb-8">Pilih satu atau beberapa file media sekaligus untuk Galeri / Photobooth.</p>
        
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 md:p-8 shadow-xl">
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Upload File Berhasil!</h2>
              <p className="text-slate-400 mb-6">Semua media telah tersimpan di Cloudinary pada folder <strong>{folder}</strong> dan cache berhasil diperbarui.</p>
              <button 
                onClick={resetForm}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-medium transition-all"
              >
                Upload Lagi
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Pilihan Folder */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Kategori Tujuan</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFolder("galeri")}
                    className={`py-3 px-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      folder === "galeri" 
                        ? "bg-blue-600/20 border-blue-500 text-blue-400" 
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    <ImageIcon className="w-6 h-6 mb-2" />
                    <span className="font-medium">Galeri</span>
                  </button>
                  <button
                    onClick={() => setFolder("photobooth")}
                    className={`py-3 px-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      folder === "photobooth" 
                        ? "bg-purple-600/20 border-purple-500 text-purple-400" 
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    <ImageIcon className="w-6 h-6 mb-2" />
                    <span className="font-medium">Photobooth</span>
                  </button>
                </div>
              </div>

              {/* Area Upload File */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Pilih File (Bisa pilih banyak)</label>
                <div className="border-2 border-dashed border-slate-600 rounded-2xl p-8 md:p-12 text-center hover:bg-slate-800/50 hover:border-slate-400 transition-all relative cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={status === "uploading"}
                  />
                  <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-blue-400 mx-auto mb-4 transition-colors pointer-events-none" />
                  <p className="font-medium text-slate-300 group-hover:text-white transition-colors pointer-events-none">
                    Klik atau seret foto & video ke sini
                  </p>
                  <p className="text-sm text-slate-500 mt-1 pointer-events-none">Bisa multiple-select. Format (JPG, PNG, WEBP, MP4)</p>
                </div>
              </div>

              {/* Preview Grid */}
              {previews.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-slate-300 mb-4 border-b border-slate-700 pb-2">
                    {previews.length} File Terpilih
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <AnimatePresence>
                      {previews.map((preview, idx) => (
                        <motion.div 
                          key={preview.url}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 aspect-square group"
                        >
                          {preview.type.startsWith("video/") ? (
                            <div className="w-full h-full relative cursor-pointer">
                              <video src={preview.url} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Film className="w-8 h-8 text-white/80 drop-shadow-md" />
                              </div>
                            </div>
                          ) : (
                            <img src={preview.url} alt="Preview" className="w-full h-full object-cover" />
                          )}
                          
                          {status !== "uploading" && (
                            <>
                              <button 
                                onClick={() => removeFile(idx)}
                                className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 p-1.5 rounded-full backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10"
                                aria-label="Remove file"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-2 left-2 right-2 flex items-center bg-black/70 backdrop-blur-md rounded border border-white/20 p-1">
                                <label className="text-xs text-white/80 font-medium flex-1 px-1">Urutan:</label>
                                <input 
                                  type="number"
                                  value={preview.order}
                                  onChange={(e) => updateOrder(idx, parseInt(e.target.value) || 0)}
                                  className="w-12 text-center bg-transparent text-white font-medium text-xs focus:outline-none border-l border-white/20 px-1"
                                />
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Tombol Upload */}
              <button
                onClick={handleUpload}
                disabled={previews.length === 0 || status === "uploading"}
                className={`w-full py-4 rounded-xl flex justify-center items-center font-medium transition-all shadow-lg text-white ${
                  status === "uploading"
                    ? "bg-slate-700 cursor-not-allowed"
                    : previews.length === 0
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/25"
                }`}
              >
                {status === "uploading" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Mengunggah {previews.length} File...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-5 h-5 mr-2 box-content" />
                    Upload ke Folder {folder === "galeri" ? "Galeri" : "Photobooth"}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
