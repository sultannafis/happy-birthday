import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const fetchResources = async (folder: string, resourceType: string) => {
      try {
        const res = await cloudinary.api.resources({
          type: 'upload',
          prefix: `${folder}/`,
          max_results: 100,
          resource_type: resourceType,
          context: true,
        });
        return res.resources.map((r: any) => {
          let rawOrder, rawCrop;
          if (r.context && r.context.custom) {
            rawOrder = r.context.custom.order || r.context.custom['custom.order'];
            rawCrop = r.context.custom.crop;
          }
          return {
            public_id: r.public_id,
            secure_url: r.secure_url,
            resource_type: r.resource_type,
            created_at: r.created_at,
            order: rawOrder !== undefined && !isNaN(parseInt(rawOrder, 10))
              ? parseInt(rawOrder, 10)
              : 999,
            crop: rawCrop || null,
          };
        });
      } catch (err) {
        console.error(`Gagal fetch ${folder} ${resourceType}:`, err);
        return [];
      }
    };

    const [galeriImages, galeriVideos, photoboothImages, photoboothVideos] = await Promise.all([
      fetchResources('galeri', 'image'),
      fetchResources('galeri', 'video'),
      fetchResources('photobooth', 'image'),
      fetchResources('photobooth', 'video'),
    ]);

    const galeri = [...galeriImages, ...galeriVideos].sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    const photobooth = [...photoboothImages, ...photoboothVideos].sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return NextResponse.json({ galeri, photobooth });
  } catch (error) {
    console.error('Fetch media error:', error);
    return NextResponse.json({ error: 'Gagal fetch data' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { public_id, resourceType } = await request.json();

    if (!public_id) {
      return NextResponse.json({ error: 'public_id diperlukan' }, { status: 400 });
    }

    // destroy Cloudinary resource
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: resourceType || 'image',
      invalidate: true // pastikan cdn cache milik cloudinary dihapus
    });

    if (result.result === 'ok' || result.result === 'not found') {
      // Revalidate cache next.js untuk halaman publik
      revalidatePath('/gallery');
      revalidatePath('/photobooth');

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Gagal menghapus media dari Cloudinary' }, { status: 500 });
    }
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json({ error: 'Gagal hapus data internal' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { public_id, resourceType, order, crop } = await request.json();

    if (!public_id || (order === undefined && crop === undefined)) {
      return NextResponse.json({ error: 'public_id dan minimal salah satu order / crop diperlukan' }, { status: 400 });
    }

    const type = resourceType || 'image';

    const contexts = [];
    if (order !== undefined) contexts.push(`order=${order}`);
    if (crop !== undefined) contexts.push(`crop=${crop}`); // Format crop misal: "10,20,500,400"

    const result = await cloudinary.uploader.add_context(contexts.join('|'), [public_id], {
      resource_type: type,
      type: 'upload'
    });

    if (result) {
      revalidatePath('/gallery');
      revalidatePath('/photobooth');
      revalidatePath('/admin');
      return NextResponse.json({ success: true, order });
    } else {
      return NextResponse.json({ error: 'Gagal mengupdate context metadata' }, { status: 500 });
    }
  } catch (error) {
    console.error('Patch media error:', error);
    return NextResponse.json({ error: 'Gagal update urutan data internal' }, { status: 500 });
  }
}
