import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptService {
  makeHash(plain: string) {
    return bcrypt.hashSync(plain, bcrypt.genSaltSync());
  }
  compareHash(plain: string, hash: string) {
    return bcrypt.compareSync(plain, hash);
  }
}
