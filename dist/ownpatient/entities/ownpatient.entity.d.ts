/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type OwnpatientDocument = Ownpatient & Document;
export declare class Ownpatient {
    name: string;
    phoneNumber: string;
    email: string;
    sexe: string;
    adresse: string;
    ville: string;
    doctorId: string;
    variables: Variables[];
}
export declare const OwnpatientSchema: import("mongoose").Schema<Document<Ownpatient, any, any>, import("mongoose").Model<Document<Ownpatient, any, any>, any, any, any>, {}, {}>;
interface Variables {
    name: string;
    value: string;
}
export {};
