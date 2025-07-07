import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user/user';

export class AuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ type: User })
  user: User;
}
