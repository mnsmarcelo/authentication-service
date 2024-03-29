import { Authentication} from 'src/domain/usecases';
import { BcryptAdapter, JwtAdapter} from 'src/infra/cryptography';
import { AccountMongoRepository } from 'src/infra/db';
import { DbAuthentication } from 'src/data/usecases/';

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter('secret');
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
  return dbAuthentication;
}