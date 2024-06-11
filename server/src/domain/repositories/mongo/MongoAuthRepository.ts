import { ILoginUserRepository } from "../../../application/useCases/Auth/protocols";
import { UserModel } from "../../../infra/models/User";
import { User } from "../../entities/User";
import { MongoMappers } from "./mappers/MongoMappers";

export class MongoAuthRepository implements ILoginUserRepository {
  async findUser(infoUser: { email: string; }): Promise<User | null> {
    const userByEmail = await UserModel.findOne({ email: infoUser.email });

    if (!userByEmail) return null;

    return MongoMappers.mongoToObjUser(userByEmail);
  };
};
