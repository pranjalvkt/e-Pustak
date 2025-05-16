/** @type {import('next').NextConfig} */
import nextPwa from 'next-pwa';
import pwaConfig from './next-pwa.config.js';
const isDev = process.env.NODE_ENV === 'development';
const withPWA = nextPwa({
  ...pwaConfig,
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
