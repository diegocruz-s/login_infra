import 'dotenv/config';
import express, { Express } from 'express';
import { authRoutes } from './infra/http/routes/auth';
import { DatabaseMongoDb, IDatasConnectMongo } from './infra/database/MongoDatabase';
import { datasMongoUri } from './infra/config/dbConn';
import cors from 'cors';

console.log('process.env.MONGODB_USERNAME!: ', process.env.MONGODB_USERNAME!)
console.log('process.env.MONGODB_PASSWORD!: ', process.env.MONGODB_PASSWORD!)
console.log('process.env.MONGODB_INSTANCE!: ', process.env.MONGODB_INSTANCE!)
console.log('process.env.MONGODB_PORT!: ', process.env.MONGODB_PORT!)
console.log('process.env.MONGODB_DATABASE!: ', process.env.MONGODB_DATABASE!)

class AppController {
  app: Express;

  constructor() {
    this.app = express();
    this.cors();
    this.database();
    this.middlewares();
    this.routes();
  };

  database () {
    new DatabaseMongoDb();
  };

  middlewares () {
    this.app.use(express.json());
  };

  routes () {
    this.app.use('/auth', authRoutes);
  }; 

  cors () {
    this.app.use(cors());
  };

  async start (port: number) {
    await DatabaseMongoDb.getInstance(datasMongoUri);

    this.app.listen(port, () => console.log(`Server running on port ${port}...`))
  };
};

const appController = new AppController();

export {
  appController,
};