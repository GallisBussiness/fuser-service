/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document, Types } from 'mongoose';
import { Variables } from 'src/utils/Variables';
export declare type Location = {
    lat: string;
    lng: string;
};
export declare type MedecinDocument = Medecin & Document;
export declare class Medecin {
    name: string;
    speciality: string;
    sexe: string;
    profile_image: string;
    userId: Types.ObjectId;
    adresse: string;
    ville: string;
    phoneNumber: string;
    email: string;
    abonnement: string;
    description: string;
    location: Location;
    variables: Variables[];
    sms_account?: number;
}
export declare const MedecinSchema: import("mongoose").Schema<Document<Medecin, any, any>, import("mongoose").Model<Document<Medecin, any, any>, any, any, any>, {}, {}>;
