import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    /** next/image only allows listed quality values (default is [75] only). */
    qualities: [75, 85, 90, 92, 95, 100],
    /**
     * WebP before AVIF: AVIF can look softer/blocky on some assets at the same q=.
     * Browsers still negotiate via Accept; order is the encoder preference in Next.
     */
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840, 4096],
  },
};

export default withNextIntl(nextConfig);
