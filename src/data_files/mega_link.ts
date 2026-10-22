import type { IconName } from '@components/ui/icons/icons';
import storyImage from '@images/tenun/koleksi-syal.webp';

/**
 * Structure of the optional mega menu (`NavbarMegaMenu.astro`): ids, icons
 * and URLs. Titles and descriptions live in `copy.nav.megaMenu`.
 */
export type MegaMenuServiceId =
  'guides' | 'integrations' | 'experts' | 'tools' | 'plans' | 'community';

export const megaMenuServices: {
  id: MegaMenuServiceId;
  icon: IconName;
  url: string;
}[] = [
  { id: 'guides', icon: 'guides', url: '#' },
  { id: 'integrations', icon: 'puzzle', url: '#' },
  { id: 'experts', icon: 'rocket', url: '#' },
  { id: 'tools', icon: 'hammer', url: '#' },
  { id: 'plans', icon: 'sparks', url: '#' },
  { id: 'community', icon: 'community', url: '#' },
];

export const megaMenuSuccessStory = {
  image: storyImage,
  learnMoreUrl: '#',
};
