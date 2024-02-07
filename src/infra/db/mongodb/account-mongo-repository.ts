import {AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, CheckAccountByEmailRepository} from 'src/data/protocols';
import { MongoHelper } from 'src/infra/db/mongodb';
import { ObjectId } from 'mongodb';

export class AccountMongoRepository implements 
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  CheckAccountByEmailRepository {
  async add(accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData);
    return  MongoHelper.map(result);
  }

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      email,
    }, {
      projection: {
        _id: true,
        name: true,
        password: true,
      },
    });
    return account && MongoHelper.map(account);
  }

  async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      email,
    }, {
      projection: {
        _id: true,
      },
    });
    return account !== null;
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne({
      _id: new ObjectId(id),
    }, {
      $set: {
        accessToken: token,
      },
    });
  }
}