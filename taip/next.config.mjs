/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // TAIP is an internal, server-rendered application (API routes + auth),
  // so it is NOT statically exported like the public platform app.
  poweredByHeader: false,
};

export default nextConfig;
