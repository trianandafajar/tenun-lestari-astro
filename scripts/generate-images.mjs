/**
 * Generates the Tenun Lestari brand images (favicon, social card and the
 * placeholder artwork used across the site). Each image is drawn as SVG and,
 * except for the favicon SVG and banner pattern, rasterised to PNG/WebP so
 * the Astro build never has to process SVG sources.
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

/* ------------------------------------------------------------------ */
/* Scene helpers for the site artwork                                  */
/* ------------------------------------------------------------------ */

/** Pattern presets, keyed so scenes can mix and match them. */
const PATTERNS = {
  ikatNila: id =>
    ikat(id, { bg: C.nila700, fg: C.kapas, accent: C.ochre400, size: 132 }),
  ikatSoga: id =>
    ikat(id, { bg: C.soga, fg: C.kapas, accent: C.nila800, size: 110 }),
  ikatKunyit: id =>
    ikat(id, { bg: C.ochre400, fg: C.nila800, accent: C.kapas, size: 120 }),
  lurikKunyit: (id, seed = 11) =>
    lurik(id, {
      colors: [C.ochre400, C.ochre200, C.soga, C.ochre500, C.kapas],
      seed,
    }),
  lurikNila: (id, seed = 5) =>
    lurik(id, {
      colors: [C.nila700, C.nila500, C.kapas, C.nila900, C.ochre400],
      seed,
    }),
  songketEmas: id =>
    songket(id, {
      bg: C.nila800,
      star: C.ochre400,
      line: C.ochre300,
      size: 84,
    }),
  songketMerah: id =>
    songket(id, {
      bg: C.mengkudu,
      star: C.ochre300,
      line: C.ochre200,
      size: 76,
    }),
  anyamanKapas: id =>
    anyaman(id, { a: C.kapas, b: C.kapasDark, edge: C.soga, size: 44 }),
  anyamanNila: id =>
    anyaman(id, { a: C.nila100, b: C.nila300, edge: C.nila700, size: 44 }),
};

const SHADE = `<linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#fff" stop-opacity="0.18"/>
  <stop offset="0.45" stop-color="#fff" stop-opacity="0"/>
  <stop offset="1" stop-color="#000" stop-opacity="0.22"/>
</linearGradient>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
  <feGaussianBlur stdDeviation="14"/>
</filter>`;

/**
 * Builds a scene: `layers` are drawn on a plain background, and every
 * pattern preset named in `uses` is registered as `p-<name>`.
 */
