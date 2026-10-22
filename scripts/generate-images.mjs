/**
 * Generates the Tenun Lestari brand images (favicon, social card and the
 * placeholder artwork used across the site) as original SVG/PNG files.
 *
 * Every image is drawn from simple geometric weaving motifs (ikat diamonds,
 * lurik stripes, songket stars, anyaman checks), so the site ships no
 * third-party photography. Re-run after changing a motif:
 *
 *   node scripts/generate-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(
  new URL('..', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
);

/* ------------------------------------------------------------------ */
/* Palette (hex approximations of the Tailwind tokens in global.css)   */
/* ------------------------------------------------------------------ */
export const C = {
  nila950: '#161735',
  nila900: '#20224d',
  nila800: '#282a61',
  nila700: '#313478',
  nila600: '#3d4193',
  nila500: '#5157ad',
  nila300: '#949ddc',
  nila100: '#dde1f6',
  ochre100: '#f8eccb',
  ochre200: '#f1dca0',
  ochre300: '#e8c773',
  ochre400: '#dcae4b',
  ochre500: '#cc9536',
  ochre600: '#b07a28',
  ochre700: '#8f6020',
  kapas: '#f6f1e7',
  kapasLight: '#fbf8f1',
  kapasDark: '#e7dcc7',
  soga: '#8a5a3b',
  sogaLight: '#b9875f',
  mengkudu: '#9e3b2f',
  daun: '#5d6b45',
};

/** Small deterministic PRNG so the artwork is stable between runs. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const svg = (w, h, body, defs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
  (defs ? `<defs>${defs}</defs>` : '') +
  body +
  `</svg>\n`;

/* ------------------------------------------------------------------ */
/* Motifs. Each returns a <pattern> definition with the given id.      */
/* ------------------------------------------------------------------ */

/** Ikat: stepped diamonds with "bleeding" edges, as in tied-and-dyed warp. */
export function ikat(id, { bg, fg, accent, size = 120 }) {
  const s = size;
  const h = s / 2;
  const step = s / 12;
  const stepped = (cx, cy, r, fill) => {
    let d = '';
    for (let i = 0; i < r / step; i++) {
      const y = i * step;
      const half = r - y;
      d += `<rect x="${cx - half}" y="${cy - y - step}" width="${half * 2}" height="${step}" fill="${fill}"/>`;
      d += `<rect x="${cx - half}" y="${cy + y}" width="${half * 2}" height="${step}" fill="${fill}"/>`;
    }
    return d;
  };
  return `<pattern id="${id}" width="${s}" height="${s}" patternUnits="userSpaceOnUse">
    <rect width="${s}" height="${s}" fill="${bg}"/>
    ${stepped(h, h, h * 0.92, fg)}
    ${stepped(h, h, h * 0.55, bg)}
    ${stepped(h, h, h * 0.3, accent)}
    ${stepped(0, 0, h * 0.35, accent)}${stepped(s, 0, h * 0.35, accent)}
    ${stepped(0, s, h * 0.35, accent)}${stepped(s, s, h * 0.35, accent)}
  </pattern>`;
}

/** Lurik: Javanese striped weave, irregular stripe widths. */
export function lurik(id, { colors, width = 240, seed = 7 }) {
  const rand = rng(seed);
  let x = 0;
  let rects = '';
  let i = 0;
  while (x < width) {
    const w = Math.max(3, Math.round(4 + rand() * 26));
    rects += `<rect x="${x}" y="0" width="${Math.min(w, width - x)}" height="40" fill="${colors[i % colors.length]}"/>`;
    x += w;
    i += 1 + Math.floor(rand() * 2);
  }
  return `<pattern id="${id}" width="${width}" height="40" patternUnits="userSpaceOnUse">${rects}</pattern>`;
}

/** Songket: eight-point stars of supplementary gold weft on a dark ground. */
export function songket(id, { bg, star, line, size = 90 }) {
  const s = size;
  const c = s / 2;
  const r = s * 0.28;
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI / 8) * i;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(
      `${(c + rr * Math.cos(a)).toFixed(1)},${(c + rr * Math.sin(a)).toFixed(1)}`
    );
  }
  return `<pattern id="${id}" width="${s}" height="${s}" patternUnits="userSpaceOnUse">
    <rect width="${s}" height="${s}" fill="${bg}"/>
    <polygon points="${pts.join(' ')}" fill="${star}"/>
    <rect x="${c - 3}" y="${c - 3}" width="6" height="6" fill="${bg}" transform="rotate(45 ${c} ${c})"/>
    <path d="M0 0 L${s} ${s} M${s} 0 L0 ${s}" stroke="${line}" stroke-width="1.5" opacity="0.55"/>
  </pattern>`;
}

