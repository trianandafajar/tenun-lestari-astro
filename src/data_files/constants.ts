import ogImageSrc from '@images/social.png';

/**
 * Brand constants for Tenun Lestari, a fictional Indonesian brand of
 * handwoven textiles and home goods made with local artisans.
 */
export const SITE = {
  title: 'Tenun Lestari',
  tagline: 'Kain tenun tangan yang lestari',
  description:
    'Tenun Lestari menghadirkan kain tenun tangan, syal, dan dekorasi rumah yang dibuat bersama pengrajin lokal dengan pewarna alami dan upah yang adil.',
  description_short:
    'Kain tenun tangan, syal, dan dekorasi rumah dari pengrajin lokal Indonesia.',
  url: 'https://tenunlestari.example',
  author: 'Tim Tenun Lestari',
  email: 'halo@tenunlestari.example',
};

// Per-locale titles, descriptions and Open Graph text live in `src/copy/`;
// `src/utils/metadata.ts` assembles the <head> from them.
export const OG = {
  image: ogImageSrc,
};
