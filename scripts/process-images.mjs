// Einmaliges Skript: Original-JPGs unter public/assets/images/ auf Zielbreite
// bringen und als WebP ablegen. Nicht Teil des Angular-Builds.
import sharp from 'sharp';
import { stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const imagesDir = path.resolve('public/assets/images');
const maxBytes = 250 * 1024;

const jobs = [
  { file: 'hero.jpg', width: 1600 },
  { file: 'ueber-uns.jpg', width: 1200 },
  { file: 'ref-rohbau.jpg', width: 1200 },
  { file: 'ref-trockenbau.jpg', width: 1200 },
  { file: 'ref-sanierung.jpg', width: 1200 },
  { file: 'ref-innenausbau.jpg', width: 1200 },
  { file: 'ref-strassenbau.jpg', width: 1200 },
  { file: 'ref-forst.jpg', width: 1200 },
  { file: 'karriere.jpg', width: 1200 },
];

for (const { file, width } of jobs) {
  const input = path.join(imagesDir, file);
  const output = path.join(imagesDir, file.replace(/\.jpg$/i, '.webp'));

  let quality = 80;
  let buffer;
  do {
    buffer = await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    quality -= 5;
  } while (buffer.byteLength > maxBytes && quality >= 40);

  await writeFile(output, buffer);
  if (buffer.byteLength > maxBytes) {
    console.warn(`WARNUNG: ${path.basename(output)} bleibt bei q=40 über 250 KB (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
  }
  const { size } = await stat(output);
  console.log(`${file} -> ${path.basename(output)}: ${(size / 1024).toFixed(1)} KB (q=${quality + 5})`);
}
