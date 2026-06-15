import { config } from "dotenv";
config();

const configuration = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV,
};

export const conf = Object.freeze(configuration);
