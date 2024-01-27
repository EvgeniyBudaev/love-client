const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "app/styles")],
  },
  images: {
    domains: ["imaginative-bombolone-f1096b.netlify.app"],
  },
};

module.exports = nextConfig;
