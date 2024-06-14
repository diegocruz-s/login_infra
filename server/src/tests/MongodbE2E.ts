import dotenv from 'dotenv';

import NodeEnvironment from 'jest-environment-node';
import { DatabaseMongoDb, IDatasConnectMongo } from '../infra/database/MongoDatabase';
import { UserModel } from '../infra/models/User';

console.log('process.env.MONGODB_USERNAMET: ', process.env.MONGODB_USERNAME);
console.log('process.env.MONGODB_PASSWORDT: ', process.env.MONGODB_PASSWORD);
console.log('process.env.MONGODB_DATABASE_TEST: ', process.env.MONGODB_DATABASE_TEST);

export default class MongoTestEnvironment extends NodeEnvironment {
  private mongoInstance!: DatabaseMongoDb;

  constructor(config: any, context: any) {
    super(config, context) 
  };
  
  async setup(): Promise<void> {
    
    const datasMongoUri: IDatasConnectMongo = {
      user: process.env.MONGODB_USERNAME!,
      password: process.env.MONGODB_PASSWORD!,
      instance: 'mongo_test',
      port: '27017',
      database: process.env.MONGODB_DATABASE_TEST!,
    };
    this.mongoInstance = await DatabaseMongoDb.getInstance(datasMongoUri);
    return super.setup()
  };

  async teardown(): Promise<void> {
    await UserModel.deleteMany({});
  };  
};