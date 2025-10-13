export interface SocialPlatform {
  // Zmieniamy 'label' na 'name' lub 'platform' dla jasności
  platform: 'facebook' | 'instagram' | 'youtube' | 'patronite';
  href: string;
  title: string;
}

export const socialPlatforms: SocialPlatform[] = [
  {
    platform: 'facebook',
    href: 'https://www.facebook.com/stowarzyszeniemaxime',
    title: 'Nasz Facebook',
  },
  {
    platform: 'instagram',
    href: 'https://www.instagram.com/maxime.orchestra/',
    title: 'Nasz Instagram',
  },
  {
    platform: 'youtube',
    href: 'https://www.youtube.com/@stowarzyszeniemaxime',
    title: 'Nasz kanał YouTube',
  },
  {
    platform: 'patronite',
    href: 'https://patronite.pl/stowarzyszeniemaxime',
    title: 'Wesprzyj nas na Patronite',
  },
];