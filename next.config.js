const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "app/styles")],
  },
  images: {
    domains: ["imaginative-bombolone-f1096b.netlify.app", "img.freepik.com"],
    // remotePatterns: [
    //     {
    //         protocol: "https",
    //         hostname: "imaginative-bombolone-f1096b.netlify.app",
    //         port: "",
    //         pathname: "/assets/**",
    //     }
    // ]
  },
};

module.exports = nextConfig;