function scene(w, h, bg, uses, layers) {
  const defs = SHADE + uses.map(name => PATTERNS[name](`p-${name}`)).join('');
  return svg(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>${layers}`,
    defs
  );
}

/** A rectangle of cloth with a soft shadow, fold shading and fringes. */
function cloth(x, y, w, h, rot, pattern, { fringe = false, border } = {}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  let fringes = '';
  if (fringe) {
    for (let fx = x + 6; fx < x + w - 4; fx += 9) {
      fringes += `<path d="M${fx} ${y + h} l${(fx % 3) - 1} 26" stroke="${C.kapasDark}" stroke-width="3" stroke-linecap="round"/>`;
    }
  }
  const edge = border
    ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${border}" stroke-width="14"/>`
    : '';
  return `<g transform="rotate(${rot} ${cx} ${cy})">
    <rect x="${x + 18}" y="${y + 26}" width="${w}" height="${h}" fill="#000" opacity="0.22" filter="url(#soft)"/>
    ${fringes}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#p-${pattern})"/>
    ${edge}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#shade)"/>
  </g>`;
}

/** A stack of folded cloths seen from the front. */
function foldedStack(x, y, w, layers) {
  let out = '';
  let top = y;
  for (const [pattern, h] of layers) {
    out += `<rect x="${x + 10}" y="${top + 14}" width="${w}" height="${h}" rx="18" fill="#000" opacity="0.2" filter="url(#soft)"/>
      <rect x="${x}" y="${top}" width="${w}" height="${h}" rx="18" fill="url(#p-${pattern})"/>
      <rect x="${x}" y="${top}" width="${w}" height="${h}" rx="18" fill="url(#shade)"/>
      <path d="M${x + 18} ${top + h * 0.5} H${x + w - 18}" stroke="#000" stroke-opacity="0.12" stroke-width="3"/>`;
    top += h - 6;
  }
  return out;
}

/** A simple frame loom with warp threads and a partly woven band. */
function loom(x, y, w, h, wovenPattern) {
  let warp = '';
  for (let wx = x + 40; wx <= x + w - 40; wx += 14) {
    warp += `<line x1="${wx}" y1="${y + 40}" x2="${wx}" y2="${y + h - 40}" stroke="${C.kapas}" stroke-width="2.4" opacity="0.9"/>`;
  }
  const wovenTop = y + h * 0.55;
  return `<rect x="${x + 16}" y="${y + 24}" width="${w}" height="${h}" rx="10" fill="#000" opacity="0.25" filter="url(#soft)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="${C.soga}" stroke-width="34"/>
    <rect x="${x - 30}" y="${y - 6}" width="${w + 60}" height="34" rx="12" fill="${C.sogaLight}"/>
    <rect x="${x - 30}" y="${y + h - 28}" width="${w + 60}" height="34" rx="12" fill="${C.sogaLight}"/>
    ${warp}
    <rect x="${x + 34}" y="${wovenTop}" width="${w - 68}" height="${y + h - 46 - wovenTop}" fill="url(#p-${wovenPattern})"/>
    <rect x="${x + 34}" y="${wovenTop}" width="${w - 68}" height="${y + h - 46 - wovenTop}" fill="url(#shade)"/>
    <rect x="${x + 20}" y="${wovenTop - 34}" width="${w - 40}" height="20" rx="10" fill="${C.ochre600}"/>
    <path d="M${x + w * 0.3} ${wovenTop - 70} q${w * 0.2} -26 ${w * 0.4} 0 l-14 18 q${-w * 0.18} -18 ${-w * 0.37} 0 Z" fill="${C.ochre300}"/>`;
}

/** Skeins of naturally dyed yarn. */
function skeins(x, y, colors, r = 90) {
  return colors
    .map((color, i) => {
      const cx = x + i * r * 1.9;
      let wraps = '';
      for (let k = -r + 14; k < r - 10; k += 12) {
        wraps += `<path d="M${cx + k} ${y - r * 0.55} q8 ${r * 0.55} 0 ${r * 1.1}" stroke="#000" stroke-opacity="0.13" stroke-width="3" fill="none"/>`;
      }
      return `<ellipse cx="${cx + 12}" cy="${y + 22}" rx="${r}" ry="${r * 0.62}" fill="#000" opacity="0.2" filter="url(#soft)"/>
        <ellipse cx="${cx}" cy="${y}" rx="${r}" ry="${r * 0.6}" fill="${color}"/>${wraps}
        <ellipse cx="${cx}" cy="${y}" rx="${r * 0.32}" ry="${r * 0.18}" fill="#000" opacity="0.25"/>`;
    })
    .join('');
}

/** Dye pots seen from above. */
function dyePots(x, y, colors, r = 150) {
  return colors
    .map(([color, rim], i) => {
      const cx = x + (i % 2) * r * 2.3 + (i > 1 ? r * 1.15 : 0);
      const cy = y + Math.floor(i / 2) * r * 2;
      return `<circle cx="${cx + 16}" cy="${cy + 24}" r="${r}" fill="#000" opacity="0.22" filter="url(#soft)"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="${rim}"/>
        <circle cx="${cx}" cy="${cy}" r="${r * 0.82}" fill="${color}"/>
        <ellipse cx="${cx - r * 0.25}" cy="${cy - r * 0.3}" rx="${r * 0.3}" ry="${r * 0.12}" fill="#fff" opacity="0.18"/>`;
    })
    .join('');
}

/** Grid paper with a stepped ikat diamond sketched in pencil. */
function sketch(w, h) {
  let grid = '';
  for (let gx = 0; gx <= w; gx += 40) {
    grid += `<line x1="${gx}" y1="0" x2="${gx}" y2="${h}" stroke="${C.nila300}" stroke-opacity="0.35" stroke-width="1.5"/>`;
  }
  for (let gy = 0; gy <= h; gy += 40) {
    grid += `<line x1="0" y1="${gy}" x2="${w}" y2="${gy}" stroke="${C.nila300}" stroke-opacity="0.35" stroke-width="1.5"/>`;
  }
  const cx = w / 2;
  const cy = h / 2;
  let d = '';
  const steps = 8;
  for (let i = 0; i <= steps; i++) {
    const half = (steps - i) * 40;
    d += `<rect x="${cx - half}" y="${cy - i * 40 - 40}" width="${half * 2}" height="40" fill="${i % 2 ? C.nila500 : C.ochre400}" opacity="0.55"/>`;
    if (i) {
      d += `<rect x="${cx - half}" y="${cy + (i - 1) * 40}" width="${half * 2}" height="40" fill="${i % 2 ? C.nila500 : C.ochre400}" opacity="0.55"/>`;
    }
  }
  return `<rect width="${w}" height="${h}" fill="${C.kapasLight}"/>${grid}${d}
    <rect x="${w * 0.62}" y="${h * 0.78}" width="${w * 0.5}" height="24" rx="12" transform="rotate(-32 ${w * 0.62} ${h * 0.78})" fill="${C.ochre500}"/>
    <path d="M${w * 0.62} ${h * 0.78} l-26 22 l8 -30 Z" fill="${C.nila900}"/>`;
}

/** A round avatar filled with a motif, for sample testimonials and authors. */
const avatar = pattern =>
  scene(
    320,
    320,
    C.kapas,
    [pattern],
    `<circle cx="160" cy="160" r="160" fill="url(#p-${pattern})"/>
     <circle cx="160" cy="160" r="160" fill="url(#shade)"/>
     <circle cx="160" cy="160" r="70" fill="${C.kapas}" opacity="0.92"/>
     ${logoMark(160, 160, 0.95, { base: C.nila800, a: C.ochre400, b: C.kapas })}`
  );

/** Ground colours for scene backgrounds. */
const KAPAS = C.kapas;
const NILA = C.nila900;

const ARTWORK = {
  /* Home page */
  'src/images/tenun/hero.webp': scene(
    1600,
    1100,
    KAPAS,
    ['ikatNila', 'lurikKunyit', 'songketEmas'],
    `<circle cx="1280" cy="200" r="260" fill="${C.ochre200}" opacity="0.6"/>
     ${cloth(170, 150, 760, 820, -7, 'ikatNila', { border: C.ochre400 })}
     ${cloth(860, 120, 300, 900, 9, 'lurikKunyit', { fringe: true })}
     ${cloth(1040, 640, 420, 330, -3, 'songketEmas', { border: C.ochre400 })}`
  ),
  'src/images/tenun/nilai.webp': scene(
    2000,
    900,
    NILA,
    ['songketEmas', 'lurikNila', 'ikatKunyit'],
    `<rect width="2000" height="900" fill="url(#p-songketEmas)"/>
     <rect y="300" width="2000" height="22" fill="${C.ochre400}"/>
     <rect y="322" width="2000" height="250" fill="url(#p-ikatKunyit)"/>
     <rect y="572" width="2000" height="22" fill="${C.ochre400}"/>
     <rect y="780" width="2000" height="120" fill="url(#p-lurikNila)"/>
     <rect width="2000" height="900" fill="url(#shade)"/>`
  ),
  'src/images/tenun/koleksi-kain.webp': scene(
    1200,
    1200,
    C.kapasDark,
    ['ikatNila', 'ikatSoga'],
    `${cloth(140, 120, 620, 900, -5, 'ikatSoga')}
     ${cloth(420, 200, 640, 880, 6, 'ikatNila', { fringe: true })}`
  ),
  'src/images/tenun/koleksi-syal.webp': scene(
    1200,
    1200,
    C.nila100,
    ['lurikKunyit', 'lurikNila'],
    `${cloth(260, 60, 260, 1000, -12, 'lurikNila', { fringe: true })}
     ${cloth(640, 120, 260, 980, 10, 'lurikKunyit', { fringe: true })}`
  ),
  'src/images/tenun/koleksi-dekorasi.webp': scene(
    1200,
    1200,
    C.ochre100,
    ['songketEmas', 'anyamanKapas', 'songketMerah'],
    `${cloth(80, 640, 1040, 300, 0, 'anyamanKapas', { fringe: true })}
     ${cloth(170, 220, 480, 480, -6, 'songketEmas', { border: C.ochre500 })}
     ${cloth(600, 300, 420, 420, 7, 'songketMerah', { border: C.ochre300 })}`
  ),
  'src/images/tenun/pengrajin.webp': scene(
    1200,
    1400,
    C.kapasDark,
    ['ikatNila', 'lurikKunyit'],
    `<rect y="1120" width="1200" height="280" fill="${C.sogaLight}" opacity="0.55"/>
     ${loom(220, 180, 760, 980, 'ikatNila')}
     ${skeins(250, 1260, [C.nila700, C.ochre400, C.soga, C.mengkudu], 80)}`
  ),
  'src/images/tenun/avatar-1.webp': avatar('ikatNila'),
  'src/images/tenun/avatar-2.webp': avatar('lurikKunyit'),
  'src/images/tenun/avatar-3.webp': avatar('songketMerah'),
  'src/images/tenun/avatar-4.webp': avatar('anyamanNila'),

  /* Services page */
  'src/images/tenun/layanan-sketsa.webp': svg(1000, 1500, sketch(1000, 1500)),
  'src/images/tenun/layanan-benang.webp': scene(
    1000,
    1500,
    KAPAS,
    [],
    `${skeins(230, 420, [C.nila700, C.ochre400], 150)}
     ${skeins(230, 820, [C.soga, C.mengkudu], 150)}
     ${skeins(230, 1220, [C.daun, C.nila300], 150)}`
  ),
  'src/images/tenun/layanan-alat-tenun.webp': scene(
    1500,
    1000,
    C.kapasDark,
    ['lurikNila'],
    `${loom(360, 90, 780, 820, 'lurikNila')}`
  ),
  'src/images/tenun/layanan-bantal.webp': scene(
    1500,
    1000,
    C.nila100,
    ['songketEmas', 'songketMerah', 'ikatKunyit'],
    `${cloth(160, 300, 440, 440, -8, 'songketMerah', { border: C.ochre300 })}
     ${cloth(540, 220, 460, 460, 4, 'songketEmas', { border: C.ochre400 })}
     ${cloth(930, 320, 420, 420, 10, 'ikatKunyit', { border: C.nila800 })}`
  ),
  'src/images/tenun/layanan-taplak.webp': scene(
    1500,
    1000,
    C.soga,
    ['anyamanKapas'],
    `<rect width="1500" height="1000" fill="#000" opacity="0.15"/>
     ${cloth(-40, 330, 1580, 340, -2, 'anyamanKapas', { fringe: true })}`
  ),
  'src/images/tenun/layanan-perawatan.webp': scene(
    1500,
    1000,
    KAPAS,
    ['ikatNila', 'lurikKunyit', 'songketEmas', 'anyamanNila', 'ikatSoga'],
    `${foldedStack(250, 260, 520, [
      ['ikatNila', 130],
      ['lurikKunyit', 110],
      ['songketEmas', 130],
      ['anyamanNila', 110],
    ])}
     ${foldedStack(830, 380, 440, [
       ['ikatSoga', 120],
       ['lurikKunyit', 100],
       ['ikatNila', 120],
     ])}`
  ),
  'src/images/tenun/layanan-lurik.webp': scene(
    1000,
    1350,
    C.ochre100,
    ['lurikNila', 'lurikKunyit'],
    `${cloth(140, 100, 330, 1120, -4, 'lurikNila', { fringe: true })}
     ${cloth(530, 140, 330, 1080, 5, 'lurikKunyit', { fringe: true })}`
  ),
  'src/images/tenun/layanan-songket.webp': scene(
    1000,
    1500,
    NILA,
    ['songketMerah', 'songketEmas'],
    `${cloth(120, 140, 760, 1180, 0, 'songketMerah', { border: C.ochre400 })}
     <rect x="120" y="1080" width="760" height="240" fill="url(#p-songketEmas)"/>`
  ),

  /* Collection (products): a card and a main image per product */
  'src/images/tenun/produk-ikat-nila.webp': scene(
    1400,
    1000,
    C.kapasDark,
    ['ikatNila'],
    `${cloth(230, 110, 940, 760, -4, 'ikatNila', { fringe: true, border: C.ochre400 })}`
  ),
  'src/images/tenun/produk-ikat-nila-utama.webp': scene(
    1760,
    1080,
    KAPAS,
    ['ikatNila', 'ikatSoga'],
    `${cloth(160, 140, 900, 760, -6, 'ikatNila', { border: C.ochre400 })}
     ${foldedStack(1140, 420, 460, [
       ['ikatNila', 130],
       ['ikatSoga', 120],
       ['ikatNila', 130],
     ])}`
  ),
  'src/images/tenun/produk-syal-lurik.webp': scene(
    1400,
    1000,
    C.nila800,
    ['lurikKunyit'],
    `${cloth(160, 340, 1080, 280, -8, 'lurikKunyit', { fringe: true })}`
  ),
  'src/images/tenun/produk-syal-lurik-utama.webp': scene(
    1760,
    1080,
    C.ochre100,
    ['lurikKunyit', 'lurikNila'],
    `${cloth(300, 80, 300, 900, -10, 'lurikKunyit', { fringe: true })}
     ${cloth(720, 100, 300, 880, 4, 'lurikNila', { fringe: true })}
     ${cloth(1140, 80, 300, 900, 12, 'lurikKunyit', { fringe: true })}`
  ),
  'src/images/tenun/produk-bantal-songket.webp': scene(
    1400,
    1000,
    C.ochre200,
    ['songketEmas'],
    `${cloth(420, 190, 560, 560, -5, 'songketEmas', { border: C.ochre500 })}`
  ),
  'src/images/tenun/produk-bantal-songket-utama.webp': scene(
    1760,
    1080,
    C.nila100,
    ['songketEmas', 'songketMerah'],
    `<rect y="760" width="1760" height="320" fill="${C.sogaLight}" opacity="0.5"/>
     ${cloth(260, 250, 560, 560, -7, 'songketEmas', { border: C.ochre400 })}
     ${cloth(900, 270, 540, 540, 6, 'songketMerah', { border: C.ochre300 })}`
  ),
  'src/images/tenun/produk-taplak-anyaman.webp': scene(
    1400,
    1000,
    C.soga,
    ['anyamanKapas'],
    `${cloth(-30, 300, 1460, 380, 0, 'anyamanKapas', { fringe: true })}`
  ),
  'src/images/tenun/produk-taplak-anyaman-utama.webp': scene(
    1760,
    1080,
    C.sogaLight,
    ['anyamanKapas', 'anyamanNila'],
    `<ellipse cx="880" cy="560" rx="820" ry="380" fill="${C.soga}"/>
     ${cloth(140, 380, 1480, 340, -3, 'anyamanKapas', { fringe: true })}
     ${cloth(700, 200, 360, 720, 0, 'anyamanNila')}`
  ),

  /* Journal (blog) covers */
  'src/images/tenun/jurnal-pewarna-alami.webp': scene(
    1500,
    1000,
    C.kapasDark,
    [],
    `${dyePots(330, 300, [
      [C.nila700, C.sogaLight],
      [C.ochre400, C.sogaLight],
      [C.soga, C.kapas],
      [C.mengkudu, C.sogaLight],
    ])}
     ${skeins(1220, 820, [C.nila500], 110)}`
  ),
  'src/images/tenun/jurnal-merawat-kain.webp': scene(
    1500,
    1000,
    C.nila100,
    ['ikatNila', 'lurikKunyit', 'songketMerah', 'anyamanKapas'],
    `${foldedStack(430, 220, 640, [
      ['anyamanKapas', 130],
      ['ikatNila', 150],
      ['lurikKunyit', 120],
      ['songketMerah', 150],
    ])}`
  ),
  'src/images/tenun/jurnal-desa-tenun.webp': scene(
    1500,
    1000,
    C.ochre100,
    ['songketEmas', 'ikatSoga'],
    `<path d="M0 760 Q 400 640 760 720 T 1500 680 V1000 H0 Z" fill="${C.daun}" opacity="0.55"/>
     ${loom(160, 140, 520, 680, 'songketEmas')}
     ${loom(820, 140, 520, 680, 'ikatSoga')}`
  ),

  /* Insights covers */
  'src/images/tenun/wawasan-mode-lambat.webp': scene(
    1500,
    840,
    NILA,
    ['lurikNila', 'ikatKunyit'],
    `<rect width="1500" height="840" fill="url(#p-lurikNila)" opacity="0.35"/>
     ${cloth(380, 120, 740, 600, -4, 'ikatKunyit', { border: C.nila800 })}`
  ),
  'src/images/tenun/wawasan-rantai-pasok.webp': scene(
    1500,
    840,
    KAPAS,
    [],
    `<path d="M120 420 C 420 200, 700 640, 980 420 S 1320 300, 1400 420" stroke="${C.ochre500}" stroke-width="14" fill="none" stroke-linecap="round"/>
     ${skeins(220, 420, [C.nila700], 100)}
     ${skeins(760, 430, [C.ochre400], 100)}
     ${skeins(1300, 420, [C.soga], 100)}`
  ),
  'src/images/tenun/wawasan-motif.webp': scene(
    1500,
    840,
    C.kapasDark,
    ['ikatNila', 'songketEmas', 'lurikKunyit', 'anyamanNila'],
    `<rect x="60" y="60" width="330" height="720" fill="url(#p-ikatNila)"/>
     <rect x="420" y="60" width="330" height="720" fill="url(#p-songketEmas)"/>
     <rect x="780" y="60" width="330" height="720" fill="url(#p-lurikKunyit)"/>
     <rect x="1140" y="60" width="300" height="720" fill="url(#p-anyamanNila)"/>
     <rect width="1500" height="840" fill="url(#shade)"/>`
  ),
};

/** path -> SVG source; `.png` and `.webp` targets are rasterised with sharp. */
export const OUTPUTS = {
  'public/banner-pattern.svg': bannerPattern,
  'src/images/icon.svg': icon(),
  'src/images/icon.png': icon(),
  'src/images/icon-maskable.png': icon(1),
  'src/images/social.png': social,
  ...ARTWORK,
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
      if (rel.endsWith('.webp')) {
        // Site artwork: rasterised here so the build never has to process SVG.
        await img.webp({ quality: 84, effort: 6 }).toFile(out);
      } else {
        await img.png({ compressionLevel: 9 }).toFile(out);
      }
    }
    console.log('wrote', rel);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
