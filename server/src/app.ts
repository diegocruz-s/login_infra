import 'dotenv/config';
import express, { Express } from 'express';
import { authRoutes } from './infra/http/routes/auth';
import { DatabaseMongoDb, IDatasConnectMongo } from './infra/database/MongoDatabase';
import { datasMongoUri } from './infra/config/dbConn';

console.log("process.env.MONGODB_USERNAME!: ", process.env.MONGODB_USERNAME!);
console.log("process.env.MONGODB_PASSWORD!: ", process.env.MONGODB_PASSWORD!);
console.log("process.env.MONGODB_DATABASE!: ", process.env.MONGODB_DATABASE!);


class AppController {
  app: Express;

  constructor() {
    this.app = express();
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

  async start (port: number) {
    await DatabaseMongoDb.getInstance(datasMongoUri);

    this.app.listen(port, () => console.log(`Server running on port ${port}...`))
  };
};

const app = new AppController();

export {
  app,
};