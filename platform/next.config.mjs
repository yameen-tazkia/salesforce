// PAGES_BASE_PATH is set by the GitHub Pages workflow (e.g. "/salesforce")
// so the same config serves local dev at "/" and Pages at a sub-path.
const basePath = process.env.PAGES_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
