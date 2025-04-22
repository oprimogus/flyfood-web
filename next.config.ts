import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'localhost.localstack.cloud',
            port: '4566',
        },
    ],
},
// images: {
//     remotePatterns: [
//         {
//             protocol: 'http',
//             hostname: 'localhost.localstack.cloud',
//             port: '4566',
//             pathname: '/restaurant/**',
//         },
//     ],
// }
};

export default nextConfig;
