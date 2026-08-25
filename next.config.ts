import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // firebase-admin ships some ESM-only internals that break when Next.js
  // tries to bundle them into the serverless function (ERR_REQUIRE_ESM on
  // Vercel). Keeping it external lets Node resolve it natively at runtime.
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
