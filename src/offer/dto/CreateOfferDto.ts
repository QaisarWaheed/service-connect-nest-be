import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateOfferDto {
  taskId: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  offerDescription: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  priceOffered: number;

  userId: string;
}
