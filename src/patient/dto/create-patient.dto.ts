import {
  IsEmail,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreatePatientDto {

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsString()
    @IsMongoId()
    userId?: string;


    @IsOptional()
    @IsString()
    adresse?: string;

    @IsOptional()
    @IsString()
    ville?: string;

    @IsOptional()
    @IsString()
    sexe?: string;

    @IsOptional()
    @IsString()
    naissance?: string;
  
    @IsOptional()
    @IsNumber()
    poids?: number;
  
    @IsOptional()
    @IsNumber()
    taille?: number;

    @IsOptional()
    @IsString()
    groupe_sangin?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    profile_image?: string;

    
}
