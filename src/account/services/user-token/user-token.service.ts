import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserToken,
  UserTokenType
} from 'src/account/entities/user-token/user-token';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';
import * as dayjs from 'dayjs';
@Injectable()
export class UserTokenService {
  constructor(
    @InjectModel(UserToken.name)
    private readonly userTokenModel: Model<UserToken>,
    private readonly bcryptService: BcryptService
  ) {}

  private makeRandomString(size: number = 128) {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let string = '';
    for (let i = 1; i <= size; i++) {
      const index = Math.floor(Math.random() * chars.length);
      string += chars[index];
    }
    return string;
  }

  async createUserToken(email: string, type: UserTokenType) {
    const userToken = this.makeRandomString(128);
    console.log(userToken);
    await this.userTokenModel.deleteMany({ email, type });
    await this.userTokenModel.create({
      email,
      type,
      hash: this.bcryptService.makeHash(userToken),
      expiry: dayjs().add(15, 'm').toDate()
    });
    return userToken;
  }

  async verifyToken(email: string, type: UserTokenType, plainToken: string) {
    const userToken = await this.userTokenModel.findOne({ email, type });

    if (!userToken) {
      throw new BadRequestException('Invalid or expired token');
    }

    const isExpired = userToken.expiry < dayjs().toDate();
    if (isExpired) {
      throw new BadRequestException('Invalid or expired token');
    }
    const isHashValid = await this.bcryptService.compareHash(
      plainToken,
      userToken.hash
    );
    console.log(isHashValid);
    if (!isHashValid) {
      throw new BadRequestException('Invalid or expired token');
    }
    return true;
  }

  async deleteToken(email: string, type: string) {
    await this.userTokenModel.deleteMany({ email, type });
  }
}
