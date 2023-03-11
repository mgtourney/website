/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 300,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  //! Mother, Father, Sister, I'm sorry for what I've done
  env: {
    PUBLIC_VERSION: process.env.PUBLIC_VERSION,
    PUBLIC_REPO: process.env.PUBLIC_REPO,
    PUBLIC_SHA: process.env.PUBLIC_SHA,
    PUBLIC_URL: process.env.PUBLIC_URL,
    PUBLIC_NAME: process.env.PUBLIC_NAME,

    // Postgres
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,

    // Discord
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,

    // Auth
    AUTHSECRET: process.env.AUTHSECRET,
    SALT: process.env.SALT,

    // Ratelimiting
    USER_RATELIMIT: process.env.USER_RATELIMIT,
    TOURNAMENT_RATELIMIT: process.env.TOURNAMENT_RATELIMIT,
  },
};
