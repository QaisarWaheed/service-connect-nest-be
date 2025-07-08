import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Patch,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { doesNotMatch } from 'assert';
import { Request } from 'express';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/account/dtos/login.dto';
import { ResetPasswordDto } from 'src/account/dtos/reset-password.dto';
import { UpdateUserDto } from 'src/account/dtos/update-user.dto';
import { User } from 'src/account/entities/user/user';
import { AuthGuard } from 'src/account/guards/jwt-guard/jwt-guard.guard';
import { UserService } from 'src/account/services/user/user.service';
import { MessageDto } from 'src/common/dtos/message.dto';
import { BcryptService } from 'src/common/services/bcrypt/bcrypt.service';

@Controller('profile')
export class ProfileController {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  //get profile
  @UseGuards(AuthGuard)
  @Get('/get-profile')
  async getUser(@Req() req: Request) {
    const findUser = await this.userService.findOneById(req.user._id);
    if (findUser) {
      throw new NotFoundException('No user Found against this Id');
    }
    return findUser;
  }

  // update user profile
  @UseGuards(AuthGuard)
  @Patch('/user-profile')
  async updateUser(@Body() data: UpdateUserDto, @Req() req: Request) {
    const updatedUser = await this.userService.updateUser(req.user._id, data);
    return updatedUser;
  }

  // change password
  @UseGuards(AuthGuard)
  @Patch('change-password')
  async changePassword(
    @Req() req: Request,
    password: string,
    oldPassword: string
  ) {
    const user = await this.userService.findByEmail(req.user.email);
    if (!user) {
      throw new NotFoundException('User does not exist with this Email');
    }
    const validHash = this.bcryptService.compareHash(
      oldPassword,
      user?.passwordHash
    );
    if (!validHash) {
      throw new ForbiddenException('Old Password is not correct');
    }
    const updatedPassword = await this.userService.updatePassword(
      req.user._id,
      password
    );
    return { message: 'password updated Successfully' };
  }
}
