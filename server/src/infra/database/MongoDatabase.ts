import mongoose from "mongoose";

class DatabaseMongoDb {
  
  private static instance: DatabaseMongoDb | null = null;

  public static async getInstance(): Promise<DatabaseMongoDb> {
    if(DatabaseMongoDb.instance === null) {      
      DatabaseMongoDb.instance = new DatabaseMongoDb();
      await DatabaseMongoDb.instance.connect();
    };

    return DatabaseMongoDb.instance;
  };

  private async connect () {
    const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongo:27017/${process.env.MONGODB_DATABASE}`;
    
    try {
      await mongoose.connect(uri);
      console.log('MongoDB initialized!');      
    } catch (error) {
      console.log('error connection: ', error);
    };
  };
};

export {
  DatabaseMongoDb
};
