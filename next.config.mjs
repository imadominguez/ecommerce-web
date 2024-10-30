/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Permitir todas las rutas de res.cloudinary.com
      },
      {
        pathname: '/img/logos/**',
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
    ],
  },
};

export default nextConfig;
