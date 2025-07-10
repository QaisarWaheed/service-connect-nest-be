import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty()
  @IsString()
  @IsEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(-90)
  @Max(+90)
  price: number;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  @IsNumber()
  @Min(-90)
  @Max(+90)
  lan: number;

  @ApiProperty()
  @IsNumber()
  @Min(-430)
  @Max(~20000)
  long: number;
}
