import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { MailService } from 'src/mail/mail.service';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { SmsService } from 'src/sms/sms.service';
import {
  CreateUserDto,
  ROLES,
  STATUS_USER,
  TYPE_USER,
} from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { genRanNumber } from 'src/utils/Helpers';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient, PatientDocument } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    private userService: UserService,
    private mailService: MailService,
    private smsService: SmsService,
    private event: EventEmitter2,
  ) {}

  async create(
    createPatientDto: CreatePatientDto & CreateUserDto,
  ): Promise<ResponseServiceInterface> {
    try {
      const { email, phoneNumber, password, ...rest } = createPatientDto;
      const verif_cde = genRanNumber(6);
      const userField: CreateUserDto = {
        email,
        phoneNumber,
        password,
        type_user: TYPE_USER.PATIENT,
        role: ROLES.USER,
        status: STATUS_USER.DISABLED,
        verification_code: verif_cde,
      };
      const res = await this.userService.create(userField);
      const { statusCode } = res;
      if (statusCode !== 200) return res;
      const {
        data: { _id },
      } = res;
      const patientField: CreatePatientDto = {
        ...rest,
        email,
        phoneNumber,
        userId: _id,
      };
      const createdPatient = new this.patientModel(patientField);
      const patient = await createdPatient.save();
      this.event.emit('user.created', {
        ...userField,
        phoneNumber: createPatientDto.phoneNumber,
      });
      return { data: patient, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async createByGoogle(
    createPatientUserDto: CreatePatientDto & CreateUserDto,
  ): Promise<ResponseServiceInterface> {
    try {
      const { email, password, ...rest } = createPatientUserDto;
      const verif_cde = genRanNumber(6);
      const userField: CreateUserDto = {
        email,
        password,
        type_user: TYPE_USER.PATIENT,
        role: ROLES.USER,
        status: STATUS_USER.DISABLED,
        verification_code: verif_cde,
      };
      const res = await this.userService.registerUserFromGoogle(userField);
      const { statusCode } = res;
      if (statusCode !== 200) return res;
      const {
        data: { _id },
      } = res;
      const patientField: CreatePatientDto = {
        ...rest,
        userId: _id,
      };
      const createdPatient = new this.patientModel(patientField);
      const patient = await createdPatient.save();
      return { data: patient, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findAll(): Promise<ResponseServiceInterface> {
    try {
      const patients = await this.patientModel.find();
      return { data: patients, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findOne(id: Types.ObjectId): Promise<ResponseServiceInterface> {
    try {
      const patient = await this.patientModel.findById(id);
      if (!patient) return new NotFoundException();
      return { data: patient, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async findByUserId(id: Types.ObjectId): Promise<ResponseServiceInterface> {
    try {
      const patient = await this.patientModel.findOne({
        userId: new Types.ObjectId(id),
      });
      if (patient === null) throw new NotFoundException();
      return { data: patient, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async update(
    id: Types.ObjectId,
    updateMedecinDto: UpdatePatientDto,
  ): Promise<ResponseServiceInterface> {
    try {
      const result = await this.patientModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updateMedecinDto,
      );
      return { data: result, statusCode: 200 };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  async remove(id: Types.ObjectId): Promise<ResponseServiceInterface> {
    try {
      const data = await this.patientModel.findByIdAndDelete(id);
      if (data) {
        this.event.emit('user.deleted', data.userId);
        return {
          data,
          statusCode: 200,
        };
      }
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: 500,
      });
    }
  }

  @OnEvent('user.created', { async: true })
  async handleUserCreatedEvent(user: CreateUserDto) {
    if (user.type_user === TYPE_USER.PATIENT) {
      await this.mailService.sendUserConfirmation(user);
    } else {
      await this.mailService.sendUserWelcome(user);
    }
    await lastValueFrom(this.smsService.sendSms(['779265736'], 'Hello World!'));
  }

  @OnEvent('user.deleted', { async: true })
  async handleUserDeletedEvent(id: string) {
    await this.userService.remove(id);
  }
}
