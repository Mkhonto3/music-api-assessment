export default {
  port: process.env.PORT,
  host: process.env.HOST,
  dbUri: process.env.DB_URI,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: process.env.PRIVATE_KEY,
};
