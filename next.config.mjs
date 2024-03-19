/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "utfs.io",
        protocol: "https",
        port: "",
      },
      {
        hostname: "files.edgestore.dev",
        protocol: "https",
        port: "",
      },
    ],
  },
}

export default nextConfig
