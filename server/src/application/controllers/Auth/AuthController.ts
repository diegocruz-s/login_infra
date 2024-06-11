import { z } from "zod";
import { User } from "../../../domain/entities/User";
import { IResponseLoginUser } from "../../interfaces/IReturnDatasLogin";
import { ILoginUserUseCase } from "../../useCases/Auth/protocols";
import { IHttpRequest, IHttpResponse } from "../globalInterfaces";
import { IDatasLoginUserRequest, ILoginController } from "./protocols";
import { validation } from "../../../shared/utils/validationZod";
import { ok, unprocessable } from "../../../shared/utils/returnsHttp";

const validationLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class LoginController implements ILoginController {
  constructor (
    private readonly loginUserUseCase: ILoginUserUseCase,
  ) {};

  async handle(httpRequest: IHttpRequest<IDatasLoginUserRequest>): Promise<IHttpResponse<IResponseLoginUser>> {
    const { isValid, errors: errorsValidation } = await validation({
      body: httpRequest.body,
      schema: validationLogin
    });

    if (!isValid && !!errorsValidation) 
      return unprocessable({ errors: errorsValidation });
    
    const responseUseCase = await this.loginUserUseCase.execute({
      email: httpRequest.body?.email!,
      password: httpRequest.body?.password!,
    });

    if(responseUseCase.errors) 
      return unprocessable({ errors: responseUseCase.errors });

    return ok(responseUseCase);
  };
};