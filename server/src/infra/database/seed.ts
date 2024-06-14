import 'dotenv/config';

import { UserModel } from "../models/User";
import { DatabaseMongoDb, IDatasConnectMongo } from './MongoDatabase';
import bcrypt from "bcryptjs";

console.log("process.env.MONGODB_USERNAME!: ", process.env.MONGODB_USERNAME!);
console.log("process.env.MONGODB_PASSWORD!: ", process.env.MONGODB_PASSWORD!);
console.log("process.env.MONGODB_DATABASE!: ", process.env.MONGODB_DATABASE!);

async function createUser(email: string, password: string) {
  try {
    const datasMongoUri: IDatasConnectMongo = {
      user: process.env.MONGODB_USERNAME!,
      password: process.env.MONGODB_PASSWORD!,
      instance: 'mongo',
      port: '27017',
      database: process.env.MONGODB_DATABASE!,
    };
    await DatabaseMongoDb.getInstance(datasMongoUri);

    const hashPwd = bcrypt.hashSync(password, 4);
    const newUser = new UserModel({
      email,
      password: hashPwd,
    });

    await newUser.save();
  } catch (error) {
    console.error('Erro na criação do usuário:', error);
  }
}

const [email, password] = process.argv.slice(2);

if (email && password) {  
  createUser(email, password)
    .then(() => {
      console.log(`Usuário ${email} criado com sucesso`)
      process.exit();
    })
    .catch((err) => console.log('Error na criação de usuário: ', err));
} else {
  console.error('Provide data to create the user!');
}
