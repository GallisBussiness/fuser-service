/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedecinService } from './medecin.service';
import { UpdateMedecinDto } from './dto/update-medecin.dto';
import { Types } from 'mongoose';
import { SmsService } from 'src/sms/sms.service';
import { lastValueFrom } from 'rxjs';
import { CreateMedecinDto } from './dto/create-medecin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller()
export class MedecinController {
  constructor(
    private readonly medecinService: MedecinService,
    private readonly smsService: SmsService,
    ) {}

  @MessagePattern('createMedecin')
  create(@Payload() createMedecinDto: CreateMedecinDto & CreateUserDto) {
    return this.medecinService.create(createMedecinDto);
  }

  @MessagePattern('findAllMedecin')
  findAll() {
    return this.medecinService.findAll();
  }

  @MessagePattern('sendSms')
  async sendSMS(@Payload() smsDto: {id: string;message: string, tel: string[]}) {
   const {data:medecin } = await this.medecinService.findOne(smsDto.id);
   if(medecin.sms_account > 0)
     await lastValueFrom(this.smsService.sendSms(smsDto.tel, smsDto.message));
     medecin.sms_account = medecin.sms_account - 1;
     await medecin.save(); 
     return { data: medecin, statusCode: 200};
  }

  @MessagePattern('findMedecinByUserId')
  findMedecinByUserId(@Payload() id: Types.ObjectId) {
    return this.medecinService.findByUserId(id);
  }

  @MessagePattern('findOneMedecin')
  findOne(@Payload() id: string) {
    return this.medecinService.findOne(id);
  }

  @MessagePattern('updateMedecin')
  update(@Payload() updateMedecinDto: UpdateMedecinDto) {
    return this.medecinService.update(updateMedecinDto.id, updateMedecinDto);
  }

  @MessagePattern('removeMedecin')
  remove(@Payload() id: Types.ObjectId) {
    return this.medecinService.remove(id);
  }

  @MessagePattern('search')
  search(@Payload() searchTerm: string) {
    return this.medecinService.search(searchTerm);
  }
}
