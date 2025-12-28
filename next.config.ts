import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* React Strict Mode - Recommended for development */
    reactStrictMode: true,

    /* Enable typed routes for better type safety */
    typedRoutes: true,

    /* Environment Variables Validation */
    /* Note: Runtime validation is done in src/config/env.ts */

    /* Image Optimization */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'localhost',
                port: '5001',
                pathname: '/**',
            },
        ],
    },

    /* Headers for Security */
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
