import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Variables } from 'src/utils/Variables';

export type Location = {
  lat: string;
  lng: string;
};
export type MedecinDocument = Medecin & Document;

@Schema({ timestamps: true })
export class Medecin {
  @Prop({ type: String, required: true, index: 'text' })
  name: string;

  @Prop({ type: String, required: true })
  speciality: string;

  @Prop({ type: String })
  sexe: string;

  @Prop({ type: String, required: true, default: 'default_avatar.png' })
  profile_image: string;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String })
  adresse: string;

  @Prop({ type: String })
  ville: string;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  abonnement: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Object })
  location: Location;

  @Prop({ type: Array })
  variables: Variables[];

  @Prop({ type: Number, default: 50 })
  sms_account?: number;
}

export const MedecinSchema = SchemaFactory.createForClass(Medecin);
