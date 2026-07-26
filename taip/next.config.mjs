/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // TAIP is an internal, server-rendered application (API routes + auth),
  // so it is NOT statically exported like the public platform app.
  poweredByHeader: false,
  // Emits .next/standalone — a self-contained server used by the Docker
  // image for internal hosting. Harmless for Vercel/`next start`.
  output: "standalone",
};

export default nextConfig;
