import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateOwnpatientDto {
  @IsString()
  name: string;

  @IsString()
  sexe: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  adresse: string;

  @IsOptional()
  @IsString()
  ville: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsMongoId()
  doctorId: string;

  @IsOptional()
  @IsArray()
  variables?: Variables[];
}

interface Variables {
  name: string;
  value: string;
}
