const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  sassOptions: {
    silenceDeprecations: [
      'import',
      'global-builtin',
      'color-functions',
      'mixed-decls'
    ]
  }
};

module.exports = nextConfig;
