import { EventEmitter2 } from '@nestjs/event-emitter';
import { Model, Types } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { SmsService } from 'src/sms/sms.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientDocument } from './entities/patient.entity';
export declare class PatientService {
    private patientModel;
    private userService;
    private mailService;
    private smsService;
    private event;
    constructor(patientModel: Model<PatientDocument>, userService: UserService, mailService: MailService, smsService: SmsService, event: EventEmitter2);
    create(createPatientDto: CreatePatientDto & CreateUserDto): Promise<ResponseServiceInterface>;
    createByGoogle(createPatientUserDto: CreatePatientDto & CreateUserDto): Promise<ResponseServiceInterface>;
    findAll(): Promise<ResponseServiceInterface>;
    findOne(id: Types.ObjectId): Promise<ResponseServiceInterface>;
    findByUserId(id: Types.ObjectId): Promise<ResponseServiceInterface>;
    update(id: Types.ObjectId, updateMedecinDto: UpdatePatientDto): Promise<ResponseServiceInterface>;
    remove(id: Types.ObjectId): Promise<ResponseServiceInterface>;
    handleUserCreatedEvent(user: CreateUserDto): Promise<void>;
    handleUserDeletedEvent(id: string): Promise<void>;
}
