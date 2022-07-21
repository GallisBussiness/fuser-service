import { PartialType } from '@nestjs/mapped-types';
import { CreateMedecinDto } from './create-medecin.dto';
import { IsMongoId } from 'class-validator';

export class UpdateMedecinDto extends PartialType(CreateMedecinDto) {
  @IsMongoId()
  id: string;
}
