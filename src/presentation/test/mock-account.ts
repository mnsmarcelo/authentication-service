import {fa, faker} from '@faker-js/faker';
import { Authentication } from 'src/domain/usecases';

export class AuthenticationSpy implements Authentication {
 authenticationParams: Authentication.Params;
 authenticationModel = {
   accessToken: faker.string.uuid(),
   name: faker.person.firstName(),
 }

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = params;
    return this.authenticationModel;
  }
}