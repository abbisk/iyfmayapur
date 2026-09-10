import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const targetFolder = 'mayapur';

const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing Cloudinary credentials. Set the following in your .env file:');
  console.error('VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.error('CLOUDINARY_API_KEY=your_api_key');
  console.error('CLOUDINARY_API_SECRET=your_api_secret');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

function getFilesRecursively(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function toRelativePublicPath(filePath) {
  return path.relative(publicDir, filePath).split(path.sep).join('/');
}

async function uploadFile(filePath) {
  const relativePath = toRelativePublicPath(filePath);
  const publicIdWithoutExtension = relativePath.replace(/\.[^/.]+$/, '');
  const normalizedPublicId = publicIdWithoutExtension.startsWith(`${targetFolder}/`)
    ? publicIdWithoutExtension.slice(targetFolder.length + 1)
    : publicIdWithoutExtension;

  const publicId = `${targetFolder}/${normalizedPublicId}`;

  await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    folder: targetFolder,
    resource_type: 'image',
    overwrite: false,
    invalidate: true,
  });

  console.log(`Uploaded: ${relativePath} -> ${publicId}`);
}

async function main() {
  if (!fs.existsSync(publicDir)) {
    console.error(`Public directory not found: ${publicDir}`);
    process.exit(1);
  }

  const files = getFilesRecursively(publicDir)
    .filter((file) => /\.(png|jpe?g|webp|gif|svg|avif|bmp)$/i.test(file));

  if (!files.length) {
    console.warn(`No image files found in ${publicDir}`);
    return;
  }

  console.log(`Uploading ${files.length} files to Cloudinary folder: ${targetFolder}`);

  for (const file of files) {
    try {
      await uploadFile(file);
    } catch (error) {
      console.error(`Failed to upload ${toRelativePublicPath(file)}`);
      console.error(error.message || error);
    }
  }

  console.log('Bulk upload completed.');
}

main();
