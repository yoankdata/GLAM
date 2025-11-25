// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'iyjmoggcgefwuhhfwezv.supabase.co', // <-- remplace par ton vrai host Supabase
      },
    ],
  },
};

export default nextConfig;
