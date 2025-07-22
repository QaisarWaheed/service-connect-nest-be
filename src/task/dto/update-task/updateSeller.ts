import { ApiProperty } from '@nestjs/swagger';

export class UpdateSellerDto {
  @ApiProperty()
  taskId: string;

  @ApiProperty({ type: String })
  sellerId: string;
}
