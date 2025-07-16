import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: 'q1@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'hello' })
  @IsString()
  password: string;
}
