/** @type {import('next').NextConfig} */
const nextConfig = {
allowedDevOrigins: [
    'http://192.168.1.*',  // Allow any device on your local network
    'http://192.168.*.*',  // Or broader network range
    'http://10.0.0.*',     // If using a different subnet
  ],
//  basePath: process.env.NODE_ENV === 'production' ? '/ai_workflows' : '',  
  
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // Replace * with your specific domain in production
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
};

export default nextConfig;
