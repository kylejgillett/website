import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultSourceDirectory = "/mnt/c/Users/kjgil/OneDrive/EDITED PHOTOS/field_notes_photos";

function readOption(name, fallback) {
  const prefix = `--${name}=`;
  const argument = process.argv.find((value) => value.startsWith(prefix));
  return argument ? argument.slice(prefix.length) : fallback;
}

const sourceDirectory = path.resolve(readOption("source", defaultSourceDirectory));
const outputDirectory = path.resolve(readOption("output", path.join(scriptDirectory, "optimized")));

let entries;
try {
  entries = await readdir(sourceDirectory, { withFileTypes: true });
} catch (error) {
  console.error(`Could not read source directory: ${sourceDirectory}`);
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const images = entries.filter((entry) => entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name));
if (images.length === 0) {
  console.error(`No JPG or PNG images found in: ${sourceDirectory}`);
  process.exit(1);
}

await mkdir(outputDirectory, { recursive: true });

let originalBytes = 0;
let webpBytes = 0;
for (const image of images) {
  const inputPath = path.join(sourceDirectory, image.name);
  const outputPath = path.join(outputDirectory, `${path.parse(image.name).name}.webp`);

  await sharp(inputPath)
    .rotate()
    .resize({ width: 900, height: 1100, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(outputPath);

  originalBytes += (await stat(inputPath)).size;
  webpBytes += (await stat(outputPath)).size;
  console.log(`Converted ${image.name}`);
}

const megabytes = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(`\nConverted ${images.length} images.`);
console.log(`Originals: ${megabytes(originalBytes)} MB`);
console.log(`WebP files: ${megabytes(webpBytes)} MB`);
console.log(`Output: ${outputDirectory}`);
