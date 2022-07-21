import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Types } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    create(createPatientDto: CreatePatientDto & CreateUserDto): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    registerFromGoogle(createPatientDto: CreatePatientDto & CreateUserDto): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    findAll(): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    findOne(id: Types.ObjectId): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    findMedecinByUserId(id: Types.ObjectId): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    update(updatePatientDto: UpdatePatientDto): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    remove(id: Types.ObjectId): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
}
