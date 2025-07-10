import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Entity } from 'src/common/classes/base.entity.dto';

export enum UserTokenType {
  ResetPassword = 'reset-password',
  VerifyEmail = 'verify-email'
}

@Schema({
  timestamps: true
})
export class UserToken extends Entity {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  hash: string;

  @Prop({ type: String })
  token: string;

  @Prop({ enum: UserTokenType })
  type: UserTokenType;

  @Prop({ type: Date })
  expiry: Date;
}
export type UserTokenDocument = HydratedDocument<UserToken>;
export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
