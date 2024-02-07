import { faker } from '@faker-js/faker';
import { LoginController } from './login-controller';
import { AuthenticationSpy } from 'src/presentation/test';

type SutTypes = { 
  sut: LoginController,
  authenticationSpy: AuthenticationSpy,
};

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy();
  const sut = new LoginController(authenticationSpy);
  return { 
    sut,
    authenticationSpy,
  };
};

describe('LoginController', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const request = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await sut.handle(request);
    expect(authenticationSpy.authenticationParams).toEqual(request);
  });
});
