/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailDto } from './dto/create-mail.dto';
import { MailService } from 'src/mail/mail.service';
export declare class UserController {
    private readonly userService;
    private readonly emailService;
    constructor(userService: UserService, emailService: MailService);
    login(username: string): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    create(createUserDto: CreateUserDto): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    createSuperAdmin(createUserDto: CreateUserDto): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    findAll(): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    ifAdmin(): Promise<boolean>;
    findOne(id: string): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    update(updateUserDto: UpdateUserDto): Promise<{
        data: import("./entities/user.entity").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        statusCode: number;
    }>;
    remove(id: string): Promise<import("../ResponseServiceInterface").ResponseServiceInterface>;
    sendMail(mailDto: MailDto): Promise<void>;
}
