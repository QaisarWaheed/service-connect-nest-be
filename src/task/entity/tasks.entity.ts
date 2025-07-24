import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import mongoose from 'mongoose';

export enum Status {
  Pending = 'Pending',
  Active = 'Active',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Revision = 'Revision'
}

@Schema({
  timestamps: true
})
export class Tasks {
  declare _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop({ type: Number })
  price: number;

  @ApiProperty({ enum: Status })
  @Prop({ enum: Status, default: Status.Pending })
  taskStatus: Status;

  @ApiProperty()
  @Prop({ type: Number, min: -180, max: 180 })
  long: number;

  @ApiProperty({ type: Number })
  @Prop({ type: Number, min: -90, max: +90 })
  lat: number;

  //this is buyer Id
  @ApiProperty({ type: String })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @Prop()
  delivered: boolean;

  @ApiProperty()
  @Prop()
  sellerId: string;

  declare createdAt: Date;
  declare updatedAt: Date;
}
const TasksSchema = SchemaFactory.createForClass(Tasks);
export default TasksSchema;
