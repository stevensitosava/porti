import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  images: {
    deviceSizes: [],
    imageSizes: [
      // Next/prev projects
      112, // 1x
      224, // 2x,

      // Project list mobile
      384, // 1x
      768, // 2x
      // Project list desktop
      672, // 1x
      1344, // 2x

      // Project detail
      960, // col span 6 1x
      1920, // col span 12 1x
      1024, // full width mobile 1x
      1376, // section-container 1x
    ],
    qualities: [100],
  },

  reactStrictMode: false,

  webpack(config) {
    config.module.rules.push(
      // Convert *.svg imports to React components
      {
        test: /\.svg$/i,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
    );

    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: [{ loader: '@svgr/webpack', options: { icon: true } }],
        as: '*.js',
      },
    },
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
