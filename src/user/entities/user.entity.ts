import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLES, STATUS_USER, TYPE_USER } from '../dto/create-user.dto';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, unique: true })
  phoneNumber: string;

  @Prop({ type: String, required: true })
  password?: string;

  @Prop({ type: String, default: TYPE_USER.PATIENT })
  type_user: TYPE_USER;

  @Prop({ type: String, default: STATUS_USER.DISABLED })
  status: STATUS_USER;

  @Prop({ type: String })
  verification_code: string;

  @Prop({ type: String })
  resetPasswordToken: string;

  @Prop({ type: String, default: ROLES.USER })
  role: ROLES;

  @Prop({ type: Boolean, default: false })
  isGoogle: boolean;

  @Prop({ type: Boolean, default: false })
  isFacebook: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
