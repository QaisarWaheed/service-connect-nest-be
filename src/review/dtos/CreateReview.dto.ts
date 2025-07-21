import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty()
  content: string;

  userId: string;
  taskId: string;
}
