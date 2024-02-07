import { AddAccount } from 'src/domain/usecases';
import { Hasher, AddAccountRepository, CheckAccountByEmailRepository } from 'src/data/protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
  ) {
  }

  async add(acount: AddAccount.Params): Promise<AddAccount.Result> {
    const exist = await this.checkAccountByEmailRepository.checkByEmail(acount.email);
    let isValid = false;
    if (!exist) {
      const hashedPassword = await this.hasher.hash(acount.password);
      isValid = await this.addAccountRepository.add({
        ...acount,
        password: hashedPassword,
      });
    }
    return isValid;
  }
}