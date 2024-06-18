import { User } from "../../../domain/entities/User";
import { IResponseLoginUser } from "../../interfaces/IReturnDatasLogin";
import { 
  ExpiresIn, 
  ICompareHash, 
  IDatasLoginUser, 
  IGenerateToken, 
  ILoginUserRepository, 
  ILoginUserUseCase 
} from "./protocols";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor (
    private readonly loginRepository: ILoginUserRepository,
    private readonly compareHash: ICompareHash,
    private readonly generateToken: IGenerateToken,
  ){};

  async execute(datas: IDatasLoginUser): Promise<IResponseLoginUser> {
    const { email, password } = datas;
    const user = await this.loginRepository.findUser({ email });

    if (!user) {
      return {
        errors: ['Authentication failed!'],
      };
    };

    const isValidPass = await this.compareHash.run({
      password, 
      hash: user.password,
    });

    if (!isValidPass) {      
      return {
        errors: ['Authentication failed!'],
      };
    };

    const accessToken = await this.generateToken.create({
      id: user.id,
      secret: process.env.SECRET_TOKEN || 'any_token',
      expiresIn: ExpiresIn.SEVEN_DAYS,
    });

    const { password: notPass, ...rest } = user;

    return {
      datas: {
        user: rest as Omit<User, 'password'>,
        token: accessToken,
      },
    };
  };
};