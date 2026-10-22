import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://tenunlestari.example',
  // i18n: {
  //   defaultLocale: "id",
  //   locales: ["id", "en"],
  //   fallback: {
  //     en: "id",
  //   },
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  prefetch: true,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'id', // All urls that don't contain language prefix will be treated as default locale
        locales: {
          id: 'id-ID', // The `defaultLocale` value must present in `locales` keys
          en: 'en-US',
        },
      },
    }),
    starlight({
      title: 'Panduan Tenun Lestari',
      // https://github.com/withastro/starlight/blob/main/packages/starlight/CHANGELOG.md
      // If no Astro and Starlight i18n configurations are provided, the built-in default locale is used in Starlight and a matching Astro i18n configuration is generated/used.
      // If only a Starlight i18n configuration is provided, an equivalent Astro i18n configuration is generated/used.
      // If only an Astro i18n configuration is provided, the Starlight i18n configuration is updated to match it.
      // If both an Astro and Starlight i18n configurations are provided, an error is thrown.
      // Docs locales mirror the marketing site: Bahasa Indonesia at the root,
      // English under /en/.
      locales: {
        root: {
          label: 'Bahasa Indonesia',
          lang: 'id',
        },
        en: { label: 'English', lang: 'en' },
      },
      // https://starlight.astro.build/guides/sidebar/
      sidebar: [
        {
          label: 'Panduan',
          translations: { en: 'Guides' },
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Perawatan Kain',
          translations: { en: 'Fabric Care' },
          items: [{ autogenerate: { directory: 'perawatan' } }],
        },
      ],
      social: [
        {
          icon: 'instagram',
          label: 'Instagram',
          href: 'https://www.instagram.com/',
        },
      ],
      disable404Route: true,
      customCss: [
        '@fontsource-variable/fraunces',
        '@fontsource-variable/plus-jakarta-sans',
        './src/assets/styles/starlight.css',
      ],
      favicon: '/favicon.ico',
      components: {
        SiteTitle: './src/components/ui/starlight/SiteTitle.astro',
        Head: './src/components/ui/starlight/Head.astro',
        MobileMenuFooter:
          './src/components/ui/starlight/MobileMenuFooter.astro',
        ThemeSelect: './src/components/ui/starlight/ThemeSelect.astro',
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://tenunlestari.example' + '/social.webp',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:image',
            content: 'https://tenunlestari.example' + '/social.webp',
          },
        },
      ],
    }),
    mdx(),
  ],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