/** Anyaman: basket-weave checks. */
export function anyaman(id, { a, b, edge, size = 48 }) {
  const s = size;
  const q = s / 2;
  return `<pattern id="${id}" width="${s}" height="${s}" patternUnits="userSpaceOnUse">
    <rect width="${s}" height="${s}" fill="${a}"/>
    <rect x="0" y="0" width="${q}" height="${q}" fill="${b}"/>
    <rect x="${q}" y="${q}" width="${q}" height="${q}" fill="${b}"/>
    <path d="M0 ${q / 3} H${q} M0 ${(2 * q) / 3} H${q} M${q + q / 3} 0 V${q} M${q + (2 * q) / 3} 0 V${q}
             M${q / 3} ${q} V${s} M${(2 * q) / 3} ${q} V${s} M${q} ${q + q / 3} H${s} M${q} ${q + (2 * q) / 3} H${s}"
          stroke="${edge}" stroke-width="1.2" opacity="0.5"/>
  </pattern>`;
}

/** The anyaman diamond used in the logo, centred at (cx, cy). */
export function logoMark(cx, cy, scale, { base, a, b }) {
  let cells = '';
  [-24, -8, 8, 24].forEach((x, i) =>
    [-24, -8, 8, 24].forEach((y, j) => {
      cells += `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" rx="2.5" fill="${(i + j) % 2 === 0 ? a : b}"/>`;
    })
  );
  return `<g transform="translate(${cx} ${cy}) scale(${scale}) rotate(45)">
    <rect x="-38" y="-38" width="76" height="76" rx="12" fill="${base}"/>${cells}</g>`;
}

/* ------------------------------------------------------------------ */
/* Outputs                                                             */
/* ------------------------------------------------------------------ */

const icon = (padding = 0) =>
  svg(
    512,
    512,
    `<rect width="512" height="512" rx="${padding ? 0 : 108}" fill="${C.nila800}"/>
     <rect width="512" height="512" rx="${padding ? 0 : 108}" fill="url(#ic)" opacity="0.18"/>
     ${logoMark(256, 256, padding ? 2.6 : 3.4, { base: C.ochre400, a: C.nila800, b: C.kapas })}`,
    songket('ic', {
      bg: C.nila800,
      star: C.ochre300,
      line: C.ochre400,
      size: 64,
    })
  );

const social = svg(
  1200,
  600,
  `<rect width="1200" height="600" fill="${C.nila900}"/>
   <rect y="470" width="1200" height="130" fill="url(#so)"/>
   <rect y="462" width="1200" height="8" fill="${C.ochre400}"/>
   <rect x="0" y="0" width="1200" height="36" fill="url(#lu)" opacity="0.9"/>
   ${logoMark(600, 250, 2.4, { base: C.ochre400, a: C.nila800, b: C.kapas })}`,
  songket('so', {
    bg: C.nila800,
    star: C.ochre400,
    line: C.ochre300,
    size: 65,
  }) +
    lurik('lu', {
      colors: [C.ochre400, C.nila700, C.kapas, C.soga, C.nila500],
      seed: 3,
    })
);

/** Edge bands for the announcement banner; the centre stays transparent. */
const bannerPattern = svg(
  1002,
  285,
  `<rect width="190" height="285" fill="url(#bp)"/>
   <rect x="190" width="10" height="285" fill="${C.ochre400}"/>
   <rect x="802" width="10" height="285" fill="${C.ochre400}"/>
   <rect x="812" width="190" height="285" fill="url(#bp)"/>`,
  songket('bp', {
    bg: C.nila700,
    star: C.ochre400,
    line: C.ochre300,
    size: 47.5,
  })
);

/** path -> SVG source; `.png` targets are rasterised with sharp. */
export const OUTPUTS = {
  'public/banner-pattern.svg': bannerPattern,
  'src/images/icon.svg': icon(),
  'src/images/icon.png': icon(),
  'src/images/icon-maskable.png': icon(1),
  'src/images/social.png': social,
};

async function main() {
  for (const [rel, source] of Object.entries(OUTPUTS)) {
    const out = resolve(ROOT, rel);
    await mkdir(dirname(out), { recursive: true });
    if (rel.endsWith('.svg')) {
      await writeFile(out, source);
    } else {
      const size = rel.includes('maskable') ? 1024 : undefined;
      let img = sharp(Buffer.from(source), { density: size ? 144 : 72 });
      if (size) img = img.resize(size, size);
      await img.png({ compressionLevel: 9 }).toFile(out);
    }
    console.log('wrote', rel);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
