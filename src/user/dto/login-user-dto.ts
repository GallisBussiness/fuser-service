/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  username: string;
}

export class LoginUserFromGoogleDto {
  @IsString()
  username: string;
}
