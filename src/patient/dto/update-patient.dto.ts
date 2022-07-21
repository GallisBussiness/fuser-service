import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsMongoId()
  id: Types.ObjectId;
}
