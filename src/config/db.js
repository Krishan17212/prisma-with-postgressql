import { PrismaClient } from "../generated/prisma/client.ts";
import { conf } from "./config.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = conf.databaseUrl;
const adapter = new PrismaPg(connectionString);
const prisma = new PrismaClient({
  adapter,
  log: conf.nodeEnv === "development" ? ["query", "error", "warn"] : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Unable to connect to database ", error);
    process.exit(1);
  }
};

const disconnectDb = async () => {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.log("Unable to disconnect from database ", error);
    process.exit(1);
  }
};

export { prisma, connectDB, disconnectDb };
