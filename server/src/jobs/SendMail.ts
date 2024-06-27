import { IJob } from "./interfaces/IJob";

export class RegistrationMail implements IJob {
  public key = 'RegistrationMail';
  public options = {};

  async handle ({ email, name }: { email: string, name: string }) {    
    setTimeout(() => {
      console.log('Send mail here!!!');
    }, 3000);
  };
};

