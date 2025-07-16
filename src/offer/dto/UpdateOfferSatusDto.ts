import { ApiProperty } from '@nestjs/swagger';
import { OfferStatus } from '../entities/offer.entity';

export class UpdateOfferStatusDto {
  @ApiProperty()
  offerStatus: OfferStatus;
}
