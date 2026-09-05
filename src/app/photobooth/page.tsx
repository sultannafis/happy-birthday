import { v2 as cloudinary } from 'cloudinary';
import PhotoboothStrip from '@/components/PhotoboothStrip';

export const revalidate = 3600;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getPhotoboothMedia() {
  const fetchResources = async (resourceType: string) => {
    try {
      const res = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'photobooth/',
        max_results: 100,
        resource_type: resourceType,
        context: true,
      });
        return res.resources.map((r: any) => {
          let rawOrder, rawCrop;
          if (r.context && r.context.custom) {
            rawOrder = r.context.custom.order || r.context.custom['custom.order'];
            rawCrop = r.context.custom.crop || r.context.custom['custom.crop'];
          }
          return {
            public_id: r.public_id,
            secure_url: r.secure_url,
            resource_type: r.resource_type,
            width: r.width,
            height: r.height,
            created_at: r.created_at,
            order: rawOrder !== undefined && !isNaN(parseInt(rawOrder, 10)) ? parseInt(rawOrder, 10) : 999,
            crop: rawCrop || null,
          };
        });
    } catch (err) {
      console.error(`Gagal fetch photobooth ${resourceType}:`, err);
      return [];
    }
  };

  const images = await fetchResources('image');
  const videos = await fetchResources('video');

  const all = [...images, ...videos].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return all;
}

export default async function PhotoboothPage() {
  const items = await getPhotoboothMedia();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 relative z-10 overflow-hidden">
        {/* Soft magical background specific to photobooth */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 via-sky-100/60 to-purple-200/40 -z-10 backdrop-blur-3xl" />
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none -z-10" style={{ backgroundImage: "radial-gradient(#234e70 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
       
       <div className="max-w-7xl mx-auto relative">
         <div className="text-center mb-4 relative z-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script text-gradient mb-6 font-bold drop-shadow-sm leading-snug p-2 max-w-full break-words">
              photooboothh kitaaaa hihihi
            </h1>
            <p className="text-slate-700 max-w-xl mx-auto md:text-lg font-medium bg-white/40 p-4 rounded-2xl backdrop-blur-sm border border-white/50 shadow-sm leading-relaxed">
              mukaa konyolll, senyummm manissss, dan tawaaa lepas kitaaa diabadikan dalam lembaran film abadiii ini hihihi 📸✨
            </p>
         </div>

         {items.length === 0 ? (
           <div className="text-center py-24">
             <div className="inline-block bg-white/50 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/50 shadow-sm text-slate-500">
                <p className="font-handwriting text-3xl">strip photo booth kitaa masih kosong nih!</p>
             </div>
           </div>
         ) : (
           <PhotoboothStrip items={items} />
         )}
       </div>
    </div>
  );
}
