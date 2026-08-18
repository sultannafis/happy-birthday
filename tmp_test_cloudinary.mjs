import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function run() {
  try {
    const res = await cloudinary.api.resources({ type: 'upload', prefix: 'galeri/', max_results: 1, context: true });
    console.log(JSON.stringify(res.resources[0].context, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();
