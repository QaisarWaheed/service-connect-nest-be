import {
  BadRequestException,
  Controller,
  HttpCode,
  Post
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from 'src/account/dtos/auth-response.dto';
import { CreateUserDto } from 'src/account/dtos/create-user.dto';
import { LoginUserDto } from 'src/account/dtos/login.dto';
import { UserService } from 'src/account/services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: AuthResponseDto, status: 201 })
  @Post('/register')
  @HttpCode(201)
  async register(data: CreateUserDto): Promise<AuthResponseDto> {
    // check if email is available
    await this.userService.checkEmailAvailability(data.email);
    //create new User
    const newUser = await this.userService.createUser(data);
    //sign user and return
    return await this.userService.signUser(newUser);
  }

  @ApiResponse({ type: AuthResponseDto, status: 200 })
  @Post('/login')
  @HttpCode(200)
  async login(data: LoginUserDto): Promise<AuthResponseDto> {
    // find user by email
    const user = await this.userService.authenticate(data);
    // sign user and return
    return await this.userService.signUser(user);
  }

  //forget password
  @Post('/forgot-password')
  async forgotPassword(newPassword: string, email: string) {
    //find user
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(
        'There is no account linked to this email address'
      );
    }
    // generate password reset link

    // send password reset link to user email

    // return message dto that email sent
  }

  //reset password

  // send email verification link
  //verify email
}
