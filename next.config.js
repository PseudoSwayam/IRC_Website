/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the definitive images configuration.
  images: {
    remotePatterns: [
      // PATTERN 1: This allows all NEW images from your Supabase Storage.
      {
        protocol: 'https',
        hostname: 'sznryqjzdrexgeyfzkao.supabase.co', // Your specific Supabase project hostname
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // PATTERN 2: This allows all OLD images still using Google Drive links.
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;