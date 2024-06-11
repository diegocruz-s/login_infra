import { LoginController } from "../../application/controllers/Auth/LoginController";
import { LoginUserUseCase } from "../../application/useCases/Auth/LoginUseCase";
import { MongoAuthRepository } from "../../domain/repositories/mongo/MongoAuthRepository";
import { CompareHashBcrypt } from "../utils/CompareHashBcrypt";
import { GenerateTokenJWT } from "../utils/GenerateTokenJwt";

export function loginFactoryController () {
  // UseCase
  const loginRepository = new MongoAuthRepository();
  const compareHashBcrypt = new CompareHashBcrypt();
  const generateTokenJWT = new GenerateTokenJWT();

  const loginUserUseCase = new LoginUserUseCase(
    loginRepository, compareHashBcrypt, generateTokenJWT  
  );

  const loginFactory = new LoginController(loginUserUseCase);

  return {
    loginFactory,
  };
};