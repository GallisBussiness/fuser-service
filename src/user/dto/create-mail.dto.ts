/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class MailDto {
  @IsString()
  to: string;

  @IsString()
  message: string;
}
