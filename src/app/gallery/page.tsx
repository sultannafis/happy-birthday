import { v2 as cloudinary } from 'cloudinary';
import GalleryGrid from '@/components/GalleryGrid';

export const revalidate = 3600;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getGalleryMedia() {
  const fetchResources = async (resourceType: string) => {
    try {
      const res = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'galeri/',
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
      console.error(`Gagal fetch galeri ${resourceType}:`, err);
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

export default async function GaleriPage() {
  const items = await getGalleryMedia();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 relative z-10">
       <div className="max-w-6xl mx-auto relative">
         <div className="text-center mb-16 relative">
            <h1 className="text-5xl md:text-6xl font-script text-gradient mb-6 leading-snug drop-shadow-sm">
              galeriii cantikmuuuuu
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto md:text-lg">
              kumpulannn pap dan foto-foto kamuuu yang paling akuuu sukaaaa. youuu alwayss look so prettyyyy, makanya aku kumpulin di siniii hihihi. klik pada foto untuk melihat lebih cerahh yaaa.
            </p>
         </div>

         {items.length === 0 ? (
           <div className="text-center py-20 text-slate-400">
             <p className="font-handwriting text-2xl text-slate-500">yahhhh koleksii fotoo tercantikkk masihh kosonggg nihh hummmm...</p>
           </div>
         ) : (
           <GalleryGrid items={items} />
         )}
       </div>
    </div>
  );
}
