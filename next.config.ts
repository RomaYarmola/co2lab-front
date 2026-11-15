import type { NextConfig } from "next";
import { buildLegacyRedirects } from "./src/constants/legacyRedirects";

const nextConfig: NextConfig = {
  images: {
    // Resize images on the Sanity CDN instead of Vercel's /_next/image
    // optimiser, so they never count against the Hobby image-optimisation
    // quota (1,000 source images → the client gets billed). See the loader.
    loader: "custom",
    loaderFile: "./src/lib/sanityImageLoader.ts",
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Прибирає дублікати з/без слеша — інакше два URL на ту саму сторінку
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  // 301 зі старих адрес каталогу й блогу: Google досі тримає їх в індексі
  // й шле на них трафік, а після зміни slug-ів вони віддавали 404.
  async redirects() {
    return buildLegacyRedirects();
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
