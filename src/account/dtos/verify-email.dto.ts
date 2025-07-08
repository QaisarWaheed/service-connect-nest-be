import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}
