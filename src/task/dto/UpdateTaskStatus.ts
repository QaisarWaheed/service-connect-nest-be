import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../entity/tasks.entity';

export class UpdateTaskStatus {
  @ApiProperty()
  taskStatus: Status;
  userId: string;
}
