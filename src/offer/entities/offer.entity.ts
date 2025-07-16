import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Offer {
  declare _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' })
  taskId: mongoose.Schema.Types.ObjectId;

  @Prop()
  offerDescription: string;

  @Prop()
  priceOffered: number;

  declare createdAt: Date;
  declare updatedAt: Date;
}
const OfferSchema = SchemaFactory.createForClass(Offer);
export default OfferSchema;
