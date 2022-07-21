import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export enum TYPE_USER {
  MEDECIN = 'MEDECIN',
  PATIENT = 'PATIENT',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
}

export enum STATUS_USER {
  ACTIVATE = 'ACTIVATE',
  DISABLED = 'DISABLED',
}

export enum ROLES {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  SECRETAIRE = 'SECRETAIRE',
  USER = 'USER',
}

export class CreateUserDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(TYPE_USER, { each: true })
  type_user: TYPE_USER;

  @IsOptional()
  @IsString()
  verification_code: string;

  @IsOptional()
  @IsString()
  resetPasswordToken?: string;

  @IsOptional()
  @IsEnum(STATUS_USER, { each: true })
  status: STATUS_USER;

  @IsOptional()
  @IsEnum(ROLES, { each: true })
  role: ROLES;

  @IsOptional()
  @IsBoolean()
  isGoogle?: boolean;

  @IsOptional()
  @IsBoolean()
  isFacebook?: boolean;
}
