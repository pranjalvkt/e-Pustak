const runtimeCaching = [
  {
    urlPattern: ({ url }) => url.origin === self.location.origin,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-pages',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
];

export default {
  runtimeCaching,
};