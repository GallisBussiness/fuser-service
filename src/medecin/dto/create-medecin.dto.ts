import {
  IsString,
  IsMongoId,
  IsObject,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Variables } from 'src/utils/Variables';
import { Location } from '../entities/medecin.entity';
export class CreateMedecinDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId()
  userId: string;

  @IsString()
  adresse: string;

  @IsString()
  ville: string;

  @IsOptional()
  @IsString()
  abonnement: string;

  @IsOptional()
  @IsString()
  sexe: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  speciality: string;

  @IsOptional()
  @IsString()
  profile_image: string;

  @IsOptional()
  @IsObject()
  location: Location;

  @IsOptional()
  @IsArray()
  variables: Variables[];

  @IsOptional()
  @IsNumber()
  sms_account: number;
}
