import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hero images for school projects come straight from their GitHub repos via jsDelivr.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.jsdelivr.net', pathname: '/gh/Dryd33n/**' }],
  },
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './lib/modern-polyfill.js',
      'next/dist/build/polyfills/polyfill-module': './lib/modern-polyfill.js',
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '../build/polyfills/polyfill-module': false,
      'next/dist/build/polyfills/polyfill-module': false,
    };
    return config;
  },
};

export default nextConfig;
