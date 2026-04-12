/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
