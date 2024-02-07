import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeLoginController } from 'src/main/factories/controllers/login-controller-factory';
import { makeSignUpController } from 'src/main/factories/controllers/sigup-controller-factory';

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()));
  router.post('/signup', adaptRoute(makeSignUpController()));
}
