import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    images: {
        domains: ['picsum.photos', 'placehold.co', 'api.slingacademy.com'],
    },
};

export default withBundleAnalyzer(nextConfig);
