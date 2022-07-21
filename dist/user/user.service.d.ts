/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from 'mongoose';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<ResponseServiceInterface>;
    createSuperAdmin(createUserDto: CreateUserDto): Promise<ResponseServiceInterface>;
    registerUserFromGoogle(createUserDto: CreateUserDto): Promise<ResponseServiceInterface>;
    findAll(): Promise<ResponseServiceInterface>;
    findOne(id: string): Promise<ResponseServiceInterface>;
    ifadmin(): Promise<boolean>;
    findByUsername(username: string): Promise<ResponseServiceInterface>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        data: User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        statusCode: number;
    }>;
    remove(id: string): Promise<ResponseServiceInterface>;
}
