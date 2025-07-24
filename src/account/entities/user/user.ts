import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

import { Entity } from 'src/common/classes/base.entity.dto';

export type AuthUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export enum Role {
  Buyer = 'Buyer',
  Seller = 'Seller'
}

@Schema({ timestamps: true })
export class User extends Entity {
  @ApiProperty()
  @Prop({ type: String })
  firstName: string;

  @ApiProperty()
  @Prop({ type: String })
  lastName: string;

  @ApiProperty()
  @Prop({ type: String, unique: true, lowercase: true })
  email: string;

  @Prop({ type: String, select: false })
  passwordHash: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  @Prop({ enum: Role, default: Role.Buyer })
  role: Role;

  @ApiProperty()
  @Prop({ type: Date })
  emailVerifiedAt: Date;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
