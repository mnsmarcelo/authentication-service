import { Controller, HttpResponse, Validation } from 'src/presentation/protocols';
import { AddAccount, Authentication } from 'src/domain/usecases';
import {
  badRequest, forbidden, ok, serverError,
} from 'src/presentation/helpers';
import { EmailInUseError } from 'src/presentation/errors';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) { }

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = request;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      
      console.log(account);

      if (!account) {
        return forbidden(new EmailInUseError());
      }

      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });

      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  };
}