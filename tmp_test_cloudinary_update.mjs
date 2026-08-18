import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

// Try to parse .env.local
const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function run() {
  try {
    // 1. Get first image from galeri
    const resList = await cloudinary.api.resources({ type: 'upload', prefix: 'galeri/', max_results: 1, context: true });
    if (resList.resources.length === 0) {
      console.log('No resources found');
      return;
    }
    
    const resource = resList.resources[0];
    console.log('Original resource:', resource.public_id);
    console.log('Original context:', resource.context);

    // 2. Try to update context
    const updateRes = await cloudinary.api.update(resource.public_id, {
      resource_type: resource.resource_type,
      context: 'order=777'
    });
    console.log('Update response context:', updateRes.context);

    // 3. fetch again to be absolutely sure
    const checkRes = await cloudinary.api.resource(resource.public_id, {
       resource_type: resource.resource_type,
       context: true
    });
    console.log('Checked context:', checkRes.context);
  } catch (err) {
    console.error(err);
  }
}
run();
