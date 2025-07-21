import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Review {
  declare _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' })
  taskId: mongoose.Schema.Types.ObjectId;

  @Prop()
  ratings: number;

  @Prop()
  content: string;

  declare createdAt: Date;
}

const ReviewSchema = SchemaFactory.createForClass(Review);
export default ReviewSchema;
