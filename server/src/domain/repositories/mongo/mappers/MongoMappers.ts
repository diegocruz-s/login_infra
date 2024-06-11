import { IUserModel } from "../../../../infra/models/User";
import { User as UserEntity } from "../../../entities/User";

export class MongoMappers {
  static mongoToObjUser (user: IUserModel): UserEntity {
    const { _id, email, password } = user;
    return new UserEntity({
      id: String(_id),
      email,
      password,
    });
  };
};