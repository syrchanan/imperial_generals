/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <--- This enables static HTML export (https://nextjs.org/docs/app/guides/static-exports)
  images: {
    unoptimized: true, // <--- This disables rewriting to /_next/static/
  }
};

export default nextConfig;
