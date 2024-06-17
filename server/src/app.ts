import 'dotenv/config';
import express, { Express } from 'express';
import { authRoutes } from './infra/http/routes/auth';
import { DatabaseMongoDb, IDatasConnectMongo } from './infra/database/MongoDatabase';
import { datasMongoUri } from './infra/config/dbConn';

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

const appController = new AppController();

export {
  appController,
};