import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OwnpatientDocument = Ownpatient & Document;

@Schema({ timestamps: true, versionKey: false })
export class Ownpatient {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  sexe: string;

  @Prop({ type: String })
  adresse: string;

  @Prop({ type: String })
  ville: string;

  @Prop({ type: String, required: true })
  doctorId: string;

  @Prop({ type: Array })
  variables: Variables[];
}

export const OwnpatientSchema = SchemaFactory.createForClass(Ownpatient);

interface Variables {
  name: string;
  value: string;
}
