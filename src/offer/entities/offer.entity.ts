import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum OfferStatus {
  Pending = 'Pending',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
  Countered = 'Countered'
}

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

  @Prop({ enum: OfferStatus, default: OfferStatus.Pending })
  offerStatus: OfferStatus;

  @Prop()
  counterOfferId?: string;

  declare createdAt: Date;
  declare updatedAt: Date;
}
const OfferSchema = SchemaFactory.createForClass(Offer);
export default OfferSchema;
