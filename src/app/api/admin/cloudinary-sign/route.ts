import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { folder, context } = await request.json();
    
    // validasi folder
    if (!['galeri', 'photobooth'].includes(folder)) {
      return NextResponse.json({ error: 'Folder tidak valid' }, { status: 400 });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign: Record<string, any> = { timestamp, folder };
    if (context) paramsToSign.context = context;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ 
      timestamp, 
      signature, 
      folder, 
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY 
    });
  } catch (error) {
    console.error('Error generating signature:', error);
    return NextResponse.json({ error: 'Gagal membuat signature' }, { status: 500 });
  }
}
