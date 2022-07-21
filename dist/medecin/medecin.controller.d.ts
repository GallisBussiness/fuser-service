/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { MedecinService } from './medecin.service';
import { UpdateMedecinDto } from './dto/update-medecin.dto';
import { Types } from 'mongoose';
import { SmsService } from 'src/sms/sms.service';
import { CreateMedecinDto } from './dto/create-medecin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class MedecinController {
    private readonly medecinService;
    private readonly smsService;
    constructor(medecinService: MedecinService, smsService: SmsService);
    create(createMedecinDto: CreateMedecinDto & CreateUserDto): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    findAll(): Promise<{
        data: (import("./entities/medecin.entity").Medecin & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
        statusCode: number;
    }>;
    sendSMS(smsDto: {
        id: string;
        message: string;
        tel: string[];
    }): Promise<{
        data: any;
        statusCode: number;
    }>;
    findMedecinByUserId(id: Types.ObjectId): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    findOne(id: string): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    update(updateMedecinDto: UpdateMedecinDto): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    remove(id: Types.ObjectId): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    search(searchTerm: string): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
}
