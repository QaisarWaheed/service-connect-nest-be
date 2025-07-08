import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Entity } from 'src/common/classes/base.entity.dto';

@Schema({
  timestamps: true
})
export class UserToken extends Entity {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  hash: string;

  @Prop({ type: String })
  type: string;

  @Prop({ type: Date })
  expiry: Date;
}
export type UserTokenDocument = HydratedDocument<UserToken>;
export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
