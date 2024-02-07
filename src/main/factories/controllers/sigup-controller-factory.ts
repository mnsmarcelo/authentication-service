import { Controller } from 'src/presentation/protocols';
import { SignUpController } from 'src/presentation/controllers/signup-controller';
import { makeDbAddAccount } from '../usecases/db-add-account-factory';
import { makeDbAuthentication } from '../usecases/db-authentication-factory';
import {makeSignUpValidation} from 'src/main/factories/controllers/signup-validation-factory';

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  );
  return controller;
}