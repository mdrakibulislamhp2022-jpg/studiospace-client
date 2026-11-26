import { MongoClient } from "mongodb";

const globalForMongo = globalThis;

if (!globalForMongo._studioSpaceMongoClient) {
  globalForMongo._studioSpaceMongoClient = new MongoClient(process.env.MONGODB_URI);
}

export const client = globalForMongo._studioSpaceMongoClient;
export const db = client.db("studiospace");