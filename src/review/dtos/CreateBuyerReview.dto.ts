import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class CreateBuyerReview {
  @ApiProperty()
  @Min(1)
  @Max(5)
  ratings: number;

  @ApiProperty()
  buyerReview: string;

  userId: string;
  taskId: string;
}
