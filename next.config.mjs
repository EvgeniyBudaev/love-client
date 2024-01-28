/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "imaginative-bombolone-f1096b.netlify.app",
                port: "",
            },
            {
                protocol: "https",
                hostname: "img.freepik.com",
                port: "",
            },
        ],
        unoptimized: true
    },
};

export default nextConfig;
