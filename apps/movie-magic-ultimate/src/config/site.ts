export const siteConfig = {
  name: 'Movie Magic',
  description: 'Unlimited movies, anytime, anywhere',
  url: 'https://movie-magic-ultimate.vercel.app/',
  ogImage: {
    url: 'https://movie-magic-ultimate.vercel.app/og.png',
    alt: 'Movie Magic',
    width: 1280,
    height: 698,
  },
  links: {
    twitter: 'https://twitter.com/code_shaper',
    github: 'https://github.com/code-shaper/movie-magic',
  },
};

export type SiteConfig = typeof siteConfig;
