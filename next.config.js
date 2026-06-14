/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — produces ./out which we ship to S3 + CloudFront.
  // No SSR; pages render at build time.
  output: "export",
  // Image optimization needs a Node runtime we don't ship with static
  // export. Disable it; CloudFront caches the originals.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Generate /privacy/index.html (not /privacy.html) so the CloudFront
  // rewrite that maps /privacy → /privacy/index.html finds the file.
  trailingSlash: true,
};

module.exports = nextConfig;
