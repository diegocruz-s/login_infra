import 'dotenv/config';
import express, { Express } from 'express';
import { authRoutes } from './infra/http/routes/auth';

class AppController {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  };

  middlewares () {
    this.app.use(express.json());
  };

  routes () {
    this.app.use('/auth', authRoutes);
  }; 

  listen (port: number) {
    this.app.listen(port, () => console.log(`Server running on port ${port}...`))
  };
};

const app = new AppController();

export {
  app,
};