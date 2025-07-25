import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class CreateSellerReviewDto {
  @ApiProperty()
  @Min(1)
  @Max(5)
  ratings: number;

  @ApiProperty()
  sellerReview: string;

  userId: string;
  taskId: string;
}
