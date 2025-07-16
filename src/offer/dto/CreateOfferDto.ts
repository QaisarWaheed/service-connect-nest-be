import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty()
  taskId: string;

  @ApiProperty()
  offerDetails: string;

  @ApiProperty()
  offerPrice: number;
}
