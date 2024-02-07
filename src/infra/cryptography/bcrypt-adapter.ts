import bcrypt from 'bcrypt';
import { HashComparer, Hasher } from 'src/data/protocols';

export class BcryptAdapter implements HashComparer, Hasher {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt);
    return hashedValue;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hashedValue);
    return isValid;
  }
}