/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // <--- This disables rewriting to /_next/static/
  }
};

export default nextConfig;
