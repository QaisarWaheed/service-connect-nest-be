import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { jwtConstants } from 'src/account/constants/constant';
import { AuthResponseDto } from 'src/account/dtos/auth-response.dto';
import { CreateUserDto } from 'src/account/dtos/create-user.dto';
import { ForgotPasswordDto } from 'src/account/dtos/forgot-password';
import { LoginUserDto } from 'src/account/dtos/login.dto';
import { ResetPasswordDto } from 'src/account/dtos/reset-password.dto';
import { VerifyEmailDto } from 'src/account/dtos/verify-email.dto';
import { UserTokenType } from 'src/account/entities/user-token/user-token';

import { UserTokenService } from 'src/account/services/user-token/user-token.service';
import { UserService } from 'src/account/services/user/user.service';
import { MessageDto } from 'src/common/dtos/message.dto';
import { MailerService } from 'src/mailer/mail.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly userTokenService: UserTokenService,
    private readonly mailService: MailerService
  ) {}

  @ApiResponse({ type: AuthResponseDto, status: 201 })
  @Post('/register')
  @HttpCode(201)
  async register(@Body() data: CreateUserDto): Promise<AuthResponseDto> {
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
  async login(@Body() data: LoginUserDto): Promise<AuthResponseDto> {
    // find user by email

    const user = await this.userService.authenticate(data);
    console.log(user);
    console.log('JWT Secret:', jwtConstants.secret);
    // sign user and return
    return await this.userService.signUser(user);
  }

  //forget password
  @ApiResponse({ status: 200 })
  @Post('/forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() data: ForgotPasswordDto): Promise<string> {
    //find user
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException(
        'There is no account linked to this email address'
      );
    }
    // generate password reset link
    const resetToken = await this.userTokenService.createUserToken(
      data.email,
      UserTokenType.ResetPassword
    );
    // send password reset link to user email
    await this.mailService.sendMail(data.email, 'Reset Password', resetToken);
    // return message dto that email sent
    return resetToken;
  }

  //reset password
  @ApiResponse({ status: 200 })
  @Post('/reset-password')
  @HttpCode(200)
  async resetPassword(@Body() data: ResetPasswordDto): Promise<MessageDto> {
    //check whether user exists by Email
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException('No User Found with this Email');
    }

    //verify token
    console.log(data.email, data.token);
    const isTokenValid = await this.userTokenService.verifyToken(
      data.email,
      UserTokenType.ResetPassword,
      data.token
    );
    if (!isTokenValid) {
      throw new BadRequestException('Token is expired or invalid');
    }
    //update password
    await this.userService.updatePassword(user.id, data.password);
    return { message: 'your password is updated' };
  }

  // send email verification link
  @ApiResponse({ status: 200 })
  @Post('/verify-user')
  @HttpCode(200)
  async verifyUser(@Body() email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('No user found with this Email');
    }
    //generate token
    const verificationToken = await this.userTokenService.createUserToken(
      email,
      UserTokenType.VerifyEmail
    );
    // send email with load mailer
    await this.mailService.sendMail(
      email,
      'Verify User',
      'password-reset-link'
    );
  }

  //verify email
  @ApiResponse({ status: 200 })
  @Post('/verify-email')
  @HttpCode(200)
  async verifyEmail(@Body() data: VerifyEmailDto): Promise<{ message }> {
    //verify token
    const verifyToken = await this.userTokenService.verifyToken(
      data.email,
      UserTokenType.VerifyEmail,
      data.token
    );
    if (!verifyToken) {
      throw new BadRequestException('Token is Invalid or Expired');
    }
    // set emailVerifiedAt: new Date
    const emailVerified = await this.userService.markEmailVerified(data.email);
    return { message: 'Email verified' };
  }
}
