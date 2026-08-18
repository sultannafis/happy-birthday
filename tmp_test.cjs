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
    const resList = await cloudinary.api.resources({ type: 'upload', prefix: 'galeri/', max_results: 1, context: true });
    if (resList.resources.length === 0) { console.log('not found'); return; }
    
    let res = resList.resources[0];
    console.log('GET 1 context:', res.context);

    // Try set context
    const updateRes = await cloudinary.api.update(res.public_id, {
      context: 'order=777' // or 'custom.order=777' or what? let's see what happens with 'order=777'
    });
    console.log('Update result context:', updateRes.context);

    const updateRes2 = await cloudinary.api.update(res.public_id, {
      context: 'custom_order=888' 
    });
    console.log('Update result 2 context:', updateRes2.context);

    const updateRes3 = await cloudinary.uploader.explicit(res.public_id, {
        type: "upload",
        context: "custom.order=900|order=900"
    });
    console.log('Explicit update result:', updateRes3.context);
  } catch (err) {
    console.error(err);
  }
}
run();
