import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type Location = {
  lat: string;
  lng: string;
};
export type PatientDocument = Patient & Document;

@Schema({ timestamps: true, versionKey: false })
export class Patient {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  adresse: string;

  @Prop({ type: String })
  ville: string;

  @Prop({ type: String, required: true, default: 'default_avatar.png' })
  profile_image: string;

  @Prop({ type: String })
  sexe: string;

  @Prop({ type: String })
  naissance: string;

  @Prop({ type: Number })
  poids: number;

  @Prop({ type: Number })
  taille: number;

  @Prop({ type: String })
  groupe_sangin: string;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: Object })
  location: Location;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
