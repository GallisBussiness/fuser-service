import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Types } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @MessagePattern('createPatient')
  create(@Payload() createPatientDto: CreatePatientDto & CreateUserDto) {
    return this.patientService.create(createPatientDto);
  }
  @MessagePattern('registerUserFromGoogle')
  registerFromGoogle(
    @Payload() createPatientDto: CreatePatientDto & CreateUserDto,
  ) {
    return this.patientService.createByGoogle(createPatientDto);
  }

  @MessagePattern('findAllPatient')
  findAll() {
    return this.patientService.findAll();
  }

  @MessagePattern('findOnePatient')
  findOne(@Payload() id: Types.ObjectId) {
    return this.patientService.findOne(id);
  }

  @MessagePattern('findPatientByUserId')
  findMedecinByUserId(@Payload() id: Types.ObjectId) {
    return this.patientService.findByUserId(id);
  }

  @MessagePattern('updatePatient')
  update(@Payload() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(updatePatientDto.id, updatePatientDto);
  }

  @MessagePattern('removePatient')
  remove(@Payload() id: Types.ObjectId) {
    return this.patientService.remove(id);
  }
}
