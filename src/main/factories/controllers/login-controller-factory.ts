import { Controller } from 'src/presentation/protocols';
import { LoginController } from 'src/presentation/controllers/login-controller/login-controller';
import { makeDbAuthentication } from 'src/main/factories/usecases/db-authentication-factory';

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication());
  return controller;
};