import { randomUUID } from "crypto";
import { User } from "../../../domain/entities/User";
import { IResponseLoginUser } from "../../interfaces/IReturnDatasLogin";
import { IDatasLoginUser, ILoginUserUseCase } from "../../useCases/Auth/protocols";
import { LoginController } from "./LoginController";

const user = new User({ email: 'any@email.com', password: 'Any_pass' })

const makeFakeLoginUserUseCase = () => {
  class LoginUserUseCase implements ILoginUserUseCase {
    private users: User[] = [user];

    async execute(datas: IDatasLoginUser): Promise<IResponseLoginUser> {
      const { password, ...rest } = this.users[0];

      return {
        datas: {
          token: randomUUID(),
          user: rest as Omit<User, 'password'>,
        },
      };
    };
  };

  const loginUserUseCase = new LoginUserUseCase();

  return {
    loginUserUseCase
  };
};

const makeFakeLoginController = () => {
  const { loginUserUseCase } = makeFakeLoginUserUseCase();
  const loginController = new LoginController(loginUserUseCase);

  return {
    loginController,
  };
};

describe('Login User Controller', () => {
  it('should return datas user and token and status code response', async () => {
    const { loginController } = makeFakeLoginController();
    const datasLogin = {
      email: user.email,
      password: user.password,
    };

    const { statusCode, body } = await loginController.handle({ 
      body: datasLogin,
    });

    expect(statusCode).toBe(200);
    expect(body.errors).toBeFalsy();
    expect(body.datas?.token.length).toBeGreaterThan(1);
    expect(body.datas?.user).toHaveProperty('_id');
    expect(body.datas?.user).not.toHaveProperty('password');
    expect(body.datas?.user.email).toBe(datasLogin.email);
  });
});