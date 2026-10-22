/**
 * Navigation structure shared by every locale: stable ids, unlocalised paths
 * and social URLs. The label for each id lives in the copy tables
 * (`copy.nav.labels`, `copy.nav.footer.sections`), so translators never touch
 * a path and code never keys on a translated label.
 */
export type NavLinkId = 'home' | 'products' | 'services' | 'blog' | 'contact';

export const navLinks: { id: NavLinkId; path: string }[] = [
  { id: 'home', path: '/' },
  { id: 'products', path: '/products' },
  { id: 'services', path: '/services' },
  { id: 'blog', path: '/blog' },
  { id: 'contact', path: '/contact' },
];

export type FooterSectionId = 'shop' | 'about';
export type FooterLinkId =
  | 'careGuide'
  | 'collection'
  | 'services'
  | 'story'
  | 'journal'
  | 'careers'
  | 'artisans';

export const footerSections: {
  id: FooterSectionId;
  links: { id: FooterLinkId; path: string; badge?: 'hiring' }[];
}[] = [
  {
    id: 'shop',
    links: [
      { id: 'collection', path: '/products' },
      { id: 'services', path: '/services' },
      { id: 'careGuide', path: '/welcome-to-docs/' },
    ],
  },
  {
    id: 'about',
    links: [
      { id: 'story', path: '/blog' },
      { id: 'journal', path: '/blog' },
      { id: 'artisans', path: '/services' },
      { id: 'careers', path: '/contact', badge: 'hiring' },
    ],
  },
];

/**
 * Social profiles. Tenun Lestari is fictional, so these are placeholders
 * pointing at each network's home page; replace them with real handles.
 */
export const socialLinks = {
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  youtube: 'https://www.youtube.com/',
  x: 'https://x.com/',
};

/** The open-source template this site is built on (credited in the footer). */
export const templateCredit = {
  name: 'ScrewFast',
  url: 'https://github.com/mearashadowfax/ScrewFast',
};
