/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model, Types } from 'mongoose';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { CreateMedecinDto } from './dto/create-medecin.dto';
import { UpdateMedecinDto } from './dto/update-medecin.dto';
import { Medecin, MedecinDocument } from './entities/medecin.entity';
export declare class MedecinService {
    private medecinModel;
    private userService;
    constructor(medecinModel: Model<MedecinDocument>, userService: UserService);
    create(createMedecinDto: CreateMedecinDto & CreateUserDto): Promise<ResponseServiceInterface>;
    findAll(): Promise<{
        data: (Medecin & import("mongoose").Document<any, any, any> & {
            _id: any;
        })[];
        statusCode: number;
    }>;
    findOne(id: string): Promise<ResponseServiceInterface>;
    findByUserId(id: Types.ObjectId): Promise<ResponseServiceInterface>;
    update(id: string, updateMedecinDto: UpdateMedecinDto): Promise<ResponseServiceInterface>;
    remove(id: Types.ObjectId): Promise<ResponseServiceInterface>;
    search(searchTerm: string): Promise<ResponseServiceInterface>;
}
