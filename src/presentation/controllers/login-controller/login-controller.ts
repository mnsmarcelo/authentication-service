import { Controller, HttpResponse, } from 'src/presentation/protocols';
import { Authentication } from 'src/domain/usecases';
import { badRequest, ok, serverError, unauthorized } from 'src/presentation/helpers';

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) { }

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const { email, password } = request;
      const accessToken = await this.authentication.auth({ email, password });
      if (!accessToken) {
        return unauthorized();
      }
      return ok({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  };
}