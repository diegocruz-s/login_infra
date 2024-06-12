import * as dotenv from 'dotenv';
dotenv.config();

import { UserModel } from "../models/User";
import { DatabaseMongoDb } from './MongoDatabase';
import bcrypt from "bcryptjs";

async function createUser(email: string, password: string) {
  try {
    await DatabaseMongoDb.getInstance();

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
    .then(() => console.log(`Usuário ${email} criado com sucesso`))
    .catch((err) => console.log('Error na criação de usuário: ', err));
} else {
  console.error('Provide data to create the user!');
}
