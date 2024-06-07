import { randomUUID } from "crypto";

export interface IValidUser {
  errors: (string | null)[];
  valid: boolean;
}

export interface IDatasUser {
  id?: string;
  email: string, 
  password: string
};

export class User {
  private readonly _id: string;
  readonly email: string;
  readonly password: string;

  constructor ({ email, password, id }: IDatasUser) {
    this._id = id || randomUUID();
    this.email = email;
    this.password = password;
  }

  get id () {
    return this._id;
  };

  isValid(): IValidUser {
    const keysProperties = Object.getOwnPropertyNames(this);

    const errorsInProperties = keysProperties
      .map(key => 
        (!!this[key as keyof User]) ? null : `Property ${key} is not valid!`
      ).filter(value => !!value);

    return {
      errors: errorsInProperties,
      valid: errorsInProperties.length > 0 ? false : true,
    };    
  };

};