import { ApiProperty } from '@nestjs/swagger';

export class UpdateOfferDto {
  taskId: string;

  @ApiProperty()
  offerDetails: string;

  @ApiProperty()
  offerPrice: number;

  userId: string;
}
