import { config } from "dotenv";
config();

const configuration = {
  port: process.env.PORT || 3000,
};

export const conf = Object.freeze(configuration);
