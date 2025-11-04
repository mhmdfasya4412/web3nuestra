// next.config.js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Ekstensi file yang didukung oleh Next.js
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Direktori yang akan dicek oleh ESLint
  eslint: {
    dirs: ['src/app', 'src/components', 'scripts'],
  },

  // Rewrites (proxy untuk backend lokal, misalnya Express atau API lain)
  async rewrites() {
    return [
      {
        source: '/tools/dencrypt',
        destination: 'http://localhost:3001/tools/dencrypt',
      },
      {
        source: '/tools/dencrypt/:path*',
        destination: 'http://localhost:3001/tools/dencrypt/:path*',
      },
    ]
  },

  // Konfigurasi untuk <Image /> component
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'countdemura.glitch.me',
      },
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
      },
    ],
  },

  // Modifikasi konfigurasi Webpack
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

// Ekspor konfigurasi yang sudah dibungkus oleh Contentlayer
module.exports = withContentlayer(nextConfig)
