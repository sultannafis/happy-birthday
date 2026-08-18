const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const fs = require('fs');

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
    const resList = await cloudinary.api.resources({ type: 'upload', prefix: 'photobooth/', max_results: 5, context: true });
    resList.resources.forEach(r => {
       let rawCrop = null;
       if (r.context && r.context.custom) {
         rawCrop = r.context.custom.crop;
       }
       console.log(r.public_id, " => ", rawCrop);
    });
  } catch (err) {
    console.error(err);
  }
}
run();
