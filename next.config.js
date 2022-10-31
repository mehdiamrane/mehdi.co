/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/cv',
        destination:
          'https://drive.google.com/drive/folders/1HeYTn72Iy9IqNsPSv6_5kWeDEiaAbjze?usp=sharing',
        permanent: false,
      },
      {
        source: '/admin',
        destination: 'https://app.forestry.io/sites/r-cbfyz7mk6zwq/#/sections/notes/content',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
