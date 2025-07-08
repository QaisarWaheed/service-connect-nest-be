import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthResponseDto } from 'src/account/dtos/auth-response.dto';
import { CreateUserDto } from 'src/account/dtos/create-user.dto';
import { LoginUserDto } from 'src/account/dtos/login.dto';
import { AuthUser, User } from 'src/account/entities/user/user';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  async checkEmailAvailability(email: string) {
    const exists = await this.userModel.findOne({ email });
    if (exists) throw new BadRequestException('Email is taken');
  }

  async createUser(data: CreateUserDto) {
    const createdUser = await this.userModel.create({
      ...data,
      passwordHash: this.bcryptService.makeHash(data.password)
    });
    return createdUser;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async updatePassword(userId: string, plainPassword: string) {
    const passwordHash = await this.bcryptService.makeHash(plainPassword);
    await this.userModel.findByIdAndUpdate(userId, {
      passwordHash: passwordHash
    });
  }

  async authenticate({ email, password }: LoginUserDto) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValid = this.bcryptService.compareHash(password, user.passwordHash);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async signUser(user: User): Promise<AuthResponseDto> {
    const payload: AuthUser = {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user };
  }

  async markEmailVerified(email: string) {
    const user = await this.userModel.findOneAndUpdate(
      { email },
      {
        emailVerifiedAt: new Date()
      },
      {
        new: true
      }
    );
    return user;
  }
}
