/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { ROLES, STATUS_USER, TYPE_USER } from '../dto/create-user.dto';
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    phoneNumber: string;
    password?: string;
    type_user: TYPE_USER;
    status: STATUS_USER;
    verification_code: string;
    resetPasswordToken: string;
    role: ROLES;
    isGoogle: boolean;
    isFacebook: boolean;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}, {}>;
