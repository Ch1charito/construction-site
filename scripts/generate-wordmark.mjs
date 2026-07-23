// Einmaliges Skript: erzeugt die SVG-<path>-Konturen für die "BAUTISTA"-
// Wortmarke aus der echten Archivo-Bold-Glyphenform. Nicht Teil des Angular-
// Builds — Ausgabe wird von Hand in hero.component.html übernommen.
import opentype from 'opentype.js';
import { writeFile, readFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const FONT_URL = 'https://raw.githubusercontent.com/Omnibus-Type/Archivo/master/fonts/ttf/Archivo-Bold.ttf';
const TEXT = 'BAUTISTA';
const FONT_SIZE = 200;
const TRACKING = 0.08 * FONT_SIZE; // breit getrackt, wie .display-title in styles.scss

const tmpDir = await mkdtemp(path.join(tmpdir(), 'bautista-wordmark-'));
const fontPath = path.join(tmpDir, 'Archivo-Bold.ttf');

const res = await fetch(FONT_URL);
if (!res.ok) {
  throw new Error(`Font-Download fehlgeschlagen: ${res.status} ${res.statusText}`);
}
await writeFile(fontPath, Buffer.from(await res.arrayBuffer()));

const font = opentype.parse(await readFile(fontPath).then((b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)));

let x = 0;
const paths = [];
const ascender = font.ascender / font.unitsPerEm * FONT_SIZE;
const descender = font.descender / font.unitsPerEm * FONT_SIZE;

for (let i = 0; i < TEXT.length; i++) {
  const char = TEXT[i];
  const glyph = font.charToGlyph(char);
  const glyphPath = glyph.getPath(x, ascender, FONT_SIZE);
  paths.push(`  <path class="letter" style="--i:${i}" d="${glyphPath.toPathData(2)}" />`);
  x += glyph.advanceWidth / font.unitsPerEm * FONT_SIZE + TRACKING;
}

const width = Math.ceil(x - TRACKING);
const height = Math.ceil(ascender - descender);

const svg = `<svg class="wordmark" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n${paths.join('\n')}\n</svg>`;

console.log(svg);
console.log(`\n/* viewBox: 0 0 ${width} ${height} — ${TEXT.length} Buchstaben, --i von 0 bis ${TEXT.length - 1} */`);
