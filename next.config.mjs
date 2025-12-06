/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/ai_workflows' : '',  
};

export default nextConfig;
