/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { Types } from 'mongoose';
export declare type Location = {
    lat: string;
    lng: string;
};
export declare type PatientDocument = Patient & Document;
export declare class Patient {
    name: string;
    adresse: string;
    ville: string;
    profile_image: string;
    sexe: string;
    naissance: string;
    poids: number;
    taille: number;
    groupe_sangin: string;
    userId: Types.ObjectId;
    phoneNumber: string;
    email: string;
    location: Location;
}
export declare const PatientSchema: import("mongoose").Schema<Document<Patient, any, any>, import("mongoose").Model<Document<Patient, any, any>, any, any, any>, {}, {}>;
