import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  rating: number;

  @ApiProperty()
  content: string;

  userId: string;
  taskId: string;
}
