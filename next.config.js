/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "i.pinimg.com",
      "lh3.googleusercontent.com",
      "www.signpost.com",
      "encrypted-tbn2.gstatic.com",
      "as.com",
      "media-manager.noticiasaominuto.com",
    ],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

module.exports = nextConfig;
