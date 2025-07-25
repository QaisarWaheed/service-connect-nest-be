import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiProperty()
  buyerReview: string;

  @ApiProperty()
  selelrReview: string;
}
