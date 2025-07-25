import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Min, Max } from 'class-validator';
import mongoose from 'mongoose';

@Schema()
export class Review {
  declare _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' })
  taskId: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Number, min: 1, max: 5 })
  @Min(1)
  @Max(5)
  ratings: number;

  @ApiProperty()
  @Prop()
  buyerReview: string;

  @ApiProperty()
  @Prop()
  sellerReview: string;

  declare createdAt: Date;
}

const ReviewSchema = SchemaFactory.createForClass(Review);
export default ReviewSchema;
