import { IDatasConnectMongo } from "../database/MongoDatabase";

export const datasMongoUri: IDatasConnectMongo = {
  user: process.env.MONGODB_USERNAME!,
  password: process.env.MONGODB_PASSWORD!,
  instance: 'mongo',
  port: '27017',
  database: process.env.MONGODB_DATABASE!,
};