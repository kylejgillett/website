// Makes the small WebP copies the photo gallery grid shows. Clicking a photo still opens the original.
// Run `npm run thumbs` after adding photos to public/images_gallery. Existing thumbnails are kept
// unless the original is newer, and thumbnails whose original is gone are removed.
import { mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, parse, resolve } from "node:path";
import sharp from "sharp";

const WIDTH = 720; // The grid shows about 334 px wide, so this stays sharp on high-resolution screens.
const QUALITY = 80;

const sourceDirectory = resolve("public/images_gallery");
const thumbDirectory = resolve("public/images_gallery_thumbs");
mkdirSync(thumbDirectory, { recursive: true });

const photos = readdirSync(sourceDirectory).filter((filename) => /\.(jpe?g|png|webp)$/i.test(filename));
const expected = new Set(photos.map((filename) => `${parse(filename).name}.webp`));

let made = 0;
for (const filename of photos) {
  const source = join(sourceDirectory, filename);
  const thumb = join(thumbDirectory, `${parse(filename).name}.webp`);
  let upToDate = false;
  try {
    upToDate = statSync(thumb).mtimeMs >= statSync(source).mtimeMs;
  } catch {}
  if (upToDate) continue;
  await sharp(source).rotate().resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(thumb);
  made += 1;
}

let removed = 0;
for (const filename of readdirSync(thumbDirectory)) {
  if (expected.has(filename)) continue;
  rmSync(join(thumbDirectory, filename));
  removed += 1;
}

console.log(`${made} made, ${removed} removed, ${photos.length} photos`);
