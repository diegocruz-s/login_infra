import dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { DatabaseMongoDb, IDatasConnectMongo } from '../infra/database/MongoDatabase';
import { UserModel } from '../infra/models/User';

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
      database: process.env.MONGODB_DATABASE!,
    };
    this.mongoInstance = await DatabaseMongoDb.getInstance(datasMongoUri);
    return super.setup()
  };

  async teardown(): Promise<void> {
    await UserModel.deleteMany({});
  };  
};