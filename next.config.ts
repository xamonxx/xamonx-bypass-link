import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["puppeteer", "puppeteer-core", "@sparticuz/chromium"],
  // @sparticuz/chromium's brotli-compressed Chromium binary lives under
  // bin/ and is loaded via a dynamic fs path at runtime, which Next's static
  // file tracer can't see — without this, Vercel's deploy omits bin/
  // entirely and puppeteer-core fails at launch with "input directory ...
  // does not exist".
  outputFileTracingIncludes: {
    "/api/bypass": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
};

export default nextConfig;
