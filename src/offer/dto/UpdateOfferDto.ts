import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferDto {
  taskId: string;

  @ApiProperty()
  offerDescription: string;

  @ApiProperty()
  priceOffered: number;

  userId: string;
}
