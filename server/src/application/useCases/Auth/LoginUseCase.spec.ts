import 'dotenv/config';
import { LoginUserUseCase } from "./LoginUseCase";
import { User } from '../../../domain/entities/User';
import { ICompareHash, IGenerateToken, ILoginUserRepository } from './protocols';
import { randomUUID } from 'crypto';

const userTest = new User({
  email: 'test@gmail.com',
  password: 'Test@123',
});

const makeFakeLoginRepository = () => { 
  class LoginRepository implements ILoginUserRepository {
    async findUser(infoUser: { email: string; }): Promise<User | null> {
      return userTest;
    };
  };

  const loginRepository = new LoginRepository();

  return {
    loginRepository
  };
};
const makeFakeCompareHash = () => {
  class CompareHash implements ICompareHash {
    async run(datas: { password: string; hash: string; }): Promise<boolean> {
      if (datas.password === datas.hash) return true;
      return false;
    }
  };

  const compareHash = new CompareHash();

  return {
    compareHash,
  };
};
const makeFakeGenerateToken = () => {
  class GenerateToken implements IGenerateToken {
    async create(tokenDatas: { id: string; secret: string; expiresIn: string; }): Promise<string> {
      return `${tokenDatas.id}-${tokenDatas.secret}-${tokenDatas.expiresIn}-${randomUUID()}`
    };
  };

  const generateToken = new GenerateToken();

  return {
    generateToken,
  };
};

const makeLoginUserUseCase = () => {
  const { loginRepository } = makeFakeLoginRepository();
  const { compareHash } = makeFakeCompareHash();
  const { generateToken } = makeFakeGenerateToken();
  const loginUserUseCase = new LoginUserUseCase(
    loginRepository, compareHash, generateToken
  );

  return {
    loginUserUseCase
  };
};

describe('Login User Use Case', () => {
  it('should return a user and token when datas is valid', async () => {
    const { loginUserUseCase } = makeLoginUserUseCase();

    const { datas, errors } = await loginUserUseCase.execute({
      email: userTest.email,
      password: userTest.password,
    });    

    expect(datas!.token.length).toBeGreaterThan(0);
    expect(datas!.user).toHaveProperty('_id');
    expect(datas!.user).not.toHaveProperty('password');
    expect(datas!.user.email).toBeTruthy();
    expect(errors).toBeFalsy();
  });
});